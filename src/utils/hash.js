import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// compare password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};