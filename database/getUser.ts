import User from "@/models/User";
import { connectToDB } from "./connection";
import bycrypt from "bcryptjs";

export const getUser = async (email: any, password: any) => {
  await connectToDB();

  const user = await User.findOne({ email });

  const founduser = await bycrypt.compare(password, user.password);
  if (founduser) {
    console.log("User found");
    return user;
  }
};
