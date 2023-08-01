"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOut;
