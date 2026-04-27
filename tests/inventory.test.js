import request from "supertest";
import app from "../src/app.js";

describe("Inventory auth protection", () => {
  it("should reject without token", async () => {
    const res = await request(app)
      .post("/inventory/transfer")
      .send({});

    expect(res.statusCode).toBe(401);
  });
});