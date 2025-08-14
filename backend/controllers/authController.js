import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// @desc    Register a new user
export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        });
        
        const message = `Your One-Time Password (OTP) for verification is: ${otp}. It is valid for 10 minutes.`;
        await sendEmail({
            email: user.email,
            subject: 'Your Verification OTP',
            message,
        });

        await user.save();

        res.status(201).json({ msg: 'Registration successful. Please check your email for the OTP.' });

    } catch (err) {
       next(err);
    }
};

// @desc    Verify user's email with OTP
export const verifyOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
        }
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ msg: 'Email verified successfully. You can now log in.' });

    } catch (err) {
        next(err);
    }
};


// @desc    Login user
export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        if (!user.isVerified) {
            return res.status(400).json({ msg: 'Please verify your email before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        next(err);
    }
};


// --- ADD THIS ENTIRE NEW FUNCTION ---
// @desc    Resend verification OTP
export const resendOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User with this email does not exist.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: 'This account is already verified.' });
        }

        // Generate a new OTP and set its expiry time
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        user.otp = otp;
        user.otpExpires = otpExpires;

        // Send the new OTP via email
        const message = `Your new One-Time Password (OTP) for verification is: ${otp}. It is valid for 10 minutes.`;
        await sendEmail({
            email: user.email,
            subject: 'Your New Verification OTP',
            message,
        });

        // Save the user document with the new OTP details
        await user.save();

        res.status(200).json({ msg: 'A new OTP has been sent to your email.' });

    } catch (err) {
        next(err);
    }
};