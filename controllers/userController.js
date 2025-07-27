import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = { email, password: hashedpwd };
    const result = await userModel.create(user);
    res
      .status(201)
      .json({ message: "User registered successfully", userId: result._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = {
          userId: existingUser._id,
          email: existingUser.email,
        };
        const token = jwt.sign(userObj, secret, { expiresIn: "1h" });
        res.status(201).json({ ...userObj, token });
      } else {
        res.status(400).json({ message: "Password does not match" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export { register, login };
