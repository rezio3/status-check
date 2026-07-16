import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

type LoginModalPropsType = {
  isOpen: boolean;
  close: () => void;
};

const LoginModal: React.FC<LoginModalPropsType> = ({ isOpen, close }) => {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">Zaloguj</DialogTitle>
        <DialogContent>
          <div className="d-flex flex-column  gap-3" style={{ width: "400px" }}>
            <TextField id="outlined-basic" label="Login" variant="outlined" />
            <TextField id="outlined-basic" label="Hasło" variant="outlined" />
            <Button variant="contained">Zaloguj</Button>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default LoginModal;
