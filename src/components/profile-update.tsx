import { updateUser } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import Form from "./form";

interface ProfileUpdateProps {
  update?: any;
  user?: any;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ update }) => {
  async function handleUpdateProfile(formData: FormData) {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (update) {
      update({ name, image });
    }

    const res = await updateUser({ name, image });
    alert(res.msg);
  }
  return (
    <div className="">
      Profileupdate
      <Form action={handleUpdateProfile}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="image" placeholder="Image" required />
        <Button>Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
