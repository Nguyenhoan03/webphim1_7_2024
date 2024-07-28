const { Product , Linkfilm,Comment,User} = require('../models');
const { Op, where ,fn,col,literal } = require('sequelize');
const fs = require('fs');
const path = require('path');
const cache = require('memory-cache');
const { body, validationResult } = require('express-validator');
const CheckNull = require ('../middleware/Validate/Checknull')

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
    // Lấy thông tin chi tiết của phim và các link film tương ứng
    const datafilm = await Product.findOne({
      where: {
        title: titlefilm
      },
      include: [{
        model: Linkfilm,
        as: 'linkfilms',
        attributes: ['episode']
      }]
    });

  
    const comments = await Comment.findAll({
      where: {
        titlefilm: titlefilm
      },
      order: [['id', 'DESC']],
      // attributes: {
      //   include: [[literal(`(SELECT COUNT(*) FROM Comments WHERE titlefilm = '${titlefilm}')`), 'totalCount']]
      // },
      include: [{
        model: User,
        as: 'users',
        attributes: ['username']
      }],
    
    });
    // const totalCount = await Comment.count({
    //   where: {
    //     titlefilm: titlefilm
    //   }
    // });
    
    return { datafilm, comments }; 
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    throw error;
  }
};

//phim bộ
const danhmucphim = async (category_id, filters = {}) => {
  
  try {
    const { orderBy, category, country, typeId, year } = filters;
    const where = { category_id };

    // Build dynamic conditions based on filters
    if (category) {
      where.theloai = { [Op.like]: `%${category}%` };
    }
    if (country) {
      where.quocgia = { [Op.like]: `%${country}%` };
    }
    if (typeId) {
      where.typeId = typeId;
    }
    if (year) {
      where.namphathanh = year;
    }

    let orderClause = [];
    if (orderBy == "createdAt") {
      orderClause = [['createdAt', 'DESC']];
    } else if (orderBy == "views") {
      orderClause = [['views', 'DESC']];
    } else if (orderBy == "year") {
      orderClause = [['year', 'ASC']];
    }

    const data = await Product.findAll({
      where,
      order: orderClause.length > 0 ? orderClause : undefined,
    });

    return data;
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    throw error;
  }
};

const quocgia = async (quocgia,filters = {}) =>{
  try {
    const { orderBy, category, country, typeId, year } = filters;
    const wherefilters = {};

    // Build dynamic conditions based on filters
    if (category) {
      wherefilters.theloai = { [Op.like]: `%${category}%` };
    }
    if (country) {
      wherefilters.quocgia = { [Op.like]: `%${country}%` };
    }
    if (typeId) {
      wherefilters.typeId = typeId;
    }
    if (year) {
      wherefilters.namphathanh = year;
    }

    let orderClause = [];
    if (orderBy == "createdAt") {
      orderClause = [['createdAt', 'DESC']];
    } else if (orderBy == "views") {
      orderClause = [['views', 'DESC']];
    } else if (orderBy == "year") {
      orderClause = [['year', 'ASC']];
    }
    const data = Product.findAll({
      wherefilters,
      where: {
        quocgia:{ [Op.like]: `%${quocgia}%` },
        // orderBy: [["id","DESC"]],
      }
    })  
    return data;
  } catch (error) {
  
      throw(error)
  }
  
}


const post_comment = async (userId, titlefilm, contentcomment) => {
  // Kiểm tra dữ liệu đầu vào
  if (userId == null || titlefilm == null || contentcomment == null) {
    throw new Error('Missing required fields: userId, titlefilm, or contentcomment');
  }

  try {
    await Comment.create({
      titlefilm: titlefilm,
      comment: contentcomment,
      user_id: userId,
    });
    return { success: true };
  } catch (error) {
    throw error;
  }
};






module.exports = { home, getProductByCategory,detailfilm,danhmucphim,quocgia,post_comment};
