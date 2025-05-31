// Temporary memory store (use DB later)
let messages = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { chatId, sender, message } = req.body;
    if (!chatId || !sender || !message) {
      return res.status(400).json({ error: 'Missing chatId, sender, or message' });
    }

    const newMessage = {
      chatId,
      sender, // 'user' or 'admin'
      message,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    res.status(201).json({ success: true, message: newMessage });
  } else if (req.method === 'GET') {
    const { chatId } = req.query;
    const chatMessages = messages.filter(msg => msg.chatId === chatId);
    res.status(200).json(chatMessages);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}