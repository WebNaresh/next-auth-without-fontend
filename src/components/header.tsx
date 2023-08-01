"use server";
import SignOut from "@/components/ui/signout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex gap-4">
      <Link href={"/"}>Home</Link>
      <Link href={"/protected/client"}>Protected (client)</Link>
      <Link href={"/protected/server"}>Protected (server)</Link>
      {session ? (
        <>
          <Link href={"/profile/client"}>Profile (client)</Link>
          <Link href={"/profile/server"}>Profile (server)</Link>
          <Link href={"/dashboard"}>Admin Dashboard</Link>
          <SignOut />
        </>
      ) : (
        <Link href={"/signin"}>Sign-In</Link>
      )}
    </header>
  );
};

export default Header;
