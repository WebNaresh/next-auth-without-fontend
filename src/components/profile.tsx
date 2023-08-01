"use client";

import ProfileUpdate from "@/components/profile-update";
import Image from "next/image";

interface ProfileComponentsProps {
  user: any;
  update: any;
}

const ProfileComponents: React.FC<ProfileComponentsProps> = ({
  user,
  update,
}) => {
  console.log(`🚀 ~ user:`, user);
  return (
    <div className="">
      <h1>Profile Component</h1>
      <h2>Name : {user?.name}</h2>
      {user?.image && (
        <Image src={user?.image} alt="avatar" width={100} height={100} />
      )}
      <h2>Email : {user?.email}</h2>
      <ProfileUpdate update={update} />
    </div>
  );
};

export default ProfileComponents;
