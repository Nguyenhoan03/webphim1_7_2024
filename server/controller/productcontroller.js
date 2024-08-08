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
    const data = await Productservices.danhmucphim(categoryId, filters);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin phim' });
  }
};


//product danh mục
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

const Product_comment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { titlefilm, contentcomment } = req.body;
   
    const data = await Productservices.post_comment(userId, titlefilm, contentcomment);
    if (data.success) {
      res.status(200).json({ message: 'Create success token' });
    } else {
      
    next(error);

      throw new Error('Failed to create comment');
    }
  } catch (error) {
    next(error);
  }
}

//product quốc gia

const Product_quocgia_anh = async (req, res, next) => {
  handlequocgia(req, res, 'Anh', next);
};

const Product_quocgia_phap = async (req, res, next) => {
  handlequocgia(req, res, 'Pháp', next);
};

const Product_quocgia_nhatban = async (req, res, next) => {
  handlequocgia(req, res, 'Nhật Bản', next);
};

const Product_quocgia_hanquoc = async (req, res, next) => {
  handlequocgia(req, res, 'Hàn Quốc', next);
};

const Product_quocgia_thailan = async (req, res, next) => {
  handlequocgia(req, res, 'Thái Lan', next);
};

const Product_quocgia_aumy = async (req, res, next) => {
  handlequocgia(req, res, 'Âu Mỹ', next);
};

const Product_quocgia_dailoan = async (req, res, next) => {
  handlequocgia(req, res, 'Đài Loan', next);
};

const Product_quocgia_hongkong = async (req, res, next) => {
  handlequocgia(req, res, 'Hồng Kông', next);
};

const Product_quocgia_ando = async (req, res, next) => {
  handlequocgia(req, res, 'Ấn Độ', next);
};

const Product_quocgia_duc = async (req, res, next) => {
  handlequocgia(req, res, 'Đức', next);
};

const Product_quocgia_canada = async (req, res, next) => {
  handlequocgia(req, res, 'Canada', next);
};

const Product_quocgia_taybannha = async (req, res, next) => {
  handlequocgia(req, res, 'Tây Ban Nha', next);
};

const Product_quocgia_thonhiky = async (req, res, next) => {
  handlequocgia(req, res, 'Thổ Nhĩ Kỳ', next);
};

const Product_quocgia_halan = async (req, res, next) => {
  handlequocgia(req, res, 'Hà Lan', next);
};

const Product_quocgia_indonesia = async (req, res, next) => {
  handlequocgia(req, res, 'Indonesia', next);
};

const Product_quocgia_nga = async (req, res, next) => {
  handlequocgia(req, res, 'Nga', next);
};

const Product_quocgia_mexico = async (req, res, next) => {
  handlequocgia(req, res, 'Mexico', next);
};

const Product_quocgia_balan = async (req, res, next) => {
  handlequocgia(req, res, 'Ba Lan', next);
};

const Product_quocgia_uc = async (req, res, next) => {
  handlequocgia(req, res, 'Úc', next);
};

const Product_quocgia_thuydien = async (req, res, next) => {
  handlequocgia(req, res, 'Thụy Điển', next);
};

const Product_quocgia_malaysia = async (req, res, next) => {
  handlequocgia(req, res, 'Malaysia', next);
};

const Product_quocgia_brazil = async (req, res, next) => {
  handlequocgia(req, res, 'Brazil', next);
};

const Product_quocgia_philippines = async (req, res, next) => {
  handlequocgia(req, res, 'Philippines', next);
};

const Product_quocgia_bodaonha = async (req, res, next) => {
  handlequocgia(req, res, 'Bồ Đào Nha', next);
};

const Product_quocgia_y = async (req, res, next) => {
  handlequocgia(req, res, 'Ý', next);
};

const Product_quocgia_danmach = async (req, res, next) => {
  handlequocgia(req, res, 'Đan Mạch', next);
};

const Product_quocgia_uae = async (req, res, next) => {
  handlequocgia(req, res, 'UAE', next);
};

const Product_quocgia_nauy = async (req, res, next) => {
  handlequocgia(req, res, 'Na Uy', next);
};

const Product_quocgia_thuysi = async (req, res, next) => {
  handlequocgia(req, res, 'Thụy Sĩ', next);
};

const Product_quocgia_chauphi = async (req, res, next) => {
  handlequocgia(req, res, 'Châu Phi', next);
};

const Product_quocgia_namphi = async (req, res, next) => {
  handlequocgia(req, res, 'Nam Phi', next);
};

const Product_quocgia_ukraina = async (req, res, next) => {
  handlequocgia(req, res, 'Ukraina', next);
};

const Product_quocgia_arapxeut = async (req, res, next) => {
  handlequocgia(req, res, 'Ả Rập Xê Út', next);
};
const Product_quocgia_trungquoc = async (req, res, next) => {
  handlequocgia(req, res, 'Trung Quốc', next);
};


const handlequocgia = async (req, res, country, next) => {
  try {
      const filters = req.query;
      console.log(filters,"filllllllterrrr")
      const data = await Productservices.quocgia(country, filters);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error, "Lỗi khi lấy thông tin quốc gia phim");
      next(error); 
  }
};



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
  Product_quocgia_ando,
 
  //quoc gia
  Product_quocgia_phap,
  Product_quocgia_anh,
  Product_quocgia_nhatban,
  Product_quocgia_hanquoc,
  Product_quocgia_thailan,
  Product_quocgia_aumy,
  Product_quocgia_dailoan,
  Product_quocgia_hongkong,
  Product_quocgia_ando,
  Product_quocgia_duc,
  Product_quocgia_canada,
  Product_quocgia_taybannha,
  Product_quocgia_thonhiky,
  Product_quocgia_halan,
  Product_quocgia_indonesia,
  Product_quocgia_nga,
  Product_quocgia_mexico,
  Product_quocgia_balan,
  Product_quocgia_uc,
  Product_quocgia_thuydien,
  Product_quocgia_malaysia,
  Product_quocgia_brazil,
  Product_quocgia_philippines,
  Product_quocgia_bodaonha,
  Product_quocgia_y,
  Product_quocgia_danmach,
  Product_quocgia_uae,
  Product_quocgia_nauy,
  Product_quocgia_thuysi,
  Product_quocgia_chauphi,
  Product_quocgia_namphi,
  Product_quocgia_ukraina,
  Product_quocgia_arapxeut,
  Product_quocgia_trungquoc,
  // Product_quocgia_quocgiakhac

};
