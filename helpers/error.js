function ErrorHandler() {
  // error codes
  const randomError = 404;
  this.INTERNAL_SERVER_ERROR = 500;
  this.OK = 202;
  this.CONFLICT = 409;
  this.BAD_REQUEST = 400;
  this.FORBIDDEN = 403;

  this.randomError = (debugMessage) => {
    return {
      status: 400,
      message: 'serverError',
      errorMessage: 'Request could not be processed by the server. Please retry.',
      errorCode: randomError,
      debugMessage,
    };
  };

}

module.exports = new ErrorHandler();
