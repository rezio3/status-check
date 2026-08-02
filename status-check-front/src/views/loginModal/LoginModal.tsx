import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "../../hooks/useAuth";

type LoginModalProps = {
  isOpen: boolean;
  close: () => void;
};

const INITIAL_LOGIN_STATE = {
  isRegistering: false,
  email: "",
  password: "",
  name: "",
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, close }) => {
  const [loginState, setLoginState] = useState(INITIAL_LOGIN_STATE);
  const { isRegistering, email, password, name } = loginState;
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const activeMutation = isRegistering ? registerMutation : loginMutation;
  const isLoading = loginMutation.isPending || registerMutation.isPending;

  const handleSuccess = () => {
    setLoginState(INITIAL_LOGIN_STATE);
    loginMutation.reset();
    registerMutation.reset();
    close();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      registerMutation.mutate(
        { email, password, name },
        {
          onSuccess: () => {
            loginMutation.mutate(
              { email, password },
              { onSuccess: handleSuccess },
            );
          },
        },
      );
    } else {
      loginMutation.mutate({ email, password }, { onSuccess: handleSuccess });
    }
  };

  const handleToggleMode = () => {
    setLoginState({ ...loginState, isRegistering: !isRegistering });
    loginMutation.reset();
    registerMutation.reset();
  };

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs" fullWidth>
      <DialogTitle>
        {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {isRegistering && (
            <TextField
              margin="normal"
              fullWidth
              label="Imię i nazwisko"
              value={name}
              onChange={(e) =>
                setLoginState({ ...loginState, name: e.target.value })
              }
              disabled={isLoading}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Adres email"
            type="email"
            value={email}
            onChange={(e) =>
              setLoginState({ ...loginState, email: e.target.value })
            }
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Hasło"
            type="password"
            value={password}
            onChange={(e) =>
              setLoginState({ ...loginState, password: e.target.value })
            }
            disabled={isLoading}
          />

          {activeMutation.isError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {activeMutation.error.message}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isRegistering ? (
              "Zarejestruj"
            ) : (
              "Zaloguj"
            )}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={handleToggleMode}
            disabled={isLoading}
          >
            {isRegistering
              ? "Masz już konto? Zaloguj się"
              : "Nie masz konta? Zarejestruj się"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
