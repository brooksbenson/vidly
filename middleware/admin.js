function admin(req, res, next) {
  const { isAdmin } = req.user;
  if (isAdmin) {
    next();
  } else {
    return res.status(403).send();
  }
}

module.exports = admin;
