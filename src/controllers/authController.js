import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registeruser = async (req, res) => {
  const userDetail = req.body;
  const hashedPassword = await bcrypt.hash(userDetail.password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING * `,
    [userDetail.name, userDetail.email, hashedPassword],
  );
  res.status(201).json({
    status: "success",
    message: "user created successfully",
    users: result.rows[0],
  });
};
const loginUsers = async (req, res) => {
  const userDetails = req.body;

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    userDetails.email,
  ]);
  if (result.rows.length === 0) {
    console.log(result.rows);
    return res.status(404).json({
      status: "not success",
      message: "user not found",
    });
  }
  const passwordMatch = await bcrypt.compare(
    userDetails.password,
    result.rows[0].password,
  );
  if (!passwordMatch) {
    return res.status(401).json({
      status: "not success",
      message: "password didnot match",
    });
  }
  const token = jwt.sign(
    {
      userId: result.rows[0].id,
      userEmail: result.rows[0].email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  res.status(200).json({
    status: "success",
    message: "login succeful",
    token,
  });
};
const getCurrentUser = async (req, res,next) => {
  try {
    const user_id = req.user.userId;
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [user_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "id not found",
      });
    }
    const { id, name, email } = result.rows[0];
    res.status(200).json({
      status: "true",
      userDetails: { id, name, email },
    });
  } catch (error) {
    next(error);
  }
};
export { registeruser, loginUsers, getCurrentUser };
