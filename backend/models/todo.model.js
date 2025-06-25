import { Schema, model } from "mongoose";

const ToDo = model(
  "ToDo",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      heading: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
      },
      dueDate: {
        type: new Date(),
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default ToDo;
