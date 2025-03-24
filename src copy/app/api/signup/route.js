// /api/signup API route to sign a user up if
// not already signed up

import { NextResponse } from "next/server";
import clientPromise from '@/server/mongodb';
import bcrypt from 'bcrypt';

// request body accepts email, isOauth, (password1, password2)/(oauthData)
export async function POST(request) {

    const body = await request.json();

    const email = body.email

    //Get database objects
    const client = await clientPromise;
    const db = client.db('users');

    let newUser

    //Attempt to find user
    const User = await db.collection('User').findOne({
        email: email
    });

    //Check if user is signing up using OAuth
    if (body.isOauth === false) {

        const password1 = body.password1
        const password2 = body.password2

        //return error if passwords dont match
        if (password1 !== password2) {
            return NextResponse.redirect(new URL(`/login?error=${Buffer.from("Passwords do not match", 'utf8').toString('base64')}`, request.url));

        }

        //Check if user exists
        if (User !== null) {
            //return redirect with error 
            return NextResponse.redirect(new URL(`/login?error=${Buffer.from("A user with that email already exists", 'utf8').toString('base64')}`, request.url));
        }

        //Generate salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        //Encrypt password
        const hashedPassword = await bcrypt.hash(password1, salt);

        newUser = {
            email: email,
            password: hashedPassword,
            role: "USER",
            registerType: "CRED",
            createdAt: new Date(),
        }

    } else {

        if (User !== null && User.registerType === "CRED") {
            return NextResponse.json({ res: "error", errorMesage: Buffer.from("A user with that email already exists", 'utf8').toString('base64') })
        }
        if (User !== null && User.registerType === "OAUTH") {
            return NextResponse.json({ res: "success", id: User._id.insertedId, email: User.email })
        }

        newUser = {
            email: email,
            role: "USER",
            registerType: "OAUTH",
            createdAt: new Date(),
            oauthData: body.oauthData
        }
    }

    //insert new user
    const addedUser = await db.collection('User').insertOne(newUser);

    return NextResponse.redirect(new URL(`/`, request.url))
}