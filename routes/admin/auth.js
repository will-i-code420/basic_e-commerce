const express = require('express');
const router = express.Router();
const { handleErrors } = require('middleware');
const { requireEmail, requirePassword, confirmPassword, validEmail, validPassword } = require('./validation');
const userRepo = require('../../repositories/UserRepository');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, confirmPassword ],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;
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
	res.send(signinTemplate({}));
});

router.post('/signin', [ validEmail, validPassword ], handleErrors(signupTemplate), async (req, res) => {
	const { email } = req.body;
	const user = userRepo.getOne({ email });
	req.session.userId = user.id;
	res.send('sign ins');
});

module.exports = router;
