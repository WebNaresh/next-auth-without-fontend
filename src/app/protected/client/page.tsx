"use client";
import { useSession } from "next-auth/react";

interface ProtectedClientProps {}

const ProtectedClient: React.FC<ProtectedClientProps> = ({}) => {
  const { data: user } = useSession();
  console.log(`🚀 ~ data:`, user);
  return (
    <div>
      <h1>
        Protected <i className=" text-red-500">Client-Side</i> Protected Page
      </h1>
      <p>
        You are login as <b> {user?.user?.name} </b>
      </p>
    </div>
  );
};

export default ProtectedClient;
