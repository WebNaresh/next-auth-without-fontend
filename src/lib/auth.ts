import type { Account, NextAuthOptions, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
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
