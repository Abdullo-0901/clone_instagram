import { useState } from "react";
import {
  UseGetPost,
  useGetPostById,
} from "../components/customersHook/post/useGetPosts";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setIdx } from "../store/storeSlice";
import DialogComment from "../components/dialog/dialogComment";
import { UseGetUser } from "../components/customersHook/useGetUser";
import Avatar from "@mui/material/Avatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import send from "../assets/send.png";
type BoxState = {
  open: boolean;
  postId: number | string;
};
const Interesting = () => {
  const [boxStates, setBoxStates] = useState<BoxState[]>([]);
  const openAddModal = useSelector(({ modal }) => modal.openAddModal);
  const idx = useSelector(({ modal }) => modal.idx);
  const { data } = UseGetPost();
  const { data: postById } = useGetPostById(idx);
  const { data: users } = UseGetUser();
  const dispatch = useDispatch();

  const handleMouseOver = (index: number, postId: number | string) => {
    setBoxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = { open: true, postId };
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setBoxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = { open: false, postId: "" };
      return newStates;
    });
  };

  const handleClose = () => {
    dispatch(openModal(false));
  };
  return (
    <div className="w-[1400px] m-[35px_auto] p-[10px] pl-[100px] flex">
      <div className="grid grid-cols-3">
        {data?.data.map((stor, ind) => {
          return (
            <div
              className={`border  relative cursor-pointer ${
                ind % 10 === 2 || ind % 10 == 5
                  ? "row-span-2"
                  : "row-span-1 h-[400px]"
              }`}
              onMouseOver={() => handleMouseOver(ind, stor.postLikeCount)}
              onMouseLeave={() => handleMouseLeave(ind)}
              onClick={() => {
                dispatch(openModal(true)), dispatch(setIdx(stor.postId));
              }}
            >
              {stor.images[0].slice(-3) === "MP4" ? (
                <video
                  controls
                  src={`${import.meta.env.VITE_APP_FILES_URL}${stor.images[0]}`}
                  className="w-full h-[100%] object-fill"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_APP_FILES_URL}${stor.images[0]}`}
                  className="w-full h-[100%] object-fill"
                />
              )}

              {boxStates[ind]?.open && (
                <div className="w-full h-full flex items-center justify-center gap-5  hover:bg-black hover:bg-opacity-30 absolute top-0 left-0">
                  <p className="text-white flex items-center gap-[5px]">
                    🤍 {boxStates[ind]?.postId}
                  </p>
                  <p className="text-white flex items-center gap-[5px]">
                    💬 {stor.comments.length}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {openAddModal && (
        <DialogComment handleClose={handleClose} show={openAddModal}>
          {
            <div className="grid grid-cols-5 ">
              <div className="col-span-2  flex items-center h-[80vh]">
                <div className=" flex items-center">
                  <img
                    className=" object-cover"
                    src={`${import.meta.env.VITE_APP_FILES_URL}${postById?.data
                      ?.images[0]}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="w-full bg-white flex z-[99] items-center justify-between  h-[90px] sticky top-0 p-[10px_15px]">
                  {users?.data
                    .filter((user) => user.id === postById?.data?.userId)
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

                  <div className="cursor-pointer">
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-y-3  p-[10px_15px] ">
                  <div className=" flex items-center justify-between  ">
                    {users?.data
                      .filter((user) => user.id === postById?.data?.userId)
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
                                {postById?.data?.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {postById?.data?.comments.map((com, id) => {
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
                                        <p className="text-[14px]">
                                          {`${new Date(
                                            com.dateCommented,
                                          ).getHours()}`}
                                          minutes
                                        </p>
                                        <div
                                        // onClick={() => {
                                        //   handleOpenAlert();
                                        //   dispatch(setEmployeeId(user.id));
                                        //   dispatch(
                                        //     setEmpoleeDeleteId(
                                        //       com.postCommentId,
                                        //     ),
                                        //   );
                                        // }}
                                        >
                                          <MoreHorizIcon className="dropdown-content cursor-pointer" />
                                        </div>
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
                  <div className="flex p-[5px_14px] h-[30px] mt-4 margin  justify-between items-center">
                    <div className="flex gap-x-3 ">
                      {postById?.data?.postLike ? (
                        <img
                          src={like}
                          alt=""
                          className="w-[25px] cursor-pointer"
                          onClick={() => {
                            // mutate(el.postId);
                            // setIdx(el.postId);
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            ":hover": { color: "red" },
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // mutate(el.postId);
                          }}
                        />
                      )}

                      <img
                        onClick={() => {}}
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
          }
        </DialogComment>
      )}
    </div>
  );
};

export default Interesting;

// </div>
