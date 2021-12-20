const express = require('express');
const router = express.Router();
const productRepo = require('../../repositories/ProductRepository');

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {});

module.exports = router;
