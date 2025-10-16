const authorize = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('No token provided');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      const error = new Error('No token provided');
      error.statusCode = 401;
      throw error;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.userId };
      next();
    } catch (err) {
      const error = new Error('Token is not valid');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default authorize;