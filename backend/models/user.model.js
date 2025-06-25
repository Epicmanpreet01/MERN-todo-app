import { Schema, model } from "mongoose";

const User = model(
  "User",
  new Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default User;
