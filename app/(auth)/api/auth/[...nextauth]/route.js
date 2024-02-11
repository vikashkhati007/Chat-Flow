import { User } from "@/database/User";
import { connectToDB } from "@/database/connection";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter Your Email and Password");
        }
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.password) {
          throw new Error("Invalid Email or Password");
        }
        const isMatch = bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid Password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const mongodbUser = await User.findOne({ email: session.user.email });
      session.user.id = mongodbUser._id.toString();

      session.user = { ...session.user, ...mongodbUser._doc };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
