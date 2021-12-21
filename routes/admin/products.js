const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { validationResult } = require('express-validator');
const { requireItem, requirePrice } = require('./validation');
const productRepo = require('../../repositories/ProductRepository');
const newProductTemplate = require('../../views/admin/products/new');

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(newProductTemplate({}));
});

router.post('/admin/products/new', upload.single('image'), [ requireItem, requirePrice ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.send(newProductTemplate({ errors }));
	}
	const { item, price } = req.body;
	const image = req.file.buffer.toString('base64');
	const product = await productRepo.create({ item, price, image });
	res.send(`Added ${product.item} to inventory`);
});

module.exports = router;
