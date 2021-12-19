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
		})
};
