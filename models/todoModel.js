import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String , required: true},
    status: { type: String, default: "pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
