import { generateToken, connectDb, checkAuth } from "@/utils/features";
import { Task } from "@/models/task";
import { AsyncErrror, errorHandler } from "@/middlewares/error";

const handler = AsyncErrror(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only Get request is Alowed");

  await connectDb();

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");
  const tasks = await Task.find({ user: user._id });
  res.json({
    success: true,
    message: "Task Created Successfully",
    tasks,
  });
});
export default handler;
