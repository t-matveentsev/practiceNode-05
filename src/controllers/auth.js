import { signinUser, signupUser } from "../services/auth.js";

export const signupController = async (req, res) => {
  await signupUser(req.body);

  res.status(201).json({
    message: "Successfully register user",
  });
};

export const signinController = async (req, res) => {
  const session = await signinUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: "Signin successfully",
    data: {
      accessToken: session.accessToken,
    },
  });
};
