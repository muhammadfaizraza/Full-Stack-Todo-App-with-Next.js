const { AsyncErrror, errorHandler } = require("@/middlewares/error");
import { connectDb, cookieSave } from "@/utils/features";
const handler = AsyncErrror(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only Post request is Alowed");

  await connectDb();

  cookieSave(res, null, false);

  res.status(201).json({
    success: true,
    message: `Logout Successfully`,
  });
});
export default handler;
