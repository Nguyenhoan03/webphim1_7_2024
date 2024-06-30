const Product = require('./product')
const Crawlphimhanhdong = require('../controller/crawl/Crawlphimhanhdong')
const initRoutes = (app)=>{
    app.use('/product',Product);
   
    app.use('/crawlphimhanhdong',Crawlphimhanhdong.crawlphimhanhdong);
}
module.exports = initRoutes