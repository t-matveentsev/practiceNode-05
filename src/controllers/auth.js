import {
  signinUser,
  signupUser,
  refreshUser,
  signoutUser,
} from "../services/auth.js";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const signupController = async (req, res) => {
  await signupUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully register user",
  });
};

export const signinController = async (req, res) => {
  const session = await signinUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Signin successfully",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Session successfully refresh",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await signoutUser(req.cookies.sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
