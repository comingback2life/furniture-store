export const createOTP = (length = 6) => {
	let OTP = '';
	for (let i = 0; i < length; i++) {
		OTP += Math.floor(Math.random() * 10);
	}
	return OTP;
};
