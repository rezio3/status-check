import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "../hooks/useAuth";
import { apiFetch } from "../api/client";

type Car = {
  id: string;
  plateNumber: string;
  vin: string;
  ownerName: string;
  createdAt: string;
};

export const UserView = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const { data: authData, isLoading: isAuthLoading } = useAuthUser();
  const queryClient = useQueryClient();

  const isAuthenticated = authData?.authenticated;
  const userEmail = authData?.user?.email;

  const { data: cars = [], isLoading: isCarsLoading } = useQuery<Car[]>({
    queryKey: ["myCars"],
    queryFn: () => apiFetch<Car[]>("/cars/my-cars"),
    enabled: !!isAuthenticated,
  });

  const addCarMutation = useMutation({
    mutationFn: (newPlate: string) =>
      apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify({ plateNumber: newPlate }),
      }),
    onSuccess: () => {
      setPlateNumber("");
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
    },
  });

  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!plateNumber.trim()) return;
    addCarMutation.mutate(plateNumber);
  };

  if (isAuthLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 8,
        px: 2,
      }}
    >
      {isAuthenticated ? (
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <Paper
            elevation={2}
            sx={{ p: 3, mb: 4, textAlign: "center", bgcolor: "#f9f9f9" }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Zalogowany jako:
            </Typography>
            <Typography variant="h4" color="primary">
              {userEmail}
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dodaj nowe auto do bazy
            </Typography>
            <Box
              component="form"
              onSubmit={handleAddCar}
              sx={{ display: "flex", gap: 2, alignItems: "stretch" }}
            >
              <TextField
                fullWidth
                label="Numer rejestracyjny"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="np. DW 12345"
                disabled={addCarMutation.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={addCarMutation.isPending || !plateNumber.trim()}
                sx={{ whitespace: "nowrap", px: 3 }}
              >
                {addCarMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  "Dodaj auto"
                )}
              </Button>
            </Box>
            {addCarMutation.isError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {addCarMutation.error.message}
              </Typography>
            )}
          </Paper>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Twoja lista pojazdów ({cars.length})
            </Typography>
            {isCarsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress size={28} />
              </Box>
            ) : cars.length === 0 ? (
              <Typography color="textSecondary" align="center" sx={{ py: 2 }}>
                Brak przypisanych aut. Dodaj pierwsze auto powyżej!
              </Typography>
            ) : (
              <List>
                {cars.map((car) => (
                  <ListItem
                    key={car.id}
                    sx={{
                      borderBottom: "1px solid #eee",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <DirectionsCarIcon sx={{ mr: 2, color: "action.active" }} />
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {car.plateNumber}
                        </Typography>
                      }
                      secondary={`VIN: ${car.vin} | Właściciel: ${car.ownerName}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      ) : (
        <Typography variant="h5" color="textSecondary">
          Niezalogowany – zaloguj się, aby zobaczyć swoje konto.
        </Typography>
      )}
    </Box>
  );
};
