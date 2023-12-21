import Dialog from "@mui/material/Dialog";
import * as React from "react";
import "stories-react/dist/index.css";

interface FormDialogProps {
  children: React.ReactNode;
  show: boolean;
  handleClose: () => void;
}
export default function DialogComment(props: FormDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "900px",
              height: "50vh",
              // Set your width here
            },
          },
        }}
        open={props.show}
        onClose={props.handleClose}
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        {props.children}
      </Dialog>
    </React.Fragment>
  );
}