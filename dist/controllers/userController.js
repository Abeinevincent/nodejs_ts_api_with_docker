"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const UserService = __importStar(require("../services/userService"));
const User_1 = __importDefault(require("../models/User"));
// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await UserService.loginUser(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = loginUser;
// Get all users
const getAllUsers = async (_req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserById = getUserById;
// Update user by ID
const updateUser = async (req, res) => {
    try {
        const availableUser = await User_1.default.findById(req.params.id);
        if (!availableUser) {
            console.log(" user not found");
            return res.status(404).json({ error: "User not found" });
        }
        console.log(availableUser);
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.userId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map