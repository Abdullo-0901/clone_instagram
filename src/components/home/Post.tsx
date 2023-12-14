import post1 from "../../assets/post1.png";
import comment from "../../assets/comment.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Post = () => {
  return (
    <div className="flex mt-8 flex-col p-[5px_65px]  bg-full">
      <div className="flex w-full  justify-between items-center h-50px">
        <div className="flex items-center">
          <div className="w-[42px] h-[42px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
            <img
              src={
                "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              }
              className="rounded-[30px] border-[2px] border-[white] bg-[white]"
              alt=""
            />
          </div>
          <div className="flex flex-col  p-[5px_8px]">
            <div className="flex items-center gap-2">
              <span className="cursor-pointer text-black text-[14px] font-[500]">
                abdulloh_0902
              </span>
              <span className="text-[13px] text-[#a3a3a3] cursor-pointer">
                40 мин
              </span>
            </div>
            {/* <span>surah yasin</span> */}
          </div>
        </div>
        <div className="flex gap-x-1 cursor-pointer">
          <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
          <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
          <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <img src={post1} alt="" />
        <div className="flex h-[30px] mt-4  justify-between items-center">
          <div className="flex gap-x-3">
            <FavoriteBorderIcon />

            <img className="w-[20px] h-[20px] mt-[2px]" src={comment} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
