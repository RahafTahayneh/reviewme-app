import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (id: string, username: string) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id, username } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get("token");

  if (jwt) {
    const { id } = await validateJWT(jwt.value);

    const user = await db.user.findUnique({
      where: {
        id: id as string,
      },
    });

    return user;
  }
  return undefined;
};

export const isLoggedInUser = async (cookies, belongsToId: string) => {
  const jwt = cookies.get("token");

  const { id } = await validateJWT(jwt.value);

  return id === belongsToId;
};
