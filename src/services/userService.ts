// Import necessary modules
import { generateToken } from "../utils/jwtUtils";
import User, { IUser } from "../models/User";
import { comparePassword, hashPassword } from "../utils/passwordUtils";

// Create a new user
export const createUser = async (userInput: IUser): Promise<IUser> => {
  try {
    // Hash the user's password before storing it
    const hashedPassword = await hashPassword(userInput.password);

    // Create the user with the hashed password
    const newUser = await User.create({
      ...userInput,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: Omit<IUser, "password">; token: string }> => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // Destructure password from the data returned
    const { password: _password, ...userData } = user.toObject();

    return { user: userData as Omit<IUser, "password">, token };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};

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
export const populateUser = async (user: IUser): Promise<IUser> => {
  return User.populate(user, { path: "savedProducts" });
};

// Get user by ID with his saved products
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const populatedUser = await populateUser(user);
      return populatedUser;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error getting user: ${error.message}`);
  }
};

// Update user by ID
export const updateUser = async (
  userId: string,
  updatedUser: Partial<IUser>
): Promise<unknown> => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    console.log(user, "user after update");
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Delete user by ID
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
