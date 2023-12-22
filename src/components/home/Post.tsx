import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Stories from "stories-react";
import comment from "../../assets/comment.png";
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
import "../../App.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
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
console.log(idx);

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
                          onClick={() => {
                            dispatch(setIdx(el.postId));
                            handlePostId();
                          }}
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
                      {el.comments.map((comment, ind) => {
                        return <span key={ind}>{comment.comment}</span>;
                      })}
                      <span
                        className="cursor-pointer text-[14px] text-gray-500 "
                        onClick={() => {
                          dispatch(setIdx(el.postId));
                          handlePostId();
                        }}
                      >
                        Посмотреть все комментарии ({el.commentCount})
                      </span>

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
                <div className="col-span-2 flex items-center h-[80vh]">
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
                          <div className=" flex items-center">
                            <img
                              className=" bject-cover"
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
                  <div className="w-full bg-white flex items-center justify-between  h-[90px] sticky top-0 p-[10px_15px]">
                    {users?.data
                      .filter((user) => user.id === commentId?.data?.userId)
                      .map((el, index) => {
                        return (
                          <div key={index} className="flex gap-4 items-center">
                            <div className="w-[50px] rounded-full flex ">
                              <Avatar
                                sx={{ width: 56, height: 56 }}
                                src={`${import.meta.env.VITE_APP_FILES_URL}${
                                  el.avatar
                                }`}
                                className="rounded-[30px] border-[2px] border-[white] bg-[white]"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-black font-[500]">
                                {el?.userName}
                              </span>
                              <p className="text-gray-400 font-[400] text-[15px]">
                                {el.fullName}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                    <MoreHorizIcon />
                  </div>
                  <div className="flex flex-col w-full gap-y-3  p-[10px_15px] ">
                    <div className=" flex items-center justify-between  ">
                      {users?.data
                        .filter((user) => user.id === commentId?.data?.userId)
                        .map((el, ind) => {
                          return (
                            <div className="flex gap-4 items-center" key={ind}>
                              <div className="w-[50px] rounded-full flex ">
                                <Avatar
                                  sx={{ width: 56, height: 56 }}
                                  src={`${import.meta.env.VITE_APP_FILES_URL}${
                                    el.avatar
                                  }`}
                                  className="rounded-[30px] border-[2px] border-[white] bg-[white]"
                                />
                              </div>
                              <div className="flex gap-5">
                                <span className="text-black font-[500]">
                                  {el?.userName}
                                </span>
                                <p className="font-[400] text-[15px]">
                                  {commentId?.data?.title}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {commentId?.data?.comments.map((com, id) => {
                      return (
                        <div key={id}>
                          {users?.data.map((user, ind) => {
                            return (
                              <div key={ind} className="flex flex-col">
                                {user.id === com.userId && (
                                  <div className="flex items-start gap-4 ">
                                    <div className="w-[50px] rounded-full flex ">
                                      <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={`${
                                          import.meta.env.VITE_APP_FILES_URL
                                        }${user.avatar}`}
                                        className="rounded-[30px] border-[2px] border-[white] bg-[white]"
                                      />
                                    </div>
                                    <div className="flex items-start gap-5">
                                      <div className="flex dropdown cursor-pointer flex-col ">
                                        <span className="text-black font-[500]">
                                          {user?.userName}
                                        </span>
                                        <div
                                          className={`flex cursor-pointer  items-start gap-3  `}
                                        >
                                          <p className="text-[13px]">
                                            {`${new Date(
                                              com.dateCommented,
                                            ).getHours()}`}{" "}
                                            minutes
                                          </p>
                                          <MoreHorizIcon className="dropdown-content cursor-pointer" />
                                        </div>
                                      </div>
                                      <p className="font-[400] text-[15px]">
                                        {com.comment}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                 <div className="">
                 <div className="flex h-[30px] mt-4 margin  justify-between items-center">
                    <div className="flex gap-x-3 ">
                      <h1>{el.postId}</h1>
                      {el.postLike ? (
                        <img
                          src={like}
                          alt=""
                          className="w-[25px] cursor-pointer"
                          onClick={() => {
                            mutate(el.postId);
                            setIdx(el.postId)
                          }}
                        />
                      ) : (
                        
                        <FavoriteBorderIcon
                          sx={{
                            ":hover": { color: "red" },
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            mutate(el.postId);
                          }}
                          
                        />
                      )}

                      <img
                        onClick={() => {
                          dispatch(setIdx(el.postId));
                          handlePostId();
                        }}
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
