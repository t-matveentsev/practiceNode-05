import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { authSignupSchema, authSigninSchema } from "../validation/auth.js";
import {
  signupController,
  signinController,
  refreshController,
  signoutController,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(authSignupSchema),
  ctrlWrapper(signupController)
);

authRouter.post(
  "/signin",
  validateBody(authSigninSchema),
  ctrlWrapper(signinController)
);

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/signout", ctrlWrapper(signoutController));

export default authRouter;
