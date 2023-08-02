"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";

interface ProtectedComponentProps {
  user?: any;
}

const ProtectedComponent: FC<ProtectedComponentProps> = ({ user }) => {
  const { data: session } = useSession();
  return (
    <p>
      You are logged in as : <b> {session?.user?.name || user?.name} </b>
    </p>
  );
};

export default ProtectedComponent;
