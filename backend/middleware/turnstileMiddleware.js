const axios = require('axios');

// const turnstileMiddleware = async (req, res, next) => {
//     const { cfTurnstileResponse } = req.body;
//     if (!cfTurnstileResponse) {
//         return res.status(400).json({ error: 'Turnstile token missing' });
//     }
//     // Validate token using Cloudflare API
//     const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
//     const formData = new FormData();
//     formData.append('secret', secretKey);
//     formData.append('response', cfTurnstileResponse);
//     try {
//         const response = await fetch(
//             'https://challenges.cloudflare.com/turnstile/v0/siteverify',
//             {
//                 method: 'POST',
//                 body: formData
//             }
//         );
//         const data = await response.json();
//         if (!data.success) {
//             return res.status(400).json({ error: 'Turnstile verification failed' });
//         }
//         next();
//     } catch (error) {
//         console.error('Turnstile verification error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

module.exports = turnstileMiddleware;