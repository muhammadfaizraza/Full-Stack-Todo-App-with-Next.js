const { AsyncErrror, errorHandler } = require("@/middlewares/error");
import { User } from "@/models/user";
import { connectDb, cookieSave, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = AsyncErrror(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post request is Alowed");

  const { email, password } = req.body;
  if (!email || !password)
    return errorHandler(res, 402, "Please Enter all Fields");
  await connectDb();

  let user = await User.findOne({ email }).select("+password");

  if (!user) return errorHandler(res, 400, "User Not Found");
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) return errorHandler(res, 400, "User Not Found");

  const token = generateToken(user._id);
  cookieSave(res, token, true);

  res.status(201).json({
    success: true,
    message: `Welcome Back ${user.name}`,
    user,
  });
});
export default handler;
