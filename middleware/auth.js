// checking if the user is authenticated or not yet
module.exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user.id) {
    return next();
    } else {
    return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in to continue.' 
    });
  }
}

// checking user is admin or not
module.exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.user.role_id === 1) {
    return next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You must be an admin to perform this action.'
    });
  }
}