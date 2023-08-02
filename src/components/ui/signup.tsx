"use client";
import { signUpWithCredentials } from "@/actions/auth-action";
import Form from "@/components/form";
import { Button } from "@/components/ui/button";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  async function handleSignupCredential(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signUpWithCredentials({ name, email, password });
    if (res.msg) {
      alert(res.msg);
    }
  }

  return (
    <div>
      <h2>Sign Up With NextAuth</h2>
      <Form action={handleSignupCredential}>
        <input type="text" name="name" placeholder="name" required />
        <input type="text" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <Button>Register</Button>
      </Form>
    </div>
  );
};

export default SignUp;
