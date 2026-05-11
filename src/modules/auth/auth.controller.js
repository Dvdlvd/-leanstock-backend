import {
  registerUser,
  loginUser,
  refreshTokens,
  logoutUser,
  verifyUserEmail,
  requestPasswordReset,
  resetPassword
} from "./auth.service.js";

// REGISTER
export const register = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password,
      role
    } = req.body;

    const user =
      await registerUser(
        email,
        password,
        role
      );

    res.json(user);

  } catch (error) {

    next(error);

  }

};

// LOGIN
export const login = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const tokens =
      await loginUser(
        email,
        password
      );

    res.json(tokens);

  } catch (error) {

    next(error);

  }

};

// REFRESH
export const refresh = async (
  req,
  res,
  next
) => {

  try {

    const { refreshToken } = req.body;

    const token =
      await refreshTokens(
        refreshToken
      );

    res.json(token);

  } catch (error) {

    next(error);

  }

};

// LOGOUT
export const logout = async (
  req,
  res,
  next
) => {

  try {

    const { refreshToken } = req.body;

    const result =
      await logoutUser(
        refreshToken
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};

// VERIFY EMAIL
export const verifyEmail = async (
  req,
  res,
  next
) => {

  try {

    const { token } = req.params;

    const result =
      await verifyUserEmail(
        token
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};

// FORGOT PASSWORD
export const forgotPassword = async (
  req,
  res,
  next
) => {

  try {

    const { email } = req.body;

    const result =
      await requestPasswordReset(
        email
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};

// RESET PASSWORD
export const changePassword = async (
  req,
  res,
  next
) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const result =
      await resetPassword(
        token,
        password
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};