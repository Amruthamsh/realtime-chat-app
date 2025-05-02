import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const newMessage = await Message.create({
      chatId,
      senderId,
      text,
    });

    const response = await newMessage.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
