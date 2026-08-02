import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../api/client";

type PublicCarData = {
  plateNumber: string;
  vin: string;
};

const LandingPageView = () => {
  const [plateNumberInputValue, setPlateNumberInputValue] = useState("");

  const searchCarMutation = useMutation<PublicCarData, Error, string>({
    mutationFn: (plate: string) =>
      apiFetch<PublicCarData>(
        `/cars/public/${encodeURIComponent(plate.trim())}`,
      ),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumberInputValue.trim()) return;

    searchCarMutation.mutate(plateNumberInputValue);
  };

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{
        marginTop: "120px",
      }}
    >
      <Header
        as="h3"
        style={{ marginBottom: "20px", fontSize: "28px", fontWeight: 400 }}
      >
        Sprawdź status naprawy swojego auta
      </Header>
      <Box
        component="form"
        onSubmit={handleSearch}
        className="d-flex align-items-stretch gap-3"
      >
        <TextField
          id="outlined-basic"
          sx={{ width: "300px" }}
          label={
            <div className="d-flex align-items-center gap-2">
              <DirectionsCarFilledIcon />
              <span>Numer rejestracyjny</span>
            </div>
          }
          variant="outlined"
          value={plateNumberInputValue}
          onChange={(e) => setPlateNumberInputValue(e.target.value)}
          disabled={searchCarMutation.isPending}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={
            searchCarMutation.isPending || !plateNumberInputValue.trim()
          }
        >
          {searchCarMutation.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sprawdź"
          )}
        </Button>
      </Box>
      {searchCarMutation.isError && (
        <Typography color="error" sx={{ mt: 3, fontSize: "16px" }}>
          {searchCarMutation.error.message}
        </Typography>
      )}
      {searchCarMutation.isSuccess && searchCarMutation.data && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            width: "100%",
            maxWidth: "450px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box
            className="d-flex align-items-center justify-content-center gap-2"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Pojazd odnaleziony</Typography>
          </Box>

          <Box
            sx={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1">
              <strong>Numer rejestracyjny:</strong>{" "}
              {searchCarMutation.data.plateNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Numer VIN:</strong> {searchCarMutation.data.vin}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block", mt: 2 }}
          >
            * Dane osobowe właściciela są ukryte ze względów prywatności.
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default LandingPageView;
