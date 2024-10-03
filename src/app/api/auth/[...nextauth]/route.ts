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
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }
        const { username, email, password, type } = credentials;

        if (type == "login") {
          const main = async () => {
            const loggedUser = await prisma.user.findUnique({
              where: {
                name: username,
                email: email,
              },
            });
            if (!loggedUser) {
              alert("User not found please login correctly");
              return;
            }
            const comparedPassword = bcrypt.compare(
              password,
              credentials.password
            );
            if (!comparedPassword) {
              alert("please enter a correct password");
              return;
            }

            return {
              id: loggedUser.id,
              name: loggedUser.name,
              email: loggedUser.email,
            };
          };
          main();
        } else {
          const signupfunction = async () => {
            const signedupUser = await prisma.user.findUnique({
              where: {
                name: username,
                email: email,
              },
            });
            if (signedupUser) {
              alert("user is already signed you should please login");
              return;
            }
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(password, salt);
            const signUser = await prisma.user.create({
              data: {
                name: username,
                email: email,
                password: newpassword,
              },
            });
            if (!signUser) {
              alert("some error occured, please try again");
              return;
            }
            return {
              id: signUser.id,
              username: signUser.name,
              email: signUser.email,
            };
          };
          signupfunction();
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log(token);
      console.log(session);
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
