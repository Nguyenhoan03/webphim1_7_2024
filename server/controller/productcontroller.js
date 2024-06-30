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
    console.log("ten film" + titlefilm)
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

module.exports = {
  Product_home,
  Product_phimbo,
  Product_phimle,
  Product_phimshows,
  Product_phimsapchieu,
  Product_Detailphim
};
