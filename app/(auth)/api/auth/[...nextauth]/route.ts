import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcryptjs";
import { connectToDB } from "@/database/connection";
import User from "@/database/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await bycrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        console.log(user);
        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      if (!session?.user) {
        throw new Error("Invalid session");
      }

      const mongodbUser = await User.findOne({ email: session.user.email });

      if (!mongodbUser) {
        throw new Error("User not found");
      }

      session.user.id = mongodbUser._id.toString();

      session.user = { ...session.user, ...mongodbUser._doc };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
