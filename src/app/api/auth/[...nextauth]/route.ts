import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }
        console.log(credentials);
        const { username, email, password } = credentials;

        // Check if the user exists
        const loggedUser = await prisma.user.findUnique({
          where: { email },
        });

        if (loggedUser) {
          // Compare password if user exists
          const isMatch = await bcrypt.compare(password, loggedUser.password);
          if (!isMatch) {
            console.log("Incorrect password");
            return null;
          }

          return {
            id: String(loggedUser.id),
            name: loggedUser.name,
            email: loggedUser.email,
          };
        } else {
          // Create new user if not found
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = await prisma.user.create({
            data: {
              name: username,
              email: email,
              password: hashedPassword,
            },
          });

          return {
            id: String(newUser.id),
            name: newUser.name,
            email: newUser.email,
          };
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session);
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
