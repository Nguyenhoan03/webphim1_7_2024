const Product = require('./product')
const Crawlphimhanhdong = require('../controller/crawl/Crawlphimhanhdong')
const Usercontroller = require('../controller/Usercontroller')
const {verifyToken} = require('../middleware/Authmiddlware')
const initRoutes = (app)=>{
    app.use('/product',Product);
    app.post('/dang-nhap',Usercontroller.Login)
    app.post('/dang-ky',Usercontroller.Register)
   
    app.get('/crawlphimhanhdong',Crawlphimhanhdong.crawlphimhanhdong);
}
module.exports = initRoutes