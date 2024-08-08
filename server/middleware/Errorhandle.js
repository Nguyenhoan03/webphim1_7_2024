const ErrorHandler = (err, req, res, next) => {
    console.log('ERROR LOG ', new Date().toLocaleString());
	console.log('Request:', req.method, req.originalUrl);
	console.log('Params:', req.params);
	console.log('Body:', req.body);
	console.log('Query:', req.query);
	console.log('Message Error: ', err.message);
	console.log('Error stack: ', err.stack);
    console.log("--------------------------------------------------------------------------------------");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack  
    });
};

module.exports = ErrorHandler;
