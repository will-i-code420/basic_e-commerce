const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const userRepo = require('../../repositories/UserRepository');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post(
	'/signup',
	[
		check('email')
			.trim()
			.normalizeEmail()
			.isEmail()
			.withMessage('Must be valid email address')
			.custom(async (email) => {
				const existingUser = await userRepo.getOne({ email });
				if (existingUser) throw new Error('email already registered');
			}),
		check('password').trim().isLength({ min: 4, max: 32 }).withMessage('Must be between 4 and 32 characters'),
		check('confirm')
			.trim()
			.isLength({ min: 4, max: 32 })
			.withMessage('Must be between 4 and 32 characters')
			.custom((confirm, { req }) => {
				if (confirm !== req.body.password) throw new Error('Password does not match confirmation');
			})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (errors) {
		}
		const { email, password, confirm } = req.body;

		if (password !== confirm) {
			return res.send('Password does not match confirmation');
		}
		const user = await userRepo.create({ email, password });
		req.session.userId = user.id;
		res.send('Account Created');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.redirect('/signin');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const user = userRepo.getOne({ email });
	const validPassword = await userRepo.comparePassword(user.password, password);
	if (!user || !validPassword) {
		return res.send('Incorrect email or password');
	}
	req.session.userId = user.id;
	res.send('sign ins');
});

module.exports = router;
