//Login page

'use client'

import googleOAuthURL from '@/server/oauth/googleLink';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

export default function Login() {

    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        if (error) {
            document.getElementById("errorMessage").innerText = atob(error);
        }
    }, [error]);


    const handleLogin = async (formData) => {

        //Get form data
        const email = formData.get('email')
        const password = formData.get('password')


        //Check credentials
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        if (response.redirected) {
            // If the fetch was redirected, redirect the client to the final URL
            window.location.href = response.url;
        }

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin(new FormData(e.target));
            }}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"></input>
                <br></br>
                <input type="submit" value="Submit"></input>
                <br></br>
                <a
                    href={googleOAuthURL}
                > Login with google</a>
                <p id="errorMessage"></p>
            </form>
        </>
    );
}
