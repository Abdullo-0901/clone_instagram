import Dialog from "@mui/material/Dialog";
import * as React from "react";
import "stories-react/dist/index.css";

interface FormDialogProps {
  children: React.ReactNode;
  show: boolean;
  handleClose: () => void;
}
export default function FormDialog(props: FormDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        open={props.show}
        onClose={props.handleClose}
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        {props.children}
      </Dialog>
    </React.Fragment>
  );
}
