// /api/login API route to check if an inputed email
// and password exists when attempting to login

import { NextResponse } from "next/server";
import clientPromise from '@/server/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// request body accepts email, password
export async function POST(request) {

    const body = await request.json();

    const email = body.email
    const password = body.password

    //Get database objects
    const client = await clientPromise;
    const db = client.db('users');

    //Attempt to find user
    const User = await db.collection('User').findOne({
        email: email,
        registerType: "CRED" //In case a user signed up with OAuth 
    });

    //Check if user is valid
    if (User === null) {
        //return redirect with error 
        return NextResponse.redirect(new URL(`/login?error=${Buffer.from("Invalid credentials, please try again", 'utf8').toString('base64')}`, request.url));
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);

    //Check if password is correct
    if (!isPasswordValid) {
        return NextResponse.redirect(new URL(`/login?error=${Buffer.from("Invalid credentials, please try again", 'utf8').toString('base64')}`, request.url));
    }

    //JWT token payload
    const payload = {
        userId: User._id,
        email: User.email,
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' })

    //Create response object
    const response = NextResponse.redirect(new URL('/', request.url));

    //Set cookies
    response.cookies.set("accessToken", accessToken, {
        path: '/',
        maxAge: 3600,
        secure: true,
        sameSite: 'Strict',
        httpOnly: false
    })

    response.cookies.set("refreshToken", refreshToken, {
        path: '/',
        maxAge: 604800,
        secure: true,
        sameSite: 'Strict',
        httpOnly: true
    })

    return response
}