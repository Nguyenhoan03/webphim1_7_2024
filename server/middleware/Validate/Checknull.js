const CheckNull = (params) => {
    return (req, res, next) => {
      const missingParams = params.filter(param => req.body[param] === null || req.body[param] === undefined);
      
      if (missingParams.length > 0) {
        return res.status(400).json({
          error: `Missing required fields: ${missingParams.join(', ')}`
        });
      }
      
      next();
    };
  };

  module.exports = CheckNull