const Xemphim = require('../services/Xemphimservices.js');

const datafilm = async (req, res) => {
   try {
       const { titlefilm, episode } = req.params;
      
       const filmData = await Xemphim.xemphim(titlefilm, episode);
       res.status(200).json({ success: true, data: filmData });
   } catch (error) {
       console.error('Error fetching film data:', error);
       res.status(500).json({ success: false, error: 'Error fetching film data' });
   }
}

module.exports = { datafilm };