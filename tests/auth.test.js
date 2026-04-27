import request from "supertest";
import app from "../src/app.js";

describe("Auth", () => {
  let email = "test@test.com";
  let password = "12345678";

  it("register user", async () => {
    const res = await request(app).post("/auth/register").send({
      email,
      password
    });

    expect(res.statusCode).toBe(200);
  });

  it("login user", async () => {
    const res = await request(app).post("/auth/login").send({
      email,
      password
    });

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});