const { Product } = require('../models');
const { Op, where } = require('sequelize');
const fs = require('fs');
const path = require('path');
const cache = require('memory-cache');

// Hàm ghi log vào file
const logToFile = (filename, data) => {
  const logFilePath = path.join(__dirname, filename);
  fs.appendFileSync(logFilePath, data + '\n', 'utf8');
};

const home = async () => {
  try {
    // cache.clear();
    const cacheKey = 'home_data';
    let data = cache.get(cacheKey); 

    if (data) {
      return data;
    }
    const phimhotPromise = Product.findAll({
      order: [['views', 'DESC']],
      limit: 30,
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
    });

    const phimbomoicapnhatPromise = Product.findAll({
      where: {
        sotap: { [Op.gt]: 15 },
        thoiluong: { [Op.gt]: 25 }
      },
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
      group: ['title'],
      order: [['sotap', 'DESC'], ['thoiluong', 'DESC']],
      limit: 18,
    });

    const phimlemoicapnhatPromise = Product.findAll({
      where: { sotap: { [Op.gt]: 1 } },
      limit: 18,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
    });

    const phimdahoanthanhPromise = Product.findAll({
      where: { trangthai: { [Op.like]: '%Hoàn Tất%' } },
      limit: 18,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
    });

    const phimhanhdongPromise = Product.findAll({
      where: { theloai: { [Op.like]: '%Hành Động%' } },
      limit: 5,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['hinhanh', 'title', 'namphathanh'],
    });

    const phimtrendingPromise = Product.findAll({
      limit: 8,
      group: ['title'],
      order: [['likes', 'DESC']],
      attributes: ['title', 'likes'],
    });

    const phimhoathinhPromise = Product.findAll({
      where: { category_id: 23 },
      limit: 13,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
    });

    const phimvientuongPromise = Product.findAll({
      where: { category_id: 4 },
      limit: 15,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
    });

    const phimsapchieuPromise = Product.findAll({
      where: { category_id: 27 },
      limit: 7,
      group: ['title'],
      order: [['id', 'DESC']],
      attributes: ['hinhanh', 'title', 'namphathanh'],
    });

    const findFilmsByCategory = (categoryId) => {
      return Product.findAll({
        where: { category_id: categoryId },
        limit: 10,
        group: ['title'],
        order: [['id', 'DESC']],
        attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
      });
    };

    const [phimCategory9, phimCategory10] = await Promise.all([
      findFilmsByCategory(9),
      findFilmsByCategory(10)
    ]);

    const phimtamlytimcamPromise = [...phimCategory9, ...phimCategory10];

    const [
      phimhot, phimbomoicapnhat, phimlemoicapnhat,
      phimdahoanthanh, phimhanhdong, phimtrending,
      phimhoathinh, phimtamlytimcam, phimvientuong,
      phimsapchieu
    ] = await Promise.all([
      phimhotPromise, phimbomoicapnhatPromise, phimlemoicapnhatPromise,
      phimdahoanthanhPromise, phimhanhdongPromise, phimtrendingPromise,
      phimhoathinhPromise, phimtamlytimcamPromise, phimvientuongPromise,
      phimsapchieuPromise
    ]);

    data = {
      phimhot, phimbomoicapnhat, phimlemoicapnhat,
      phimdahoanthanh, phimhanhdong, phimtrending,
      phimhoathinh, phimtamlytimcam, phimvientuong,
      phimsapchieu
    };

    cache.put(cacheKey, data, 3600 * 1000); 

    return data;

  } catch (error) {
    console.error('Error in phimhot service:', error);
    logToFile('log.txt', 'Error in phimhot service: ' + error.toString());
    throw error; 
  }
};
//file services
const getProductByCategory = async (categoryId) => {
  try {
  const products = await Product.findAll({
    where: {
      category_id: categoryId,
    },
    order: [['id', 'DESC']],
    attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
  });
  return products;
} catch (error) {
    console.log(error)
}
};
const detailfilm = async (titlefilm) => {
  try {
    const datafilm = await Product.findOne({
      where: {
        title: titlefilm
      }
    });
    return datafilm;
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    throw error; 
  }
};


module.exports = { home, getProductByCategory,detailfilm };
