import { Button, CircularProgress } from "@mui/material";
import "./NavBar.scss";
import Header from "../components/Header";
import { LoginModal } from "../views/loginModal/LoginModal";
import { useState } from "react";
import { useAuthUser, useLogoutMutation } from "../hooks/useAuth";
import carStatusLogo from "../assets/logoCarStatus.svg";
import Text from "../components/Text";

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
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-center">
          <img src={carStatusLogo} alt="carLogo" />
          <Header as="h2" className="mb-0">
            Car status
          </Header>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenLoginModal}
            >
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
