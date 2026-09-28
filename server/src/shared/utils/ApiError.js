// Throw this from services/controllers; errorHandler turns it into a JSON response.
export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }

  static badRequest(message = 'Bad request', details) {
    return new ApiError(400, message, details)
  }

  static notFound(message = 'Not found') {
    return new ApiError(404, message)
  }

  static conflict(message = 'Conflict') {
    return new ApiError(409, message)
  }
}
