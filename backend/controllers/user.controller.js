import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const updateUser = async (req, res) => {
  const userId = req.user;
  const { userName, email, newPassword, currentPassword } = req.body;
  let { profileImage } = req.body;
  let hashPassword = null;
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (userName) {
      const userNameExists = await User.findOne({ userName });
      if (
        userNameExists &&
        userNameExists._id.toString() !== user._id.toString()
      )
        return res.status(400).json({ error: "Username already exists" });
    }

    if (email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const validateEmail = regex.test(email);
      if (!validateEmail)
        return res.status(400).json({ error: "invalid email" });
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== user._id.toString())
        return res.status(400).json({ error: "Email already exists" });
    }

    if ((!newPassword && currentPassword) || (newPassword && !currentPassword))
      return res
        .status(400)
        .json({ error: "Need both current and new password" });

    if (newPassword && currentPassword && currentPassword === newPassword)
      return res
        .status(400)
        .json({ error: "New password and current password cannot be same" });

    if (newPassword && currentPassword) {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const validatePassword = regex.test(newPassword);
      if (!validatePassword)
        return res.status(400).json({ error: "Invalid password" });
      const doPassMatch = await bcrypt.compare(currentPassword, user.password);
      if (!doPassMatch)
        return res.status(400).json({ error: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(newPassword, salt);
    }

    if (profileImage) {
      if (user.profileImage) {
        await cloudinary.uploader.destroy(
          user.profileImage.split("/").pop()[0]
        );
      }
      const imageUrl = await cloudinary.uploader.upload(profileImage);
      profileImage = imageUrl.secure_url;
    }

    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.password = hashPassword || user.password;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    user.password = null;

    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
  }
};

export const getUser = async (req, res) => {
  try {
    const { user } = req;

    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(`Error while fetching current user: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
