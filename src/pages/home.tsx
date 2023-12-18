import React from "react";
import "stories-react/dist/index.css";
import "../App.css";
import { UseGetStoriesById } from "../components/customersHook/storiesHook/useGetStoriesById";
import { UseGetStories } from "../components/customersHook/storiesHook/useGetStories";
import { UseGetUserProfileById } from "../components/customersHook/useGetUserById";
import { useDispatch, useSelector } from "react-redux";
import FormDialog from "../components/dialog";
import { setIdx } from "../store/storeSlice";
import Post from "../components/home/Post";
import { getToken } from "../utils/token";
import Stories from "stories-react";

function Home() {
  const [open, setOpen] = React.useState(false);
  let dispatch = useDispatch();
  const { data } = UseGetUserProfileById();
  const { data: stories, isLoading: loadingStories } = UseGetStories();
  let idx = useSelector(({ modal }) => modal.idx);
  const { data: storiesId } = UseGetStoriesById(idx);
  console.log(storiesId);

  let user = getToken();
  let resStories = storiesId?.data.map((el) =>
    el.stories.filter((elem) => elem.fileName != null),
  );
  let obj = resStories?.flat().map((el) => {
    return {
      type: "image",
      url: `${import.meta.env.VITE_APP_FILES_URL}${el.fileName}`,
      duration: 5000,
    };
  });

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="m-[35px_10px] p-[10px] pl-[100px] w-full grid grid-cols-7  gap-16  ">
      <div className=" h-[65px] col-span-4 ">
        <div className="flex h-[65px] overflow-hidden gap-4 overflow-x-scroll example ">
          <div className="w-[60px] h-[60px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
            <button className="rounded-[30px] w-[55px] h-[55px] border-[2px] border-[white] bg-[white]"></button>
          </div>
          {loadingStories ? (
            <div>Loadding....</div>
          ) : (
            stories?.data
              .filter((el) => el.stories.length > 0)
              .map((storie, id) => {
                return (
                  <div key={id}>
                    <button
                      onClick={() => {
                        dispatch(setIdx(storie.userId));
                        setOpen(true);
                      }}
                    >
                      <div className="text-center">
                        <div className="w-[60px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-[30px] p-[2px]">
                          <img
                            src={
                              storie.userPhoto == "" || storie.userPhoto == null
                                ? "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                : `${import.meta.env.VITE_APP_FILES_URL}${
                                    storie.userPhoto
                                  }`
                            }
                            className="rounded-[30px] w-full h-[55px] border-[2px] border-[white] bg-[white]"
                            alt=""
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })
          )}
        </div>
        <Post />
      </div>
      <div className="col-span-3 flex flex-col gap-y-4 p-[10px_71px]">
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="w-[50px] rounded-full flex ">
            <img
              className=" rounded-[50%] object-cover w-ful"
              src={`https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png`}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-black font-[500]">{user?.userName}</span>
            <p className="text-gray-400 font-[400] text-[15px]">
              {data?.data.fullName}
            </p>
          </div>

          <span className="text-[#0798f7] text-[14px] cursor-pointer ml-3">
            Переключиться
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-[#737373]">Рекомендации для вас</span>
          <button className="text-black hover:text-gray-400 text-[14px]">
            Все
          </button>
        </div>
      </div>
      <FormDialog show={open} handleClose={handleClose}>
        <Stories width="400px" height="600px" stories={obj} />
      </FormDialog>
    </div>
  );
}

export default Home;
