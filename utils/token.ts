import jwt from "jsonwebtoken";
export interface user {
  name: string;
  email: string;
  password: string;
}
export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.TokenSecrete as string, {
    expiresIn: "1d",
  });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.TokenSecrete!) as { user: user };
};
