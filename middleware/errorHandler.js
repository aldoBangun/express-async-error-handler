const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
   let error = { ...err }

   // log for dev
   console.log(err)

   // 11000 is mongoose duplication code error status code
   if(err.code === 11000) {
      const message = `Todo item can't be duplicated`
      error = new ErrorResponse(message, 400)
   }

   // Resource Not Found
   if(err.name === 'CastError') {
      const message = `Resource Not Found`
      error = new ErrorResponse(message, 404)
   }

   // Validation Error
   if(err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message)
      error = new ErrorResponse(message, 400)
   }

   res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error"
   })
}


module.exports = errorHandler