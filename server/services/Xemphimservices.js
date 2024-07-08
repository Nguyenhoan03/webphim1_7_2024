const { Product,Linkfilm } = require('../models');
const { Op, where } = require('sequelize');

const xemphim = async(title,episode)=>{
     const data = await Linkfilm.findOne({
          where: {
               title: title,
               episode : episode,
          }
          
     })
     return data;
}
module.exports = {xemphim}