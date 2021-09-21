function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.status(401).json({
      error: 'not logged in'
    })
    return
  } else {
    next()
  }
}

module.exports = checkAuth