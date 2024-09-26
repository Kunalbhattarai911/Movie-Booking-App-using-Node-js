export const isSuperAdmin = (req, res, next) => {
    const { role } = req.user; // This assumes req.user is set by previous middleware
  
    if (role !== 'SuperAdmin') {
      return res.status(403).json({
        message: 'Access denied. Only SuperAdmin can perform this action.',
        success: false,
      });
    }
  
    next(); // Proceed to the next middleware or route handler
  };
  