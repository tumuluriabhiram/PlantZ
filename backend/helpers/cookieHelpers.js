// backend/helpers/cookieHelpers.js
export const setAuthCookie = (res, token) => {
  // When you set the cookie, make sure you have these options:
  console.log(token);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // For cross-site requests in production
    domain: process.env.NODE_ENV === 'production' ? 'plantz-frontend.onrender.com' : 'localhost', // Only domain name, no protocol
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    domain: process.env.NODE_ENV === 'production' ? 'plantz-frontend.onrender.com' : 'localhost', // Only domain name, no protocol
  });
};