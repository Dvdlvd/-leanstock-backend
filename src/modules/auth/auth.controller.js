import {
    registerUser,
    loginUser,
    refreshTokens,
    logoutUser
  } from "./auth.service.js";
  import { registerSchema, loginSchema } from "./auth.validator.js";
  
  export const register = async (req, res, next) => {
    try {
      const data = registerSchema.parse(req.body);
  
      const user = await registerUser(data.email, data.password);
  
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
  
  export const login = async (req, res, next) => {
    try {
      const data = loginSchema.parse(req.body);
  
      const tokens = await loginUser(data.email, data.password);
  
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  };
  
  export const refresh = async (req, res, next) => {
    try {
      const { token } = req.body;
  
      const result = await refreshTokens(token);
  
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
  
  export const logout = async (req, res, next) => {
    try {
      const { token } = req.body;
  
      await logoutUser(token);
  
      res.json({ message: "Logged out" });
    } catch (err) {
      next(err);
    }
  };