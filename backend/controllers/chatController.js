import fetch from 'node-fetch';

export function getChats(req, res) {
  const userMessage = req.body.message;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  console.log(GEMINI_API_KEY)

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not set in environment.' });
  }

  fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    }
  )
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data.candidates[0].content.parts[0].text);
    })
    .catch(error => {
      console.error('Gemini API error:', error);
      res.status(500).json({ error: 'Gemini API request failed.' });
    });
}

const chatController = {
  getChats
};

export default chatController;