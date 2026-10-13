import { Alert, Snackbar } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

type NotificationType = "success" | "danger";

type NotificationContextType = {
  notify: (message: string, type?: NotificationType) => void;
};

type NotificationState = {
  id: number;
  message: string;
  type: NotificationType;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null,
  );

  const [open, setOpen] = useState(false);
  const [nextId, setNextId] = useState(0);

  const notify = useCallback(
    (message: string, type: NotificationType = "success") => {
      setNextId((id) => id + 1);
      setNotification((prev) => ({
        id: (prev?.id ?? nextId) + 1,
        message,
        type,
      }));
      setOpen(true);
    },
    [nextId],
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const severity: AlertColor =
    notification?.type === "danger" ? "error" : "success";

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <Snackbar
        key={notification?.id}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification musi być użyty wewnątrz NotificationProvider",
    );
  }

  return context;
};
