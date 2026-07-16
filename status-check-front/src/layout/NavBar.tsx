import { Button } from "@mui/material";
import "./NavBar.scss";
import Header from "../components/Header";
import BuildIcon from "@mui/icons-material/Build";
import LoginModal from "../views/loginModal/LoginModal";
import { useState } from "react";
const NavBar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <div className="nav-bar">
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="d-flex align-items-center">
          <BuildIcon fontSize="large" />
          <Header as="h2">StatusCheck</Header>
        </div>
        <Button variant="contained" onClick={handleOpenLoginModal}>
          Zaloguj
        </Button>
        <LoginModal isOpen={openLoginModal} close={handleCloseLoginModal} />
      </div>
    </div>
  );
};

export default NavBar;
