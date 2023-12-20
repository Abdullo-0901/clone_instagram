import { useState } from "react";
// interface IPost {
//   postId: number;
// }
function GetPostById(postId: number) {
  console.log(postId);

  const [open, setOpen] = useState(false);
  console.log(open);
  console.log(setOpen);

  return (
    <div>
      <h1>hello</h1>
      {/* <FormDialog show={open} handleClose={handleClose}>
        <h1>hello </h1>
      </FormDialog> */}
    </div>
  );
}

export default GetPostById;
