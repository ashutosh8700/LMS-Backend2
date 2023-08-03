const errorMiddleware = (error, req, res,next) => {

    req.statusCode = req.statusCode || 500; 
    req.message = req.message || "Some" // if error message is there then error message else Something went wrong
    
     return res.status().json({
        success: flase,
        message:  req.message,
        stack: error.stack 
    });
}
// errorMiddleware will generic message which will tell the error to be printed
module.exports = errorMiddleware;

module.exports = app;