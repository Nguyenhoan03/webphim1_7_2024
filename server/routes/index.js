const express = require('express');
const router = express.Router();
const Product = require('./product');
const Crawlphimhanhdong = require('../controller/crawl/Crawlphimhanhdong');
const Usercontroller = require('../controller/Usercontroller');
const ErrorHandler = require('../middleware/Errorhandle'); // Đảm bảo đường dẫn đúng

const initRoutes = (app) => {


    app.use('/product', Product);
    app.post('/dang-nhap', Usercontroller.Login);
    app.post('/dang-ky', Usercontroller.Register);
    app.get('/crawlphimhanhdong', Crawlphimhanhdong.crawlphimhanhdong);

    // Use router
    app.use(router);
    app.get('/error', (req, res, next) => {
        const error = new Error('Something went wrong!');
        error.statusCode = 400;
        error.stack = new Error().stack; // Thêm stack trace
        next(error); // Chuyển tiếp lỗi cho middleware xử lý lỗi
    });
    
    // Error handler should be the last middleware
    app.use(ErrorHandler);
};

module.exports = initRoutes;
