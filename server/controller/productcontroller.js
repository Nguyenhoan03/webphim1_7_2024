const Productservices = require('../services/Productservices');

const Product_home = async (req, res) => {
  try {
    const data = await Productservices.home();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at category controller: ' + error.message
    });
  }
};

const getProductByCategory = async (req, res, categoryId) => {
  try {
    const data = await Productservices.getProductByCategory(categoryId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at category controller: ' + error.message,
    });
  }
};

const Product_phimbo = (req, res) => getProductByCategory(req, res, 24);
const Product_phimle = (req, res) => getProductByCategory(req, res, 25);
const Product_phimshows = (req, res) => getProductByCategory(req, res, 26);
const Product_phimsapchieu = (req, res) => getProductByCategory(req, res, 27);

const Product_Detailphim = async (req, res) => {
  try {
    const titlefilm = req.params.detailfilm;
   
    const data = await Productservices.detailfilm(titlefilm);
    
    if (data) {
      res.json(data); 
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin phim' });
    }
    
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin phim' });
  }
};


//handle page danh muc phim
const handledanhmucphim = async (req, res, categoryId) => {
  try {
    const filters = req.query;
    console.log("Received filters:", filters);
    const data = await Productservices.danhmucphim(categoryId, filters);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin phim' });
  }
};




const Product_danhmucphimbo = async (req,res) =>handledanhmucphim(req,res,24)
const Product_danhmucphimle = async (req,res) =>handledanhmucphim(req,res,25)
const Product_danhmucphimsapchieu = async (req,res) =>handledanhmucphim(req,res,27)
const Product_danhmucphimshows = async (req,res) =>handledanhmucphim(req,res,26)
const Product_danhmucphimhanhdong = async (req,res) =>handledanhmucphim(req,res,1)
const Product_danhmucphimvientuong = async (req,res) =>handledanhmucphim(req,res,4)
const Product_danhmucphimbian = async (req, res) => handledanhmucphim(req, res, 7);
const Product_danhmucphimtamly = async (req, res) => handledanhmucphim(req, res, 10);
const Product_danhmucphimamnhac = async (req, res) => handledanhmucphim(req, res, 13);
const Product_danhmucphimhaihuoc = async (req, res) => handledanhmucphim(req, res, 16);
const Product_danhmucphimkhoahoc = async (req, res) => handledanhmucphim(req, res, 22);
const Product_danhmucphimkinhdien = async (req, res) => handledanhmucphim(req, res, 19);
const Product_danhmucphimcotrang = async (req, res) => handledanhmucphim(req, res, 2);
const Product_danhmucphimkinhdi = async (req, res) => handledanhmucphim(req, res, 5);
const Product_danhmucphim18plus = async (req, res) => handledanhmucphim(req, res, 8);
const Product_danhmucphimthethao = async (req, res) => handledanhmucphim(req, res, 11);
const Product_danhmucphimgiadinh = async (req, res) => handledanhmucphim(req, res, 14);
const Product_danhmucphimhinhsu = async (req, res) => handledanhmucphim(req, res, 17);
const Product_danhmucphimthanthoai = async (req, res) => handledanhmucphim(req, res, 20);
const Product_danhmucphimhoathinh = async (req, res) => handledanhmucphim(req, res, 23);
const Product_danhmucphimchientranh = async (req, res) => handledanhmucphim(req, res, 3);
const Product_danhmucphimtailieu = async (req, res) => handledanhmucphim(req, res, 6);
const Product_danhmucphimtinhcam = async (req, res) => handledanhmucphim(req, res, 9);
const Product_danhmucphimphieuluu = async (req, res) => handledanhmucphim(req, res, 12);
const Product_danhmucphimhocduong = async (req, res) => handledanhmucphim(req, res, 15);
const Product_danhmucphimvothuat = async (req, res) => handledanhmucphim(req, res, 18);
const Product_danhmucphimchinhkich = async (req, res) => handledanhmucphim(req, res, 21);

const Product_comment = async (req, res) => {
  try {
    const userId = req.userId; 
    console.log('User ID:', userId); 
    res.status(200).json({ message: 'Product comment handled' });
  } catch (error) {
    console.error('Error handling Product_comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  Product_comment,
  Product_home,
  Product_phimbo,
  Product_phimle,
  Product_phimshows,
  Product_phimsapchieu,
  Product_Detailphim,
  Product_danhmucphimbo,
  Product_danhmucphimhanhdong,
  Product_danhmucphimvientuong,
  Product_danhmucphimbian,
  Product_danhmucphimtamly,
  Product_danhmucphimamnhac,
  Product_danhmucphimhaihuoc,
  Product_danhmucphimkhoahoc,
  Product_danhmucphimkinhdien,
  Product_danhmucphimcotrang,
  Product_danhmucphimkinhdi,
  Product_danhmucphim18plus,
  Product_danhmucphimthethao,
  Product_danhmucphimgiadinh,
  Product_danhmucphimhinhsu,
  Product_danhmucphimthanthoai,
  Product_danhmucphimhoathinh,
  Product_danhmucphimchientranh,
  Product_danhmucphimtailieu,
  Product_danhmucphimtinhcam,
  Product_danhmucphimphieuluu,
  Product_danhmucphimhocduong,
  Product_danhmucphimvothuat,
  Product_danhmucphimchinhkich,
  Product_danhmucphimsapchieu,
  Product_danhmucphimle,
  Product_danhmucphimshows,
};
