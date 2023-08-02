"use client";

import ProfileUpdate from "@/components/profile-update";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ProfileComponentsProps {
  user?: any;
}

const ProfileComponents: React.FC<ProfileComponentsProps> = ({ user }) => {
  const { data: session, update } = useSession();
  return (
    <div className="">
      <h1>Profile Component</h1>
      <h2>Name : {session?.user?.name || user?.name}</h2>
      {(session?.user?.image || user?.image) && (
        <Image
          src={(session?.user?.image as string) || user?.image}
          alt="avatar"
          width={100}
          height={100}
        />
      )}
      <h2>Email : {session?.user?.email || user?.email}</h2>
      <ProfileUpdate update={update} />
    </div>
  );
};

export default ProfileComponents;
