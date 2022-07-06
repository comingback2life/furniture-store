import bcyrpt from 'bcyrpt';
const saltRounds = 10;

const encyptPassword = (password) => {
	return bcyrpt.hashSync(password, saltRounds);
};
