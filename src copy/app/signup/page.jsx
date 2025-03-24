//Signup page

"use client"

import googleOAuthURL from '@/server/oauth/googleLink';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

export default function SignUp() {

    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        if (error) {
            document.getElementById("errorMessage").innerText = atob(error);
        }
    }, [error]);

    const handleSignUp = async (formData) => {

        const email = formData.get('email')
        const password1 = formData.get('password1')
        const password2 = formData.get('password2')
        const isOauth = false

        //Sign user up
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                isOauth: isOauth,
                password1: password1,
                password2: password2,
            }),
        });

        if (response.redirected) {
            // If the fetch was redirected, redirect the client to the final URL
            window.location.href = response.url;
        }

    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSignUp(new FormData(e.target));
            }}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required></input>
                <br></br>
                <input type="submit" value="Submit"></input>
                <br></br>
                <a
                    href={googleOAuthURL}
                > Sign up with google</a>
                <p id="errorMessage"></p>
            </form>
        </>
    );
}
