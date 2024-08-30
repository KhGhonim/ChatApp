import mongoose from "mongoose";
const { Schema, models } = mongoose;

// Messages Schema
const MessagesSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },

    SenderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ReceiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const MessagesModel = models.Messages || mongoose.model("Message", MessagesSchema);

export default MessagesModel;