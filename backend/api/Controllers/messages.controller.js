import ConsversationsModel from "../Models/conversation.model.js";
import MessagesModel from "../Models/message.model.js";

/**
 * Send a message to a conversation.
 */
export const SendMessage = async (req, res, next) => {
  const { InputData } = req.body;
  const { id: ReceiverID } = req.params;
  const { id: SenderID } = req.user;



  // Find or create a conversation with the sender and receiver
  let conversation = await ConsversationsModel.findOne({
    participants: { $all: [SenderID, ReceiverID] },
  });
  if (!conversation) {
    conversation = await ConsversationsModel.create({
      participants: [SenderID, ReceiverID],
    });
  }

  // Create a new message with the content, sender ID, and receiver ID
  const newMessage = await MessagesModel.create({
    message: InputData,
    SenderID,
    ReceiverID
  });

  if (newMessage) {
    // Add the new message ID to the conversation's list of messages
    conversation.messages.push(newMessage._id);
  }

  // Save the conversation and the new message to the database
  await Promise.all([conversation.save(), newMessage.save()]);

  // Send a success response
  res.status(200).json({ message: "Message Sent" });
};

/**
 * Retrieves messages from a conversation between two users.
 */
export const GetMessages = async (req, res, next) => {
  try {
    // Extract the receiver ID and sender ID from the request
    const { id: ReceiverID } = req.params;
    const { id: SenderID } = req.user;

    // Find the conversation between the sender and receiver
    let conversation = await ConsversationsModel.findOne({
      participants: { $all: [SenderID, ReceiverID] },
    }).populate("messages");

    // If the conversation is not found or messages 
    if (!conversation) {
      conversation = await ConsversationsModel.create({
        participants: [SenderID, ReceiverID],
        messages: [],
      });

      // Return the new conversation with empty messages
      return res.status(200).json({ messages: [], conversation });
    }

    const messages = conversation.messages;

    // Return the retrieved messages in the response
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};