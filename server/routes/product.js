const express = require('express');
const router = express.Router();
const productController = require('../controller/productcontroller');

router.get('/product-home', productController.Product_home);
router.get('/product-phimbo', productController.Product_phimbo);
router.get('/product-phimle', productController.Product_phimle);
router.get('/product-phimshows', productController.Product_phimshows);
router.get('/product-phimsapchieu', productController.Product_phimsapchieu);
router.get('/:detailfilm', productController.Product_Detailphim);


module.exports = router;
