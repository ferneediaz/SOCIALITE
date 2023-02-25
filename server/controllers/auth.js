import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Function to handle errors
const handleError = (res, err) => {
  res.status(500).json({ error: err.message });
};

// Register user function
export const register = async (req, res) => {
  try {
    // Destructure the body of the request
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    // Save the user to the database and return it
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    // If there is an error, handle it
    handleError(res, err);
  }
};

// Login function
export const login = async (req, res) => {
  try {
    // Destructure the body of the request
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email: email });

    // If the user doesn't exist, return a 400 status and an error message
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the password provided with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return a 400 status and an error message
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // Generate a JSON web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the password from the user object
    delete user.password;

    // Return a 200 status, the token, and the user information
    res.status(200).json({ token, user });
  } catch (err) {
    // If there is an error, handle it
    handleError(res, err);
  }
};
