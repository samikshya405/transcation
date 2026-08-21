import app from "../app.js";
import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let token;
beforeAll(() => {
  token = jwt.sign(
    {
      userId: 1,
      userEmail: "test@test.com",
    },
    process.env.JWT_SECRET,
  );
});

test("GET /transaction without token should return 401", async () => {
  const response = await request(app).get("/transaction");
  expect(response.status).toBe(401);
});
test("GET /transaction with valid token should not return 401", async () => {
  const response = await request(app)
    .get("/transaction")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
});
test("GET /transaction with invalid token should return 401", async () => {
  const response = await request(app)
    .get("/transaction")
    .set("Authorization", "Bearer fake-token");

  expect(response.status).toBe(401);
});
test("POST /transaction with negative amount should return 400", async () => {
  const response = await request(app)
    .post("/transaction")
    .set("Authorization", `Bearer ${token}`)
    .send({
      type: "expense",
      category: "food",
      amount: -50,
      description: "Lunch",
    });

  expect(response.status).toBe(400);
});
test("POST /transaction with empty category should return 400", async () => {
  const response = await request(app)
    .post("/transaction")
    .set("Authorization", `Bearer ${token}`)
    .send({
      type: "expense",
      category: "",
      amount: 50,
      description: "Lunch",
    });
  expect(response.status).toBe(400);
});
