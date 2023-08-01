import { updateUser } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import Form from "./form";

interface ProfileUpdateProps {
  update: any;
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
    console.log(`🚀 ~ res:`, res);
  }
  return (
    <div className="">
      Profileupdate
      <Form action={handleUpdateProfile}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="image" placeholder="Image" required />
        "https://images.pexels.com/photos/15131949/pexels-photo-15131949/free-photo-of-man-standing-in-front-of-an-arch-in-a-fortress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        <Button>Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
