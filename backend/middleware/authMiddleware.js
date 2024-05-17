const jwt = require("jsonwebtoken");
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization").split(" ")[1]
    console.log(token);
    if (!token
    ) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }
    
    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized: Missing token" });
    // }

    // Verify the token
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);

    console.log("...");

    // Check if the user exists in the database
    const existingUser = await sequelize.query(
      `SELECT email FROM users WHERE email = '${decoded.email}'`,
      { type: QueryTypes.SELECT }
    );

    if (!existingUser.length) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    console.log(decoded);

    // Attach the decoded user to the request object for further processing
    req.user = decoded;
    next();
  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Error verifying token" });
  }
};

module.exports = authMiddleware;
