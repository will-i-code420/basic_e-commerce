const express = require('express');
const router = express.Router();
const userRepo = require('../../repositories/UserRepository');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post('/signup', async (req, res) => {
	const { email, password, confirm } = req.body;
	const existingUser = await userRepo.getOne({ email });
	if (existingUser) {
		return res.send('email already registered');
	}
	if (password !== confirm) {
		return res.send('Password does not match confirmation');
	}
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
