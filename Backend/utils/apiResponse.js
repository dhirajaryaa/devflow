class ApiResponse {
  constructor(
    statusCode = 200,
    message = "Successful",
    data = null,
    isSuccess = true,
    isError = false
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.isSuccess = isSuccess;
    this.isError = isError;
  }
}

export default ApiResponse;
