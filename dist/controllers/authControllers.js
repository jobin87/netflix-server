"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuser = exports.getAllUsers = exports.logout = exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const SECRET_KEY = "112eryt33";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if all fields are provided
        if (!username || !email || !password) {
            res.status(400).json({ success: false, message: 'All fields are required' });
            return;
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: 'Invalid email format' });
            return;
        }
        // Validate password length
        if (password.length < 6) {
            res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
            return;
        }
        // Check if the email already exists
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User exists with this email' });
            return;
        }
        // Check if the username already exists
        const existingUsername = yield user_1.default.findOne({ username });
        if (existingUsername) {
            res.status(400).json({ success: false, message: 'Username already taken' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user and save it to the database
        const newUser = new user_1.default({
            username,
            email,
            password: hashedPassword,
        });
        const userResponse = {
            userId: newUser._id, // Map _id to userId
            email: newUser.email,
            name: newUser.username,
        };
        yield newUser.save();
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || SECRET_KEY, { expiresIn: '1h' });
        // Respond with the success message and token
        res.status(200).json({ success: true, message: 'Signup successful', token, userResponse });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Compare the password with the hashed password
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || SECRET_KEY, { expiresIn: '1h' });
        // Fetch movies from JSON file
        const filepath = path_1.default.join(__dirname, "../../contentjson/content.json");
        const fileData = fs_1.default.readFileSync(filepath, "utf-8");
        const movieData = JSON.parse(fileData);
        // Filter movies and series
        const movies = movieData.filter((item) => item.Type === "movie");
        const series = movieData.filter((item) => item.Type === "series");
        const anime = movieData.filter((item) => item.Type === "anime");
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
        });
        // Respond with the success message and token
        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, email: user.email },
            movies,
            series,
            anime,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('authToken'); // Clear the cookie on logout
        res.status(200).json({ LoggedOut: true, message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});
exports.logout = logout;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const users = yield user_1.default.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.getAllUsers = getAllUsers;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        console.log(`User with email ${email} is deleting`);
        // Find and delete the user by email
        const deleteduser = yield user_1.default.findOneAndDelete({ email });
        if (!deleteduser) {
            // User not found
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        // Successfully deleted user
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error });
    }
});
exports.deleteuser = deleteuser;
