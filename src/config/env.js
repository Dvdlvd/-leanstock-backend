import dotenv from "dotenv";

dotenv.config();

const required = [
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET"
];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing env: ${key}`);
    process.exit(1);
  }
});

export const env = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000"
};