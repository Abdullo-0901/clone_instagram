import { UseGetPost } from "../customersHook/post/useGetPosts";
import { Swiper, SwiperSlide } from "swiper/react";
type PropsUserStories = {
  id?: string;
};
const Publ = (id?: PropsUserStories) => {
  const { data: post } = UseGetPost();
  console.log(id);
  console.log(post);

  const result = post?.data.flat().filter((user) => {
    return !id ? true : user.userId == id.id;
  });
  console.log(result);

  return (
    <div className="grid grid-cols-3 m-auto w-full my-[80px] items-center">
      {result?.map((userPost, ind) => {
        return (
          // <img className='w-[59%]' src={`${import.meta.env.VITE_APP_FILES_URL}${newImg.images[0]}`} alt="" />
          <div className="w-[400px]">
            <Swiper
              key={ind}
              className="w-[59%]"
              spaceBetween={15}
              slidesPerView={1}
            >
              {userPost.images.map((elem, id) => {
                console.log(elem.slice(-3));

                return (
                  <SwiperSlide key={id}>
                    {elem.slice(-3) == "MP4" ? (
                      <video
                        controls
                        src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                        className="w-[100%] h-[100%] object-cover"
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                        className="w-[100%] h-[100%] object-cover"
                      />
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
