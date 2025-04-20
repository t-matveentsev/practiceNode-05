import { signupUser } from "../services/auth.js";

export const signupController = async (req, res) => {
  await signupUser(req.body);

  res.json({
    message: "Successfully register user",
  });
};
