const express = require('express');
const router = express.Router();
const productRepo = require('../../repositories/ProductRepository');
const productIndexTemplate = require('../../views/products/index');

router.get('/', async (req, res) => {
	const products = await productRepo.getAll();
	res.send(productIndexTemplate({ products }));
});

module.exports = router;
