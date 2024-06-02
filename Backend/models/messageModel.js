import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: String,
  },
  { timestamps: true }
);
 
const Message = mongoose.model("Message" , messageSchema);

export default Message;