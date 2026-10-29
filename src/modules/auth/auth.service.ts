import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { User } from "../../types";
import jwt from "jsonwebtoken";
import config from "../../config";

type LoginCredentials = {
  email: string;
  password: string;
};

const createUserIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
    `,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

const loginUserIntoDB = async (payload: LoginCredentials) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
         SELECT * FROM users WHERE email=$1
        `,
    [email],
  );

  //   console.log(userData.rows[0]);

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials!");
  }

  const user = userData.rows[0];

  //   console.log(user);

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "10d",
  });

  //   console.log(accessToken);

  delete user.password;

  return { accessToken, user };
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
