import mongoose from "mongoose";
const { Schema, models } = mongoose;

// Consversations Schema
const ConsversationsSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],

  },
  {
    timestamps: true,
  }
);

const ConsversationsModel = models.Consversations || mongoose.model("Consversation", ConsversationsSchema);

export default ConsversationsModel;