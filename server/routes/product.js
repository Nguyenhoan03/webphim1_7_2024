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

// Quốc gia
router.get('/product-ando', productController.Product_quocgia_ando);
router.get('/product-anh', productController.Product_quocgia_anh);
router.get('/product-phap', productController.Product_quocgia_phap);
router.get('/product-nhat-ban', productController.Product_quocgia_nhatban);
router.get('/product-han-quoc', productController.Product_quocgia_hanquoc);
router.get('/product-thai-lan', productController.Product_quocgia_thailan);
router.get('/product-au-my', productController.Product_quocgia_aumy);
router.get('/product-dai-loan', productController.Product_quocgia_dailoan);
router.get('/product-hong-kong', productController.Product_quocgia_hongkong);
router.get('/product-duc', productController.Product_quocgia_duc);
router.get('/product-canada', productController.Product_quocgia_canada);
router.get('/product-tay-ban-nha', productController.Product_quocgia_taybannha);
router.get('/product-tho-nhi-ky', productController.Product_quocgia_thonhiky);
router.get('/product-ha-lan', productController.Product_quocgia_halan);
router.get('/product-indonesia', productController.Product_quocgia_indonesia);
router.get('/product-nga', productController.Product_quocgia_nga);
router.get('/product-mexico', productController.Product_quocgia_mexico);
router.get('/product-ba-lan', productController.Product_quocgia_balan);
router.get('/product-uc', productController.Product_quocgia_uc);
router.get('/product-thuy-dien', productController.Product_quocgia_thuydien);
router.get('/product-malaysia', productController.Product_quocgia_malaysia);
router.get('/product-brazil', productController.Product_quocgia_brazil);
router.get('/product-philippines', productController.Product_quocgia_philippines);
router.get('/product-bo-dao-nha', productController.Product_quocgia_bodaonha);
router.get('/product-y', productController.Product_quocgia_y);
router.get('/product-dan-mach', productController.Product_quocgia_danmach);
router.get('/product-uae', productController.Product_quocgia_uae);
router.get('/product-na-uy', productController.Product_quocgia_nauy);
router.get('/product-thuy-si', productController.Product_quocgia_thuysi);
router.get('/product-chau-phi', productController.Product_quocgia_chauphi);
router.get('/product-nam-phi', productController.Product_quocgia_namphi);
router.get('/product-ukraina', productController.Product_quocgia_ukraina);
router.get('/product-a-rap-xe-ut', productController.Product_quocgia_arapxeut);
router.get('/product-trung-quoc', productController.Product_quocgia_trungquoc);




router.get('/:detailfilm', productController.Product_Detailphim);
router.get('/:titlefilm/tap-:episode', XemphimController.datafilm);



module.exports = router;
