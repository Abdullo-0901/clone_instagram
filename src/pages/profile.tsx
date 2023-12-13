const Profile = () => {
  return (
    <div className="p-[25px_100px]">
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <img
            className=" rounded-[50%] object-cover w-ful"
            src={`https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
