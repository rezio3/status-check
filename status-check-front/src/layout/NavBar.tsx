import { Button, CircularProgress } from "@mui/material";
import "./NavBar.scss";
import Header from "../components/Header";
import BuildIcon from "@mui/icons-material/Build";
import { LoginModal } from "../views/loginModal/LoginModal";
import { useState } from "react";
import { useAuthUser, useLogoutMutation } from "../hooks/useAuth";

const NavBar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { data: authData, isLoading } = useAuthUser();
  const logoutMutation = useLogoutMutation();

  const isAuthenticated = authData?.authenticated;

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.reload();
      },
    });
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

        <div>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated ? (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              Wyloguj
            </Button>
          ) : (
            <Button variant="contained" onClick={handleOpenLoginModal}>
              Zaloguj
            </Button>
          )}
        </div>

        <LoginModal isOpen={openLoginModal} close={handleCloseLoginModal} />
      </div>
    </div>
  );
};

export default NavBar;
