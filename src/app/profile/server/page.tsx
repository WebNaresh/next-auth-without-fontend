"use server";

import ProfileComponents from "@/components/profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface ProfileServerPageProps {}

const ProfileServerPage: React.FC<ProfileServerPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  console.log(`🚀 ~ session:`, session);

  return (
    <div>
      Profile Server Page
      <ProfileComponents user={session?.user} />
    </div>
  );
};

export default ProfileServerPage;
