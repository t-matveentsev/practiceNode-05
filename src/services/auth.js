import UserCollection from "../db/models/User.js";

export const signupUser = async (payload) => {
  return await UserCollection.create(payload);
};
