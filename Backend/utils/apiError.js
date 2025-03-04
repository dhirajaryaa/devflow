class ApiError extends Error {
  constructor(
    statusCode = 400,
    message = "Something went Wrong!",
    data = null,
    isSuccess = false,
    isError = true,
    error = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.isSuccess = isSuccess;
    this.isError = isError;
    this.error = error;
  }
}

export default ApiError;
