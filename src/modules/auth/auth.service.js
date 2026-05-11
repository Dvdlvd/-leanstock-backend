import prisma from "../../prisma/client.js";

import {
  hashPassword,
  comparePassword
} from "../../utils/hash.js";

import crypto from "crypto";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt.js";

import { AppError } from "../../utils/errors.js";

import {
  sendVerificationEmail
} from "../../utils/email.js";

// REGISTER
export const registerUser = async (
  email,
  password,
  role
) => {

  const existing =
    await prisma.user.findUnique({
      where: { email }
    });

  if (existing) {

    throw new AppError(
      "User already exists",
      409
    );

  }

  const hashed =
    await hashPassword(password);

  const verificationToken =
    crypto.randomUUID();

  const user =
    await prisma.user.create({
      data: {
        email,

        password: hashed,

        role,

        verificationToken,

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

  await sendVerificationEmail(
    email,
    verificationToken
  );

  return {
    message:
      "Registration successful. Verify your email."
  };

};

// LOGIN
export const loginUser = async (
  email,
  password
) => {

  const user =
    await prisma.user.findUnique({
      where: { email }
    });

  if (!user) {

    throw new AppError(
      "Invalid credentials",
      401
    );

  }

  if (!user.verified) {

    throw new AppError(
      "Email not verified",
      403
    );

  }

  const isValid =
    await comparePassword(
      password,
      user.password
    );

  if (!isValid) {

    throw new AppError(
      "Invalid credentials",
      401
    );

  }

  const payload = {
    userId: user.id,
    role: user.role,
    tenantId: user.tenantId
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,

      userId: user.id,

      expiresAt: new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      )
    }
  });

  return {
    accessToken,
    refreshToken
  };

};

// REFRESH
export const refreshTokens = async (
  token
) => {

  const decoded =
    verifyRefreshToken(token);

  const stored =
    await prisma.refreshToken.findFirst({
      where: {
        token,
        revoked: false
      }
    });

  if (!stored) {

    throw new AppError(
      "Invalid refresh token",
      401
    );

  }

  const payload = {
    userId: decoded.userId,
    role: decoded.role,
    tenantId: decoded.tenantId
  };

  const newAccessToken =
    generateAccessToken(payload);

  return {
    accessToken: newAccessToken
  };

};

// LOGOUT
export const logoutUser = async (
  token
) => {

  await prisma.refreshToken.updateMany({
    where: { token },

    data: {
      revoked: true
    }
  });

  return {
    message: "Logged out"
  };

};

// VERIFY EMAIL
export const verifyUserEmail = async (
  token
) => {

  const user =
    await prisma.user.findFirst({
      where: {
        verificationToken: token
      }
    });

  if (!user) {

    throw new AppError(
      "Invalid verification token",
      400
    );

  }

  await prisma.user.update({
    where: {
      id: user.id
    },

    data: {
      verified: true,
      verificationToken: null
    }
  });

  return {
    message: "Email verified"
  };

};

// FORGOT PASSWORD
export const requestPasswordReset = async (
  email
) => {

  const user =
    await prisma.user.findUnique({
      where: { email }
    });

  if (!user) {

    throw new AppError(
      "User not found",
      404
    );

  }

  const token =
    crypto.randomUUID();

  await prisma.user.update({
    where: { email },

    data: {
      resetToken: token,

      resetTokenExpiry:
        new Date(
          Date.now() +
          1000 * 60 * 15
        )
    }
  });

  console.log(`
PASSWORD RESET LINK:

http://localhost:3000/auth/reset/${token}
`);

  return {
    message:
      "Password reset link sent"
  };

};

// RESET PASSWORD
export const resetPassword = async (
  token,
  newPassword
) => {

  const user =
    await prisma.user.findFirst({
      where: {
        resetToken: token,

        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

  if (!user) {

    throw new AppError(
      "Invalid or expired token",
      400
    );

  }

  const hashed =
    await hashPassword(
      newPassword
    );

  await prisma.user.update({
    where: {
      id: user.id
    },

    data: {
      password: hashed,

      resetToken: null,

      resetTokenExpiry: null
    }
  });

  return {
    message:
      "Password updated"
  };

};