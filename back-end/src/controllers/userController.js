const prisma = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log(req.body);
  let { mobileNumber, fullName, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { mobileNumber, fullName, password: hashedPassword, role },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: "User registration failed", details: error });
  }
};

const login = async (req, res) => {
  const { mobileNumber, password, role } = req.body;
  try {
    // Check if user exists with the provided mobile number
    const user = await prisma.user.findUnique({ where: { mobileNumber } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if role matches
    if (user.role !== role) {
      return res.status(400).json({ error: "Role mismatch" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate and send token on successful login
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = {
  register,
  login,
};
