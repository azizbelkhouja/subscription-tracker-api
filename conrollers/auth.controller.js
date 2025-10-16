import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {

  const session =  await mongoose.startSession();
  session.startTransaction();

  try {
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

}

export const signOut = async (req, res, next) => {

}