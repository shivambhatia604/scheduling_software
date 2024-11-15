import type { NextRequest } from "next/server";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

type Token = {
  id: number;
};

const auth_secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function signToken(payload: Token): Promise<string> {
  const secret = auth_secret;
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // one hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret);
}

export async function verifyToken(
  token: string,
  secret: Uint8Array
): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    // run some checks on the returned payload, perhaps you expect some specific values
    console.log("payload", payload);
    // if its all good, return it, or perhaps just return a boolean
    return payload;
  } catch (error) {
    console.log("error is ", error);
    throw error;
  }
}

export async function getToken({ req }: { req: NextRequest }) {
  const secret = auth_secret;
  const token =
    req.cookies.get("token")?.value ??
    req.headers.get("authorization")?.replace("Bearer ", "");
  const payload = await verifyToken(token, secret);
  return payload;
}
