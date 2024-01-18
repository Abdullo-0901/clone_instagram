import loading from "../../assets/loading.png";
const Loading = () => {
  return (
    <div className="h-100vh bg-white flex flex-col justify-between items-center">
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
