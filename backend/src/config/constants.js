import dotenv from "dotenv";
dotenv.config();

export const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
