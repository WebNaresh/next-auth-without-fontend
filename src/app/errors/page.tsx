"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface ErrorsProps {}

const Errors: React.FC<ErrorsProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errMsg = searchParams.get("error");
  return (
    <div>
      <h1 style={{ color: "red" }}>Errors: {errMsg}</h1>
      <Button onClick={() => router.back()}> Try Again </Button>
    </div>
  );
};

export default Errors;
