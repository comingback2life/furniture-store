import nodemailer from 'nodemailer';
const sendActivationEmail = (emailData) => {
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.SMTP_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
      }
  });
  
    let info = await transporter.sendMail({
      from: '"Furnyture 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Please activate your account with Furnyture ✔", // Subject line
      text: `Hello ${emailData.name}, 
      Welcome to Furnyture ~ The future of furniture. 
      Please follow the link to verify your email : ${emailData.validationLink}`, // plain text body
      html: `<b>Hello ${emailData.name}.</b>
      <p>  Welcome to Furnyture ~ The future of furniture. </p>
      <br/>
      <hr>
      <p> Please follow the link to verify your email : ${emailData.validationLink}</p>
      <br/>
      <strong>Kind Regards, </strong>
      <p>Furnyture </p>
      `, // html body
    });
  }catch(error){
    console.log(error);
    next(error)
  }

};
