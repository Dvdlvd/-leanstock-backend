import prisma from "../../prisma/client.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt.js";
import { AppError } from "../../utils/errors.js";

// REGISTER
export const registerUser = async (email, password) => {
  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    throw new AppError("User already exists", 409);
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: "MANAGER", // 👈 чтобы сразу тестить бизнес-логику
      tenant: {
        create: {
          name: "Default Tenant"
        }
      }
    },
    include: {
      tenant: true
    }
  });

  return user;
};

// LOGIN
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const payload = {
    userId: user.id,
    role: user.role,
    tenantId: user.tenantId
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 дней
      )
    }
  });

  return {
    accessToken,
    refreshToken
  };
};

// REFRESH TOKEN
export const refreshTokens = async (token) => {
  const decoded = verifyRefreshToken(token);

  const stored = await prisma.refreshToken.findFirst({
    where: {
      token,
      revoked: false
    }
  });

  if (!stored) {
    throw new AppError("Invalid refresh token", 401);
  }

  const payload = {
    userId: decoded.userId,
    role: decoded.role,
    tenantId: decoded.tenantId
  };

  const newAccessToken = generateAccessToken(payload);

  return {
    accessToken: newAccessToken
  };
};

// LOGOUT
export const logoutUser = async (token) => {
  await prisma.refreshToken.updateMany({
    where: { token },
    data: { revoked: true }
  });

  return { message: "Logged out" };
};