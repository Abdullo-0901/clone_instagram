import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import like from "../assets/like.png";
import send from "../assets/send.png";
import { UseGetPost } from "../components/customersHook/post/useGetPosts";
import { UseGetUser } from "../components/customersHook/useGetUser";
import { useMutation } from "react-query";
import { getPostsService } from "../services/Post/post-service";

const Reels = () => {
  const postService = new getPostsService();
  const { data,refetch } = UseGetPost();
  const { data: users } = UseGetUser();
  const {mutate} = useMutation(["like"],(idx:number) => postService.like(idx),{
   async  onSuccess() {
        await refetch()
    },
  })
  const res = data?.data.filter((post) => {
    if (post.images[0].slice(-3) == "MP4") {
      return post;
    }
  });

  return (
    <div className="w-[1400px] justify-center m-[35px_auto] p-[10px] pl-[100px] flex">
      <div className="flex flex-col  gap-y-2  border">
        {res?.map((rel) => {
          console.log();
          
          return (
            <div className="relative">
              <div className="absolute gap-y-4 flex flex-col right-[-40px] z-50 bottom-5">
                <div  className="flex  flex-col items-center justify-center">
                  {rel.postLike ? (
                    <img
                      src={like}
                      alt=""
                      className="w-[25px] cursor-pointer"
                      onClick={() => {mutate(rel.postId)}}
                    />
                  ) : (
                    // className="cursor-pointer text-red-800"
                    <FavoriteBorderIcon
                      sx={{
                        ":hover": { color: "red" },
                        cursor: "pointer",
                      }}
                      onClick={() => {mutate(rel.postId)}}
                      // className="cursor-pointer text-red-800"
                    />
                  )}
                  <h1>{rel.postLikeCount}</h1>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                  <MapsUgcIcon />
                  <h1>{rel.comments.length}</h1>
                </div>
                <img
                  className="cursor-pointer  w-[20px] h-[20px] mt-[2px]"
                  src={send}
                  alt=""
                />
              <div className={`${rel.postFavorite ? "bg-red-500" :  ""} cursorpo` }>
              <BookmarkBorderIcon  />
              </div>
              <div className="cursor-pointer">
                <MoreHorizIcon />
              </div>
              </div>
              <video
                src={`${import.meta.env.VITE_APP_FILES_URL}${rel.images[0]}`}
                className="object-contain"
                controls
              />
              {users?.data.map((user) => {
                return (
                  <Link
                    to={`/home/user/${user.id}`}
                    className="absolute  z-50 top-5 left-2"
                  >
                    {user.id == rel.userId && (
                      <div className="flex items-center gap-2">
                        <Avatar
                          sx={{ width: 45, height: 45 }}
                          src={`${import.meta.env.VITE_APP_FILES_URL}${
                            user.avatar
                          }`}
                          className="rounded-[30px] border-[2px] border-[white] bg-[white]"
                        />
                        <h1 className=" ">{user.userName}</h1>
                        <h1 className="border py-1 px-2  text-white border-white rounded-xl">
                          {user.subscriptions ? "Подписки" : "Подписаться"}
                        </h1>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reels;
