import { Dialog, DialogContent, DialogTitle } from "@mui/material";

type ModalPropsType = {
  isOpen: boolean;
  close: () => void;
  title: string;
  children?: React.ReactNode;
};

const Modal = ({ isOpen, close, title, children }: ModalPropsType) => {
  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
