export const errorHandler = (err, req, res, next) => {
  // Log the error to the console for the developer
  console.error(err.stack);

  // If a status code has already been set, use it. Otherwise, default to 500 (Internal Server Error).
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // Only show the detailed error stack if we are in development mode for security reasons
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};