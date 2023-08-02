"use client";
import ProtectedComponent from "@/components/protected";

interface ProtectedClientProps {}

const ProtectedClient: React.FC<ProtectedClientProps> = ({}) => {
  return (
    <div>
      <h1>
        Protected <i className=" text-red-500">Client-Side</i> Protected Page
      </h1>
      <ProtectedComponent />
    </div>
  );
};

export default ProtectedClient;
