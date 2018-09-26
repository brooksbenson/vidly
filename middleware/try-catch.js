// handler = route handler
module.exports = function(handler) {
  // actual middleware function
  return async (req, res, next) => {
    try {
      await handler();
    } catch (err) {
      next(err);
    }
  };
};
