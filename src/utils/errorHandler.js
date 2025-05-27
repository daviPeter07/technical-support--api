class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //message error
    this.statusCode = statusCode; //ler o codigo de erro http
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; //define fail para codes 400 e error pra codes 500
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

//tratar erros de negocios
const handleCastErrorDB = (err) => { 
  const message = `Valor inválido ${err.path}: ${err.value}`; 
  return new AppError(message, 400); 
};
const handleDuplicateFieldsDB = (err) => { 
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; 
  const message = `Valor duplicado: ${value}. Por favor use outro valor!`; 
  return new AppError(message, 400); 
};
const handleValidationErrorDB = (err) => { 
  const errors = Object.values(err.errors).map(el => el.message); 
  const message = `Dados inválidos. ${errors.join('. ')}`; 
  return new AppError(message, 400); 
};

//tratar erros de token
const handleJWTError = () => new AppError('Token inválido. Por favor faça login novamente!', 401); //
const handleJWTExpiredError = () => new AppError('Seu token expirou! Por favor faça login novamente.', 401); //

const sendErrorDev = (err, res) => { 
  res.status(err.statusCode).json({ 
    status: err.status, error: err, message: err.message, stack: err.stack 
  });
};

//envia res pra produção
const sendErrorProd = (err, res) => { 
  if (err.isOperational) { 
    res.status(err.statusCode).json({ status: err.status, message: err.message }); 
  } else {
    console.error('ERRO 💥', err);
    res.status(500).json({ status: 'error', message: 'Algo deu muito errado!' });
  }
};

export default (err, req, res, next) => { 
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') { 
    sendErrorDev(err, res); 
  } else if (process.env.NODE_ENV === 'production') { 
    let error = { ...err }; 
    error.message = err.message; 

    //adapta erros para o padrao do prisma
    if (error.name === 'CastError') error = handleCastErrorDB(error); 
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); 
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error); 
    if (error.name === 'JsonWebTokenError') error = handleJWTError(); 
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(); 

    sendErrorProd(error, res); 
  }
};

export { AppError }; //