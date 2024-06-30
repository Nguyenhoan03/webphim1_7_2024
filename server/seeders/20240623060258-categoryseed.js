'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const categories = [
      'Hành Động', 'Cổ Trang', 'Chiến Tranh', 'Viễn Tưởng', 'Kinh Dị',
      'Tài Liệu', 'Bí Ẩn', 'Phim 18+', 'Tình Cảm', 'Tâm Lý',
      'Thể Thao', 'Phiêu Lưu', 'Âm Nhạc', 'Gia Đình', 'Học Đường',
      'Hài Hước', 'Hình Sự', 'Võ Thuật', 'Khoa học', 'Thần Thoại',
      'Chính Kịch', 'Kinh Điển','Hoạt Hình'
    ];

   
    const categoryObjects = categories.map(name => ({ namecategory: name }));

    await queryInterface.bulkInsert('category', categoryObjects, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
