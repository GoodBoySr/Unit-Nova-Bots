// Temporary memory store (use DB later)
let accounts = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const newAccount = {
      id: Date.now().toString(),
      username,
      password,
      timestamp: new Date().toISOString()
    };
    accounts.push(newAccount);
    res.status(201).json({ success: true, account: newAccount });
  } else if (req.method === 'GET') {
    res.status(200).json(accounts);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}