// // app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/prisma/prismaClient"; // Adjust path if needed
// import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// import type { AuthOptions } from "next-auth";
// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<any> {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         // Validate credentials
//         if (
//           user &&
//           bcrypt.compareSync(credentials?.password || "", user.password)
//         ) {
//           return { id: user.id, email: user.email, name: user.name };
//         }
//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt", // Use JWT for sessions
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//     maxAge: 60 * 60, // Token expiry time (1 hour)
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       // If a user object is passed, add user details to token
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       session.user = {
//         id: token.id,
//         email: token.email,
//       };
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Customize if necessary
//     error: "/auth/error", // Custom error page
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
