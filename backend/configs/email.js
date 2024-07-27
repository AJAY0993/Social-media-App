const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f2dd9900df7eb6',
    pass: 'bde99ab38de507',
  },
});
const sendEmail = async (to, url, user) => {
  const mailOptions = {
    from: 'SocialMedia@email.com',
    to,
    subject: 'Password Reset Request',
    html: `<p>Hello,</p>
<p>No need to worry, you can reset your Social Media App password by clicking the link below:</p>
<p><a href="${url}">Reset Password</a></p>
<p>Your username is: ${user.username}</p>
<p>If you didn't request a password reset, feel free to ignore this email and continue enjoying our platform!</p>
<p>All the best,<br>The Social Media App Team</p>`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
