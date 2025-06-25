import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return res.status(401).json({ error: "Credentials cannot be empty" });

  try {
    const userNameExists = await User.findOne({ userName });
    if (userNameExists)
      return res.status(400).json({ error: "User already exits" });

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validateEmail = regex.test(email);
    if (!validateEmail) return res.status(400).json({ error: "invalid email" });
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ error: "Email already exists" });

    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validatePassword = regex.test(password);
    if (!validatePassword)
      return res.status(400).json({ error: "Invalid password" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
      userName,
      email,
      password: hashedPass,
    });

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();

      res.status(200).json({
        message: "User created successfully: ",
        data: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error(`Error signing user up: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "feilds cannot be null" });
  try {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validateEmail = regex.test(email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validatePassword = regex.test(password);

    const doesPassMatch = await bcrypt.compare(password, user.password);
    if (!validatePassword || !validateEmail || !doesPassMatch)
      return res.status(400).json({ error: "Invalid crendentials" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Logged in successfully",
      data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Error while loging user in: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: "",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error loggin out user: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
