const { AsyncErrror, errorHandler } = require("@/middlewares/error");
import { User } from "@/models/user";
import { connectDb, cookieSave, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = AsyncErrror(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post request is Alowed");

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return errorHandler(res, 402, "Please Enter all Fields");
  await connectDb();

  let user = User.findOne(email);
  // if (user) return errorHandler(res, 400, "User is Already Exist");
  const hasedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hasedPassword,
  });
  const token = generateToken(user._id);
  cookieSave(res, token, true);

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
});
export default handler;
