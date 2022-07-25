import nodemailer from 'nodemailer';

const emailProcessor = async (emailData) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	try {
		let info = await transporter.sendMail(emailData);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const sendMail = async (emailData) => {
	const mailBody = {
		from: '"Furnyture 👻" <foo@example.com>', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'Please activate your account with Furnyture ✔', // Subject line
		text: `Hello ${emailData.fName}, 
			Welcome to Furnyture ~ The future of furniture. 
			Please follow the link to verify your email : ${emailData.activationLink}`, // plain text body
		html: `<b>Hello ${emailData.fName}.</b>
			<p>  Welcome to Furnyture ~ The future of furniture. </p>
			<br/>
			<hr>
			<p> Please follow the link to verify your email : <a href="${emailData.activationLink}">Activate</a></p>
			<br/>
			<strong>Kind Regards, </strong>
			<p>Furnyture </p>
			`, // html body
	};
	emailProcessor(mailBody);
};

export const profileUpdateNotification = async (emailData) => {
	const mailBody = {
		from: '"Furnyture 👻" <foo@example.com>', // sender address
		to: emailData.email, // list of receivers
		subject: 'Profile Update Notification', // Subject line
		text: `Hello ${emailData.fName}, 
		
		We have received a  change request for your account. 
		
		If you did not choose to do it, please ignore this email and contact administrator immediately
			`, // html body
	};
	emailProcessor(mailBody);
};

export const OTPSendNotification = async (emailData) => {
	const mailBody = {
		from: '"Furnyture 👻" <foo@example.com>', // sender address
		to: emailData.email, // list of receivers
		subject: 'Profile Update Notification', // Subject line
		text: `Hello, 
		
		We have received a password change request for your account. 

		Please use this OTP ${emailData.token}
		
		If you did not choose to do it, please ignore this email and contact administrator immediately
			`, // html body
	};
	emailProcessor(mailBody);
};
