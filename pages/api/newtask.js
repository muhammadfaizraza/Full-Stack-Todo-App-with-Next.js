import { checkAuth, connectDb } from "@/utils/features";
import { Task } from "@/models/task";
import { AsyncErrror, errorHandler } from "@/middlewares/error";

const handler = AsyncErrror(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post request is Alowed");

  await connectDb();

  const { title, descripion } = req.body;

  const user = await checkAuth(req);

  await Task.create({
    title,
    descripion,
    user: user._id,
  });
  res.json({
    success: true,
    message: "Task Created Successfully",
  });
});
export default handler;
