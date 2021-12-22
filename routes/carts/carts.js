const express = require('express');
const router = express.Router();
const productRepo = require('../../repositories/ProductRepository');
const cartRepo = require('../../repositories/CartRepository');

router.get('/cart', async (req, res) => {});

router.post('/cart/products', async (req, res) => {
	let cart;
	if (!req.session.cartId) {
		cart = await cartRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		cart = await cartRepo.getOne(req.session.cartId);
	}
	const existingItem = cart.items.find((item) => (item.id = req.body.id));
	if (existingItem) {
		existingItem.qty++;
	} else {
		cart.items.push({ id: req.body.id, qty: 1 });
	}
	await cartRepo.update(cart.id, {
		items: cart.items
	});
	res.send('added to cart');
});

router.post('/cart/delete', async (req, res) => {});

module.exports = router;
