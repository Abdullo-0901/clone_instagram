import { UseGetPost } from "../customersHook/post/useGetPosts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";

type PropsUserStories = {
  id?: string;
};

type BoxState = {
  open: boolean;
  postId: number | string;
};

const Publ = (id?: PropsUserStories) => {
  const { data: post } = UseGetPost();
  const [boxStates, setBoxStates] = useState<BoxState[]>([]);

  const result = post?.data.flat().filter((user) => {
    return !id ? true : user.userId == id.id;
  });

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

  return (
    <div className="grid grid-cols-3  gap-2 m-auto w-full my-[80px] items-center">
      {result?.map((userPost, ind) => {
        return (
          <div className="w-[500px]" key={ind}>
            <Swiper
              key={ind}
              className="w-[59%]"
              spaceBetween={15}
              slidesPerView={1}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
            >
              {userPost.images.map((elem, id) => {
                return (
                  <SwiperSlide
                    className="relative"
                    key={id}
                    onMouseOver={() =>
                      handleMouseOver(ind, userPost.postLikeCount)
                    }
                    onMouseLeave={() => handleMouseLeave(ind)}
                    style={{cursor:"pointer"}}
                  >
                    <div className="w-full h-[300px]">
                      {elem.slice(-3) === "MP4" ? (
                        <video
                          controls
                          src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {boxStates[ind]?.open && (
                      <div className="w-[300px] h-[300px] flex items-center justify-center gap-5  hover:bg-black hover:bg-opacity-30 absolute top-0 left-0">
                        <p className="text-white flex items-center gap-[5px]">
                          🤍 {boxStates[ind]?.postId}
                        </p>
                        <p className="text-white flex items-center gap-[5px]">
                          💬 {userPost.comments.length}
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
};

export default Publ;
