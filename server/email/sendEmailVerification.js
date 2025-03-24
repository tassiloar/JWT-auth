//Send the verifications email and stores the code and expiry in database

import transporter from "@/server/email/nodeMailTransporter"
import jwt from "jsonwebtoken"

export default async function sendEmailVerification(email) {

    const payload = {
        email: email
    }

    const verificationToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5m' })

    return transporter.sendMail({
        from: 'Test mail',
        to: email,
        subject: 'helllooo 👻',
        text: `Verify your email at https://localhost:4000/verifyemail?auth=${verificationToken}`,
        html: `<h1>HELLO</h1> <a href=https://localhost:4000/verifyemail?auth=${verificationToken}>Verify your email</a>`,
    })
}