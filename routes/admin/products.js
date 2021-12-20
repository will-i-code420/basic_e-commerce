const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { requireItem, requirePrice } = require('./validation');
const productRepo = require('../../repositories/ProductRepository');
const newProductTemplate = require('../../views/admin/products/new');

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(newProductTemplate({}));
});

router.post('/admin/products/new', [ requireItem, requirePrice ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.send(newProductTemplate({ errors }));
	}
});

module.exports = router;
