const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { requireEmail, requirePassword, confirmPassword } = require('./validation');
const userRepo = require('../../repositories/UserRepository');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post('/signup', [ requireEmail, requirePassword, confirmPassword ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.send(signupTemplate({ req, errors }));
	}
	const { email, password } = req.body;
	const user = await userRepo.create({ email, password });
	req.session.userId = user.id;
	res.send('Account Created');
});

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
