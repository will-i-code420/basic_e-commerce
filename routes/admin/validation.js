const { check } = require('express-validator');
const userRepo = require('../../repositories/UserRepository');

module.exports = {
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be valid email address')
		.custom(async (email) => {
			const existingUser = await userRepo.getOne({ email });
			if (existingUser) throw new Error('email already registered');
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 32 })
		.withMessage('Must be between 4 and 32 characters'),
	confirmPassword: check('confirm')
		.trim()
		.isLength({ min: 4, max: 32 })
		.withMessage('Must be between 4 and 32 characters')
		.custom((confirm, { req }) => {
			if (confirm !== req.body.password) throw new Error('Password does not match confirmation');
		}),
	validEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be valid email address')
		.custom(async (email) => {
			const user = await userRepo.getOne({ email });
			if (!user) throw new Error('Incorrect email or password');
		}),
	validPassword: check('password').trim().custom(async (password, { req }) => {
		const user = await userRepo.getOne({ email: req.body.email });
		if (!user) throw new Error('Incorrect email or password');
		const validPassword = await userRepo.comparePassword(user.password, password);
		if (!validPassword) throw new Error('Incorrect email or password');
	}),
	requireItem: check('item').trim().isLength({ min: 5, max: 40 }).withMessage('Must be between 5 and 40 characters'),
	requirePrice: check('price').trim().toFloat().isFloat({ min: 1 }).withMessage('Must be greater than 1')
};
