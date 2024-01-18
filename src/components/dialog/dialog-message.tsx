import Dialog from "@mui/material/Dialog";
import * as React from "react";
import "stories-react/dist/index.css";

interface FormDialogProps {
  children: React.ReactNode;
  show: boolean;
  handleClose: () => void;
}
export default function MessageDialog(props: FormDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "40%",
              maxWidth: "1100px",
              height: "80vh",
              // Set your width here
            },
          },
        }}
        open={props.show}
        onClose={props.handleClose}
      >
        {props.children}
      </Dialog>
    </React.Fragment>
  );
}
