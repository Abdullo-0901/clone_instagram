import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import "stories-react/dist/index.css";

interface FormDialogProps {
  children: React.ReactNode; // Specify the type for the children prop
}
export default function FormDialog(props: FormDialogProps) {
  console.log(props.children);

  //   const { data } = UseGetStoriesById();
  //   let stories = data?.data.map((el) =>
  //     el.stories.filter((elem) => elem.fileName != null),
  //   );
  //   let obj = stories?.flat().map((el) => {
  //     return {
  //       type: "image",
  //       url: `${import.meta.env.VITE_APP_FILES_URL}${el.fileName}`,
  //       duration: 5000,
  //     };
  //   });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // className="bg-black"
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        {props.children}

        {/* <Stories width="400px" height="600px" stories={obj} /> */}
      </Dialog>
    </React.Fragment>
  );
}
