const verifyRoles = (...allowedRoles) => {
  
  return (req, res, next) => {
    const userRole = req.user?.role;
    console.log(allowedRoles);
    console.log("You are: ",userRole);
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log("Not allowed");
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = verifyRoles;