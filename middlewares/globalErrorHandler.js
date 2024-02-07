export const globalErrorHandler=(error,req,res,next)=>{
    let statusCode= error.status?error.status:500
    res.status(statusCode).json({
    message:error.message,
      stack:error.stack,
    })
  }