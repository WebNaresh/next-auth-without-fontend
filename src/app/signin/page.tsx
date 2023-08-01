import SignIn from "@/components/ui/signin";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignInPage: React.FC<SignInPageProps> = ({ searchParams }) => {
  return (
    <div>
      Sign in Page
      <SignIn callbackUrl={searchParams.callbackUrl || "/"} />
    </div>
  );
};

export default SignInPage;
