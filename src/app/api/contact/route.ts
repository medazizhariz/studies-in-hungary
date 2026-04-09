import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_APP_PASSWORD

  if (!user || !pass) {
    return NextResponse.json(
      { error: 'Email service not configured. Please contact us directly at studiesinhungary1@gmail.com' },
      { status: 503 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Studies in Hungary Contact" <${user}>`,
    to: 'studiesinhungary1@gmail.com',
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#1d4ed8">New Contact Form Message</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px">Name</td><td style="padding:6px 0;font-size:14px;font-weight:600">${name}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px">Email</td><td style="padding:6px 0;font-size:14px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px">Subject</td><td style="padding:6px 0;font-size:14px;font-weight:600">${subject}</td></tr>
        </table>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
