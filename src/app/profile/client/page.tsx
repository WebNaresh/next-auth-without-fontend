"use client";

import ProfileComponents from "@/components/profile";

interface ProfileClientPageProps {}

const ProfileClientPage: React.FC<ProfileClientPageProps> = ({}) => {
  return (
    <div>
      Profile Client Page
      <h1>Profile Client Side </h1>
      <ProfileComponents />
    </div>
  );
};

export default ProfileClientPage;
