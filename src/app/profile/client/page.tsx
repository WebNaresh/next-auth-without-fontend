"use client";

import ProfileComponents from "@/components/profile";
import { useSession } from "next-auth/react";

interface ProfileClientPageProps {}

const ProfileClientPage: React.FC<ProfileClientPageProps> = ({}) => {
  let { data: session, update } = useSession();

  return (
    <div>
      Profile Client Page
      <h1>Profile Client Side </h1>
      <ProfileComponents user={session?.user} update={update} />
    </div>
  );
};

export default ProfileClientPage;
