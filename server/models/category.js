'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 

  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    namecategory: DataTypes.TEXT
  }, {
   
    sequelize,
    modelName: 'Category',
    timestamps: false, // Ensure timestamps are not managed by Sequelize
    tableName: 'Category'
  });
  Category.mapping = (categoryName) => {
    const categoryMapping = {
      'Hành Động': 1,
      'Cổ Trang': 2,
      'Chiến Tranh': 3,
      'Viễn Tưởng': 4,
      'Kinh Dị': 5,
      'Tài Liệu': 6,
      'Bí Ẩn': 7,
      'Phim 18+': 8,
      'Tình Cảm': 9,
      'Tâm Lý': 10,
      'Thể Thao': 11,
      'Phiêu Lưu': 12,
      'Âm Nhạc': 13,
      'Gia Đình': 14,
      'Học Đường': 15,
      'Hài Hước': 16,
      'Hình Sự': 17,
      'Võ Thuật': 18,
      'Khoa học': 19,
      'Thần Thoại': 20,
      'Chính Kịch': 21,
      'Kinh Điển': 22,
      'Hoạt Hình': 23
    };

    return categoryMapping[categoryName] || null;
  };
  return Category;
};