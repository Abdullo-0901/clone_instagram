import { useSelector } from "react-redux";

const OpenLeft = () => {
  const openleft = useSelector(({ modal }) => modal.openleft);
  return (
    <div className="absolute  min-h-full  ">
      <div
        className={`fixed w-[300px]  bg-white border-l border-r rounded-[0_10px_10px_0] border-gray-200 ${
          openleft ? "left-[65px]" : "left-[-65px]"
        } h-full`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia vel,
        nisi maiores similique quasi repudiandae consectetur mollitia animi
        tempora, obcaecati corrupti. Quae eum delectus, molestiae ducimus ullam
        atque cum ipsam modi maxime. Saepe iure laborum optio. Tenetur dolore
        vitae, commodi fugit consequuntur eos exercitationem, cupiditate,
        repellat magnam ipsum numquam recusandae.
      </div>
    </div>
  );
};

export default OpenLeft;
