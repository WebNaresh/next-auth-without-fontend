"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import Form from "../form";

interface SignInProps {
  callbackUrl: string;
}

const SignIn: FC<SignInProps> = ({ callbackUrl }) => {
  async function handleCredentialLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, callbackUrl });
  }
  return (
    <div>
      <h2>sing in with next auth</h2>
      <div className=" m-20">
        <Button onClick={() => signIn("github", { callbackUrl })}>
          Continue with github
        </Button>
      </div>
      <Form action={handleCredentialLogin}>
        <input
          type="email"
          name="email"
          id="email"
          required
          style={{ border: "1px solid" }}
        />
        <input
          type="password"
          name="password"
          id="password"
          required
          style={{ border: "1px solid" }}
        />
        <Button>Credential Login</Button>
      </Form>
      <div>
        <Link href={"/signup"}>SignUp</Link>
      </div>
    </div>
  );
};

export default SignIn;
