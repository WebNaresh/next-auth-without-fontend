"use server";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import User from "../../models/user-model";

export async function updateUser({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const session = (await getServerSession(authOptions)) as any;
  if (!session?.user) {
    throw new Error("unauthorized !");
  }
  try {
    const user = await User.findByIdAndUpdate(session.user._id, {
      name,
      image,
    });
    if (!user) {
      throw new Error("email does not exist");
    }
    return { msg: "Profile Updated Succesfully!" };
  } catch (error: any) {
    console.log(`🚀 ~ error:`, error.message);
    // return redirect(`error?error=${error.message}`);
    return { msg: error.message };
  }
}
export async function signUpWithCredentials({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      throw new Error("email already exist");
    }
    if (password) await bcrypt.hash(password, 12);
    return {
      msg: "Sign Up Success! Check your email to complete the registration",
    };
  } catch (error: any) {
    console.log(`🚀 ~ error:`, error.message);
    // return redirect(`error?error=${error.message}`);
    return { msg: error.message };
  }
}
