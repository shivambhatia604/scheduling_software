import jwt from "jsonwebtoken";

const auth_secret = process.env.NEXTAUTH_SECRET || "";
export function signToken(payload: any) {
  return jwt.sign(payload, auth_secret, { expiresIn: "1h" });
}

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, process.env.NEXTAUTH_SECRET);
//   } catch (error) {
//     return null;
//   }
// }
