import express from 'express';
import { body } from 'express-validator';
import { register, verifyOtp, login, resendOtp } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
router.post(
    '/register',
    [
        body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    register
);

// @route   POST /api/auth/verify-otp
router.post(
    '/verify-otp',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('otp', 'OTP must be 6 characters long').isLength({ min: 6, max: 6 }),
    ],
    verifyOtp
);

// @route   POST /api/auth/login
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    login
);

// @route   POST /api/auth/resend-otp
router.post(
    '/resend-otp',
    [ body('email', 'Please include a valid email').isEmail() ],
    resendOtp
);

export default router;