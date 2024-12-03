import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies, headers } from "next/headers";
// import getUser from "./data/user/getUser";

type SessionPayload = {
  userId: number;
};

type JWTDecryptionPayload = JWTPayload & SessionPayload;

const encodedKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function encrypt(
  payload: SessionPayload,
  maxAge: number
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + maxAge;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(encodedKey);
}

export async function decrypt(
  token: string | undefined = "",
  secret: Uint8Array
): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    console.log("payload", payload);
    return payload;
  } catch (error) {
    console.log("error is ", error);
    throw error;
  }
}

export async function getToken(): Promise<null | SessionPayload> {
  try {
    const secret = encodedKey;
    const token =
      (await cookies()).get("token")?.value ??
      (await headers()).get("authorization")?.replace("Bearer ", "");
    // TODO: return null for invalid/expired token
    if (!token) {
      return null;
    }
    const payload = (await decrypt(token, secret)) as JWTDecryptionPayload;
    console.log("auth get token", payload); // TODO: Debug why it logs two times
    return { userId: payload.userId | payload.id };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createSession(payload: SessionPayload) {
  const maxAge = 60 * 60 * 24; //1 day
  const token = await encrypt(payload, maxAge);
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge,
    sameSite: "strict",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).set("token", "", { maxAge: 0 });
}