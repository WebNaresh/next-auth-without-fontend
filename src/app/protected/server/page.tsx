"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

interface ProtectedServerProps {}

const ProtectedServer: React.FC<ProtectedServerProps> = async ({}) => {
  let user = await getServerSession(authOptions);
  return (
    <div>
      <h1>
        Protected <i className=" text-red-500">Server-Side</i> Protected Page
      </h1>
      <p>
        You are login as <b> {user?.user?.name} </b>
      </p>
    </div>
  );
};

export default ProtectedServer;
