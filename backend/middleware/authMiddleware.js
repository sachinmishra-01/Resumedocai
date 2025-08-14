import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;

    // Check if the request headers contain the authorization token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get token from header (it's in the format "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using your JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user from the database using the id from the token
            // Attach the user to the request object so our controller can access it
            req.user = await User.findById(decoded.user.id).select('-password');

            // 4. Move on to the next step (the actual controller)
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};