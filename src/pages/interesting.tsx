import { UseGetPost } from "../components/customersHook/post/useGetPosts";

const Interesting = () => {
  const { data } = UseGetPost();
  console.log(data);

  return (
    <div className="w-[1400px] m-[35px_auto] p-[10px] pl-[100px] flex">
      <div className="grid grid-cols-3">
        {data?.data.map((stor, ind) => {
          return (
            <div
              className={`border ${
                ind % 10 === 2 || ind % 10 == 5 ? "row-span-2" : "row-span-1 h-[400px]"
              }`}
            >
              <img
              className="w-full h-[100%] object-cover "
                src={`${import.meta.env.VITE_APP_FILES_URL}${stor.images[0]}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Interesting;
