const express = require('express');
const router = express.Router();
const productController = require('../controller/productcontroller');
const XemphimController = require('../controller/Xemphimcontroller')
const {verifyToken} = require('../middleware/Authmiddlware')
router.post('/comment',verifyToken, productController.Product_comment);
router.get('/product-home', productController.Product_home);
router.get('/product-phimbo', productController.Product_phimbo);
router.get('/product-phimle', productController.Product_phimle);
router.get('/product-phimshows', productController.Product_phimshows);
router.get('/product-phimsapchieu', productController.Product_phimsapchieu);
router.get('/product-phimbo', productController.Product_danhmucphimbo);
router.get('/product-phimle', productController.Product_danhmucphimle);
router.get('/product-phimshows', productController.Product_danhmucphimshows);
router.get('/product-phimsapchieu', productController.Product_danhmucphimsapchieu);
router.get('/product-phimhanhdong', productController.Product_danhmucphimhanhdong);
router.get('/product-phimvientuong', productController.Product_danhmucphimvientuong);
router.get('/product-phimbian', productController.Product_danhmucphimbian);
router.get('/product-phimtamly', productController.Product_danhmucphimtamly);
router.get('/product-phimamnhac', productController.Product_danhmucphimamnhac);
router.get('/product-phimhaihuoc', productController.Product_danhmucphimhaihuoc);
router.get('/product-phimkhoahoc', productController.Product_danhmucphimkhoahoc);
router.get('/product-phimkinhdien', productController.Product_danhmucphimkinhdien);
router.get('/product-phimcotrang', productController.Product_danhmucphimcotrang);
router.get('/product-phimkinhdi', productController.Product_danhmucphimkinhdi);
router.get('/product-phim18plus', productController.Product_danhmucphim18plus);
router.get('/product-phimthethao', productController.Product_danhmucphimthethao);
router.get('/product-phimgiadinh', productController.Product_danhmucphimgiadinh);
router.get('/product-phimhinhsu', productController.Product_danhmucphimhinhsu);
router.get('/product-phimthanthoai', productController.Product_danhmucphimthanthoai);
router.get('/product-phimhoathinh', productController.Product_danhmucphimhoathinh);
router.get('/product-phimchientranh', productController.Product_danhmucphimchientranh);
router.get('/product-phimtailieu', productController.Product_danhmucphimtailieu);
router.get('/product-phimtinhcam', productController.Product_danhmucphimtinhcam);
router.get('/product-phimphieuluu', productController.Product_danhmucphimphieuluu);
router.get('/product-phimhocduong', productController.Product_danhmucphimhocduong);
router.get('/product-phimvothuat', productController.Product_danhmucphimvothuat);
router.get('/product-phimchinhkich', productController.Product_danhmucphimchinhkich);

//quocgia
router.get('/product-trungquoc', productController.Product_quocgia_trungquoc);
// router.get('/product-thailan', productController.Product_quocgia_thailan);



router.get('/:detailfilm', productController.Product_Detailphim);
router.get('/:titlefilm/tap-:episode', XemphimController.datafilm);



module.exports = router;
