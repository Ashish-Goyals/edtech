import jwt, { JwtPayload } from "jsonwebtoken";

/* 🔹 User payload type */
export interface TokenUser {
  _id: string;
  role: "user" | "admin";
}

/* 🔹 JWT payload type */
export interface AuthTokenPayload extends JwtPayload {
  id: string;
  role: "user" | "admin";
}

/* 🔐 Generate JWT */
export function generateToken(user: TokenUser): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
