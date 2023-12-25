/* eslint-disable @typescript-eslint/no-explicit-any */
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

interface AletDialogComponent {
  children: React.ReactNode;
  show: boolean;
  handleClose: () => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  handleClose,
  children,
  show,
}: AletDialogComponent) {
  console.log(1);

  // const { data } = UseGetPost();

  return (
    <React.Fragment>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        className="rounded-2xl"
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </React.Fragment>
  );
}
