import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Stories from "stories-react";
import comment from "../../assets/comment.png";
import Avatar from '@mui/material/Avatar';
import like from "../../assets/like.png";
import send from "../../assets/send.png";
import { PropsComment } from "../../interfaces";
import { getPostsService } from "../../services/Post/post-service";
import { setIdx } from "../../store/storeSlice";
import { UseGetPost, useGetPostById } from "../customersHook/post/useGetPosts";
import { UseGetStoriesById } from "../customersHook/storiesHook/useGetStoriesById";
import { UseGetUser } from "../customersHook/useGetUser";
import FormDialog from "../dialog";
import DialogComment from "../dialogComment";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// import DialogComment from "../dialog-comment";
const Post = (): JSX.Element | JSX.Element[] | undefined => {
  const [open, setOpen] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);
  const [com, setCom] = React.useState<string>("");
  const idx = useSelector(({ modal }) => modal.idx);
  const { data, refetch } = UseGetPost();
  const { data: users } = UseGetUser();
  const { data: storiesId } = UseGetStoriesById(idx);
  const { data: commentId } = useGetPostById(idx);
  const postService = new getPostsService();
  const dispatch = useDispatch();
  console.log(commentId?.data?.userId)
  console.log(users?.data.map(user=>{
    console.log(user);
    
  }));
  console.log(storiesId);
  

  // ####################################################
  const resStories = storiesId?.data.map((el) =>
    el.stories.filter((elem) => elem.fileName != null),
  );
  const obj = resStories?.flat().map((el) => {
    return {
      type: "image",
      url: `${import.meta.env.VITE_APP_FILES_URL}${el.fileName}`,
      duration: 5000,
    };
  });

  // ####################################################

  // like  ################################

  const { mutate } = useMutation(
    ["like"],
    (idx: number) => postService.like(idx),
    {
      async onSuccess() {
        await refetch();
      },
    },
  );
  // Add comment
  const { mutate: addComments } = useMutation(
    ["comment"],
    (data: PropsComment) => postService.comment(data),
    {
      async onSuccess() {
        setCom("");
        await refetch();
      },
    },
  );

  console.log(commentId?.data?.images);

  // Like###########################
  function handleClose() {
    setOpen(false);
  }
  function handleCloseComment() {
    setOpenComment(false);
  }
  const handleComment = async (postId: number) => {
    const objComment = { postId: postId, comment: com };
    addComments(objComment);
    dispatch(setIdx(postId));
  };
  function handlePostId() {
    setOpenComment(true);
  }

  return data?.data.length == 0 ? (
    <h1>Server Error</h1>
  ) : (
    data?.data.map((el, ind) => {
      return (
        <div key={ind} className="conteiner">
          {users?.data
            .filter((user) => user.id === el.userId)
            .map((user) => (
              <div key={user.id}>
                <div
                  key={el.postId}
                  className="flex mt-8 flex-col p-[5px_65px]  bg-full"
                >
                  <div
                    className="flex w-full  justify-between items-center h-50px cursor-pointer"
                    onClick={() => {
                      dispatch(setIdx(user.id));
                      setOpen(true);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-[42px] h-[42px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
                        <img
                          src={`${import.meta.env.VITE_APP_FILES_URL}${
                            user.avatar
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
                  <div className="mt-4 flex flex-col h-[600px]">
                    <Swiper
                      cssMode={true}
                      navigation={true}
                      pagination={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                      className="mySwiper"
                    >
                      {el.images.map((img, ind) => {
                        return (
                          <SwiperSlide key={ind}>
                            
                            <img
                              className="w-fit"
                              src={`${
                                import.meta.env.VITE_APP_FILES_URL
                              }${img}`}
                              alt=""
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <div className="flex h-[30px] mt-4  justify-between items-center">
                      <div className="flex gap-x-3">
                        {el.postLike ? (
                          <img
                            src={like}
                            alt=""
                            className="w-[25px] cursor-pointer"
                            onClick={() => {
                              mutate(el.postId);
                            }}
                          />
                        ) : (
                          // className="cursor-pointer text-red-800"

                          <FavoriteBorderIcon
                            sx={{
                              ":hover": { color: "red" },
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              mutate(el.postId);
                            }}
                            // className="cursor-pointer text-red-800"
                          />
                        )}

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
                      <div className="flex gap-2 items-center">
                        <span className="cursor-pointer text-black text-[14px] font-[700]">
                          {user.userName}
                        </span>
                        <span>{el.title}</span>
                      </div>
                      <span
                        className="cursor-pointer text-[14px] text-gray-500 "
                        onClick={() => {
                          dispatch(setIdx(el.postId));
                          handlePostId();
                        }}
                      >
                        Посмотреть все комментарии ({el.commentCount})
                      </span>

                      {el.comments.splice(2).map((comment, ind) => {
                        return <span key={ind}>{comment.comment}</span>;
                      })}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleComment(el.postId);
                        }}
                      >
                        <input
                          value={com}
                          onChange={(e) => setCom(e.target.value)}
                          type="text"
                          placeholder="Добавьте комментарий..."
                          className="outline-none text-[14]"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {open && (
            <FormDialog show={open} handleClose={handleClose}>
              <Stories width="400px" height="600px" stories={obj} />
            </FormDialog>
          )}
          
          {openComment && (
            <DialogComment show={openComment} handleClose={handleCloseComment}>
              <div className="grid grid-cols-5 ">
                <div className="col-span-2 flex items-center h-80vh">
                  <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                  >
                    {commentId?.data?.images.map((img, ind) => {
                      return (
                        <SwiperSlide key={ind}>
                          <div className=" h- flex items-center">
                            <img
                              className=" h-[80vh] bject-cover"
                              src={`${
                                import.meta.env.VITE_APP_FILES_URL
                              }${img}`}
                              alt=""
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                <div className="col-span-3">
                      <div className="w-full h-[50px] sticky top-0">
                   
                    {
                      users?.data.map(user=>{
                       return(
                        <>
                        {
                          commentId?.data?.userId == user.id &&(
                            <div className="flex gap-4 items-center">
            <div className="w-[50px] rounded-full flex ">
            <Avatar  sx={{ width: 56, height: 56 }}  src={`${import.meta.env.VITE_APP_FILES_URL}${user.avatar}`} />
              
            </div>
            <div className="flex flex-col">
              <span className="text-black font-[500]">{user?.userName}</span>
              <p className="text-gray-400 font-[400] text-[15px]">
                {user.fullName}
              </p>
            </div>
          </div>
                          )
                        }
                        </>
                       )
                        
                      })
                    }
                   
                      </div>
                </div>
              </div>
            </DialogComment>
          )}
        </div>
      );
    })
  );
};

export default Post;
