import { useSelector } from "react-redux";

const Profile = () => {
  const { email, name } = useSelector((state) => state.userSlice);
  console.log(email, name);

  return (
    <div>
      <h1>Profile </h1>
    </div>
  );
};

export default Profile;
