import nodemailer from 'nodemailer';

// 設定郵件傳送服務器，這裡以 Gmail 為例
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// 發送郵件的函式
export async function sendVerificationEmail(to: string, url: string) {
  // 設定郵件內容
  const mailOptions = {
    from: process.env.GMAIL_USER, // 寄件人
    to, // 收件人
    subject: 'Ecommerce-site Email Verification',
    html: `
      <p>Click the button below to verify your email:</p>
      <a href="${url}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Verify Email</a>
    `,
  };

  // 發送郵件
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
}
