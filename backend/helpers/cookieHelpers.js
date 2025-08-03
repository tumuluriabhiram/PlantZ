// backend/helpers/cookieHelpers.js
export const setAuthCookie = (res, token) => {
  console.log('Setting auth cookie with token:', token);
  console.log('Environment:', process.env.NODE_ENV);
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction, // Only use HTTPS in production
    sameSite: isProduction ? 'none' : 'lax', // For cross-site requests in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // Don't set domain for cross-origin cookies - let the browser handle it
  };
  
  console.log('Cookie options:', cookieOptions);
  res.cookie('token', token, cookieOptions);
};

export const clearAuthCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    // Don't set domain for cross-origin cookies - let the browser handle it
  };
  
  res.clearCookie('token', cookieOptions);
};