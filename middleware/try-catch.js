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

/*
  This functionality is created
  with the express-async-errors
  package, which monkey patches
  each route with a function
  similar to that above.
*/
