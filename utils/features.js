import { serialize } from "cookie";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
export const connectDb = async () => {
  const { connection } = await mongoose.connect(process.env.MongoURI, {
    dbName: "TodoApp",
  });
  console.log(`DataBase is Connected ${connection.host}`);
};

export const cookieSave = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.Jwt_Secrets);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;

  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const decoded = jwt.verify(token, process.env.Jwt_Secrets);

  return await User.findById(decoded._id);
};
