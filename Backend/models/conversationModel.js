import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

const conversation = mongoose.model("Conversation" , conversationSchema)
export default conversation;
