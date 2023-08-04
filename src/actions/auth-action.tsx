"use server";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import User from "../../models/user-model";
import sendMail from "../../utils/sendEmail";
import { generateToken, verifyToken } from "../../utils/token";
const BASE_URL = process.env.NEXTAUTH_URL;

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
    if (password) {
      password = await bcrypt.hash(password, 12);
    }
    const token = generateToken({ user: { name, email, password } });
    await sendMail({
      to: email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "VERIFY EMAIL",
    });
    return {
      msg: "Sign Up Success! Check your email to complete the registration",
    };
  } catch (error: any) {
    // return redirect(`error?error=${error.message}`);
    return { msg: error.message };
  }
}
export async function verifyWithCredentials(token: string) {
  try {
    const { user } = verifyToken(token);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return {
        msg: "Verify Success!",
      };
    }
    const newUser = new User(user);
    await newUser.save();
    return {
      msg: "Verify Success!",
    };
  } catch (error: any) {
    // return redirect(`error?error=${error.message}`);
    return { msg: error.message };
  }
}
