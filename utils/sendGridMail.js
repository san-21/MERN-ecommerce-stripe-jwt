import sgMail from "@sendgrid/mail";

export const sendEmail = async (email, resetToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL, // Use the email address or domain you verified above
    subject: "Password reset link",
    text: "Click link below to reset your password",
    html: `<p>Click <a href="${process.env.PASSWORD_RESET_URL}/${resetToken}">here</a> to reset your password </p>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      //   console.log(response[0].headers);
      console.log("emal sent");
    })
    .catch((error) => {
      console.error(error);
      console.log("unable to send mail");
    });
};
