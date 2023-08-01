"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FC } from "react";

interface SignInProps {
  callbackUrl: string;
}

const SignIn: FC<SignInProps> = ({ callbackUrl }) => {
  return (
    <div>
      <h2>sing in with next auth</h2>
      <div className=" m-20">
        <Button onClick={() => signIn("github", { callbackUrl })}>
          Continue with github
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
