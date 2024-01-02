import { Request, Response } from "express";
import * as UserService from "../services/userService";
import User from "../models/User";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { user, token } = await UserService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.getUserById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
export const updateUser = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const availableUser = await User.findById(req.params.id);

    if (!availableUser) {
      console.log(" user not found");
      return res.status(404).json({ error: "User not found" });
    }
    console.log(availableUser);
    const updatedUser = await UserService.updateUser(req.params.id, req.body);

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await UserService.deleteUser(req.params.userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
