import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import comment from "../../assets/comment.png";
import send from "../../assets/send.png";
import { UseGetPost } from "../customersHook/useGetPosts";
import { UseGetUser } from "../customersHook/useGetUser";

const Post = () => {
  const { data } = UseGetPost();
  const { data: users } = UseGetUser();
  console.log(data);

  return data?.data.length == 0 ? (
    <h1>Server Error</h1>
  ) : (
    data?.data.map((el) => {
      return users?.data
        .filter((user) => user.id === el.userId)
        .map((user) => (
          <div key={user.id}>
            <div
              key={el.postId}
              className="flex mt-8 flex-col p-[5px_65px]  bg-full"
            >
              <div className="flex w-full  justify-between items-center h-50px">
                <div className="flex items-center">
                  <div className="w-[42px] h-[42px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
                    <img
                      src={`${import.meta.env.VITE_APP_FILES_URL}${
                        el.images[0]
                      }`}
                      className="rounded-[30px] w-full h-full border-[2px] border-[white] bg-[white]"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col  p-[5px_8px]">
                    <div className="flex items-center gap-2">
                      <span className="cursor-pointer text-black text-[14px] font-[500]">
                        {user.userName}
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
                <img
                  src={`${import.meta.env.VITE_APP_FILES_URL}${el.images[0]}`}
                  alt=""
                />
                <div className="flex h-[30px] mt-4  justify-between items-center">
                  <div className="flex gap-x-3">
                    <FavoriteBorderIcon className="cursor-pointer" />

                    <img
                      className="cursor-pointer w-[20px] h-[20px] mt-[2px]"
                      src={comment}
                      alt=""
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px] mt-[2px]"
                      src={send}
                      alt=""
                    />
                  </div>
                  <div>
                    <BookmarkBorderIcon />
                  </div>
                </div>
                <div className="flex  flex-col gap-y-1">
                  <span className="cursor-pointer text-black text-[14px] font-[700]">
                    {el.postLikeCount} отметок "Нравится"
                  </span>
                  <span className="cursor-pointer text-black text-[14px] font-[700]">
                    Показать перевод
                  </span>
                  <span className="cursor-pointer text-black text-[14px] font-[700]">
                    {user.userName}
                  </span>
                  <span className="cursor-pointer text-[14px] text-gray-500 ">
                    Посмотреть все комментарии ({el.commentCount})
                  </span>
                  <input
                    type="text"
                    placeholder="Добавьте комментарий..."
                    className="outline-none text-[14]"
                  />
                </div>
              </div>
            </div>
          </div>
        ));
    })
  );
};

export default Post;
// <div
//   key={el.postId}
//   className="flex mt-8 flex-col p-[5px_65px]  bg-full"
// >
//   <div className="flex w-full  justify-between items-center h-50px">
//     <div className="flex items-center">
//       <div className="w-[42px] h-[42px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
//         <img
//           src={`${import.meta.env.VITE_APP_FILES_URL}${el.images[0]}`}
//           className="rounded-[30px] w-full h-full border-[2px] border-[white] bg-[white]"
//           alt=""
//         />
//       </div>
//       <div className="flex flex-col  p-[5px_8px]">
//         <div className="flex items-center gap-2">
//           <span className="cursor-pointer text-black text-[14px] font-[500]">
//             {/* {users?.data
//               .filter((user) => user.id === el.userId)
//               .map((user) => <div key={user.id}>{user.userName}</div>)} */}
//           </span>
//           <span className="text-[13px] text-[#a3a3a3] cursor-pointer">
//             40 мин
//           </span>
//         </div>
//         {/* <span>surah yasin</span> */}
//       </div>
//     </div>
//     <div className="flex gap-x-1 cursor-pointer">
//       <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
//       <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
//       <span className="h-1 w-1 border border-black bg-black rounded-full "></span>
//     </div>
//   </div>
//   <div className="mt-4 flex flex-col">
//     <img
//       src={`${import.meta.env.VITE_APP_FILES_URL}${el.images[0]}`}
//       alt=""
//     />
//     <div className="flex h-[30px] mt-4  justify-between items-center">
//       <div className="flex gap-x-3">
//         <FavoriteBorderIcon className="cursor-pointer" />

//         <img
//           className="cursor-pointer w-[20px] h-[20px] mt-[2px]"
//           src={comment}
//           alt=""
//         />
//         <img
//           className="cursor-pointer w-[20px] h-[20px] mt-[2px]"
//           src={send}
//           alt=""
//         />
//       </div>
//       <div>
//         <BookmarkBorderIcon />
//       </div>
//     </div>
//     <div className="flex  flex-col gap-y-1">
//       <span className="cursor-pointer text-black text-[14px] font-[700]">
//         271 отметок "Нравится"
//       </span>
//       <span className="cursor-pointer text-black text-[14px] font-[700]">
//         Показать перевод
//       </span>
//       <span className="cursor-pointer text-black text-[14px] font-[700]">
//         abdulloh_0902
//       </span>
//       <span className="cursor-pointer text-[14px] text-gray-500 ">
//         Посмотреть все комментарии (56)
//       </span>
//       <input
//         type="text"
//         placeholder="Добавьте комментарий..."
//         className="outline-none text-[14]"
//       />
//     </div>
//   </div>
// </div>
