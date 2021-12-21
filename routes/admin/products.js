const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { handleErrors } = require('middleware');
const { requireItem, requirePrice } = require('./validation');
const productRepo = require('../../repositories/ProductRepository');
const newProductTemplate = require('../../views/admin/products/new');

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(newProductTemplate({}));
});

router.post(
	'/admin/products/new',
	upload.single('image'),
	[ requireItem, requirePrice ],
	handleErrors(newProductTemplate),
	async (req, res) => {
		const { item, price } = req.body;
		const image = req.file.buffer.toString('base64');
		const product = await productRepo.create({ item, price, image });
		res.send(`Added ${product.item} to inventory`);
	}
);

module.exports = router;
