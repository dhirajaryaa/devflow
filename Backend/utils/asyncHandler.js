const AsyncHandler = (requestedFunc) => (req, res, next) =>
  Promise.resolve(requestedFunc(req, res, next)).catch((err) => next(err));


export default AsyncHandler
