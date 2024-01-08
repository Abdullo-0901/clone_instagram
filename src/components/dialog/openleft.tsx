import { useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
const OpenLeft = () => {
  const openleft = useSelector(({ modal }) => modal.openleft);
  return (
    <div className="absolute  min-h-full  ">
      <div
        className={`fixed w-[350px] p-[15px_10px] bg-white border-l border-r rounded-[0_10px_10px_0] border-gray-200 ${
          openleft ? "left-[65px]" : "left-[-65px]"
        } h-full`}
      >
       <h1 className="font-semibold text-2xl">Поисковый запрос</h1>
       <div className="relative w-full">
       <input type="text" className="w-full bg-gray-100 outline-none p-[8px_15px] rounded-xl mt-9" placeholder="Поиск"    />
       <span className="absolute top-10 right-2 cursor-pointer" >
       <ClearIcon className="" />
       </span>
       </div>
       <hr className="my-10" />
       <h1 className="ml-4 font-medium">Недавнее</h1>
       <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-gray-200">Нет недавних запросов.</h1>
       </div>
      </div>
    </div>
  );
};

export default OpenLeft;
