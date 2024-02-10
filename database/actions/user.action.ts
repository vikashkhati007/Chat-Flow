import { connectToDB } from "../connection";
import { NewUserProps } from "@/types/types";
import { User } from "../User";

export const AddNewUser = async ({
  username,
  email,
  password,
  confirmPassword,
}: NewUserProps) => {
  try {
    await connectToDB();
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return console.log("User Already Existed");
    }
  } catch (error) {
    console.log(error);
    return console.log("Failed To Create New User");
  }
};
