import type { Account, NextAuthOptions, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import User from "../../models/user-model";
import connectDb from "../../utils/database";
connectDb();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GitHub_CLIENT_ID as string,
      clientSecret: process.env.GitHub_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
          required: true,
        },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      trigger,
      isNewUser,
      session,
    }: {
      token: JWT;
      user: any;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: "update" | "signIn" | "signUp" | undefined;
      isNewUser?: boolean | undefined;
      session?: any;
    }) {
      console.log(`🚀 ~ account:`, account);
      console.log(`🚀 ~ user:`, user);
      const tokenUser: any = token.user; // No need for type assertion here

      if (trigger === "update") {
        tokenUser.name = session?.name;
        tokenUser.image = session?.image;
      } else {
        const findUser = await getUserByEmail({ email: token.email as string });
        token.user = findUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      return {
        ...session,
        user: token.user,
      };
    },
  },
};
/* ------------------------------- */
async function signInWithOAuth({
  account,
  profile,
}: {
  account: any;
  profile: any;
}) {
  const user = await User.findOne({ email: profile.email });
  if (user) {
    return true;
  }
  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.avatar_url,
    provider: account.provider,
  });
  await newUser.save();
  return true;
}
async function getUserByEmail({ email }: { email: string }) {
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new Error("email does not exist");
  }
  return { ...user._doc, _id: user._id.toString() };
}
function signInWithCredentials(arg0: { email: string; password: string }) {
  try {
  } catch (error) {
    console.log(error);
  }
}
