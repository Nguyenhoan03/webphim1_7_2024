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
    const cacheKey = 'home_data';
    let data = cache.get(cacheKey);

    if (data) {
      return data;
    }

    const commonAttributes = ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'];

    const findFilms = (options) => Product.findAll({
      ...options,
      attributes: options.attributes || commonAttributes,
      group: ['title'],
      order: options.order || [['id', 'DESC']],
      limit: options.limit || 18,
    });

    const promises = [
      findFilms({
        order: [['views', 'DESC']],
        limit: 30,
      }),
      findFilms({
        where: { sotap: { [Op.gt]: 15 }, thoiluong: { [Op.gt]: 25 } },
        order: [['sotap', 'DESC'], ['thoiluong', 'DESC']],
      }),
      findFilms({
        where: { sotap: { [Op.gt]: 1 } },
      }),
      findFilms({
        where: { trangthai: { [Op.like]: '%Hoàn Tất%' } },
      }),
      findFilms({
        where: { theloai: { [Op.like]: '%Hành Động%' } },
        limit: 5,
        attributes: ['hinhanh', 'title', 'namphathanh'],
      }),
      findFilms({
        attributes: ['title', 'likes'],
        limit: 8,
        order: [['likes', 'DESC']],
      }),
      findFilms({
        where: { category_id: 23 },
        limit: 13,
      }),
      findFilms({
        where: { category_id: 4 },
        limit: 15,
      }),
      findFilms({
        where: { category_id: 27 },
        limit: 7,
        attributes: ['hinhanh', 'title', 'namphathanh'],
      }),
      findFilms({ where: { category_id: 9 }, limit: 10 }),
      findFilms({ where: { category_id: 10 }, limit: 10 }),
    ];

    const [
      phimhot, phimbomoicapnhat, phimlemoicapnhat,
      phimdahoanthanh, phimhanhdong, phimtrending,
      phimhoathinh, phimvientuong, phimsapchieu,
      phimCategory9, phimCategory10
    ] = await Promise.all(promises);

    const phimtamlytimcam = [...phimCategory9, ...phimCategory10];

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
    logToFile('log.txt', `Error in phimhot service: ${error.toString()}`);
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

const quocgia = async (quocgia, filters = {}) => {
  console.log("first_quocgia service", quocgia);
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
    if (orderBy === "createdAt") {
      orderClause = [['createdAt', 'DESC']];
    } else if (orderBy === "views") {
      orderClause = [['views', 'DESC']];
    } else if (orderBy === "year") {
      orderClause = [['namphathanh', 'ASC']];
    }

    const data = await Product.findAll({
      where: {
        quocgia: { [Op.like]: `%${quocgia}%` },
        ...wherefilters,
      },
      order: orderClause,  // Add the order clause if necessary
    });

    return data;
  } catch (error) {
    throw error;
  }
};



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
