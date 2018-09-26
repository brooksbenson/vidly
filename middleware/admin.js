function admin(req, res, next) {
  const { isAdmin } = req.user;
  console.log(req.user);
  if (isAdmin) {
    next();
  } else {
    return res.status(403).send();
  }
}

module.exports = admin;
