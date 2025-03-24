"use client"

import Link from 'next/link'

export default function handler() {

  const handleLogOut = async () => {

    await fetch('/api/removeAuthTokens', {
      method: "GET"
    })

    window.location.reload();
  }

  return (
    <>
      <h1>HOME</h1>
      <Link href="/login">Login</Link>
      <br></br>
      <Link href="/signup">Signup</Link>
      <br></br>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
}
