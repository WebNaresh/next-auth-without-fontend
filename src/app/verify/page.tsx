import { verifyWithCredentials } from "@/actions/auth-action";

interface VerifyPageProps {
  searchParams: {
    token: string;
  };
}

const VerifyPage: React.FC<VerifyPageProps> = async ({
  searchParams: { token },
}) => {
  const res = await verifyWithCredentials(token);

  return <div>{res?.msg}</div>;
};

export default VerifyPage;
