import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {

  const session =  await mongoose.connection.startSession();
  session.startTransaction();

  try {
    console.log("Body received:", req.body);
    //logic to create a new user
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) {
      const error = new Error('Email already in use');
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{
      name,
      email,
      password: hashedPassword
    }], {session});

    const token = jwt.sign({userId: newUsers[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: {
          id: newUsers[0]._id,
          name: newUsers[0].name,
          email: newUsers[0].email
        },
        token
      }
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }


}

export const signIn = async (req, res, next) => {

  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      }
    });
    
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {

}