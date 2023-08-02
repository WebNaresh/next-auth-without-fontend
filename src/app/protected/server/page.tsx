"use server";
import ProtectedComponent from "@/components/protected";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

interface ProtectedServerProps {}

const ProtectedServer: React.FC<ProtectedServerProps> = async ({}) => {
  let session = await getServerSession(authOptions);
  return (
    <div>
      <h1>
        Protected <i className=" text-red-500">Server-Side</i> Protected Page
      </h1>
      <ProtectedComponent user={session?.user} />
    </div>
  );
};

export default ProtectedServer;
