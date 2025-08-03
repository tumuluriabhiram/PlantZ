import express from 'express';
import {
    isAuthenticated,
    login,
    logout,
    register,
    resetPassword,
    sendResetOtp,
    sendVerifyOtp,
    verifyEmail
} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

// Debug endpoint to check cookies
authRouter.get('/debug-cookies', (req, res) => {
    console.log('All cookies:', req.cookies);
    console.log('Headers:', req.headers);
    res.json({ 
        cookies: req.cookies, 
        hasToken: !!req.cookies.token,
        environment: process.env.NODE_ENV,
        origin: req.headers.origin 
    });
});

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

// Authenticated routes
authRouter.post('/logout', userAuth, logout);
authRouter.get('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);

export default authRouter;