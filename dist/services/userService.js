"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.populateUser = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
// Import necessary modules
const jwtUtils_1 = require("../utils/jwtUtils");
const User_1 = __importDefault(require("../models/User"));
const passwordUtils_1 = require("../utils/passwordUtils");
// Create a new user
const createUser = async (userInput) => {
    try {
        // Hash the user's password before storing it
        const hashedPassword = await (0, passwordUtils_1.hashPassword)(userInput.password);
        // Create the user with the hashed password
        const newUser = await User_1.default.create({
            ...userInput,
            password: hashedPassword,
        });
        return newUser;
    }
    catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};
exports.createUser = createUser;
// Login user
const loginUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await (0, passwordUtils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        // Generate JWT token
        const token = (0, jwtUtils_1.generateToken)({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        // Destructure password from the data returned
        const { password: _password, ...userData } = user.toObject();
        return { user: userData, token };
    }
    catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
    }
};
exports.loginUser = loginUser;
// Get all users
const getAllUsers = async () => {
    try {
        const users = await User_1.default.find();
        return users;
    }
    catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID with his saved products
// export const getUserById = async (userId: string): Promise<IUser | null> => {
//   try {
//     const user = await User.findById(userId).populate("savedProducts");
//     return user;
//   } catch (error) {
//     throw new Error(`Error getting user: ${error.message}`);
//   }
// };
// Function to populate user with savedProducts
const populateUser = async (user) => {
    return User_1.default.populate(user, { path: "savedProducts" });
};
exports.populateUser = populateUser;
// Get user by ID with his saved products
const getUserById = async (userId) => {
    try {
        const user = await User_1.default.findById(userId);
        if (user) {
            const populatedUser = await (0, exports.populateUser)(user);
            return populatedUser;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
};
exports.getUserById = getUserById;
// Update user by ID
const updateUser = async (userId, updatedUser) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(userId, updatedUser, {
            new: true,
        });
        console.log(user, "user after update");
        return user;
    }
    catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
exports.updateUser = updateUser;
// Delete user by ID
const deleteUser = async (userId) => {
    try {
        await User_1.default.findByIdAndDelete(userId);
    }
    catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userService.js.map