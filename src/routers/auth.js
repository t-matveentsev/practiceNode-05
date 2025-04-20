import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { authSignupSchema } from "../validation/auth.js";
import { signupController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(authSignupSchema),
  ctrlWrapper(signupController)
);

export default authRouter;
