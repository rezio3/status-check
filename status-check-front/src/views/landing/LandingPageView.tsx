import { Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { useState } from "react";

const LandingPageView = () => {
  const [plateNumberInputValue, setPlateNumberInputValue] = useState("");

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
      <div className="d-flex align-items-stretch gap-3">
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
        />
        <Button variant="contained">Sprawdź</Button>
      </div>
    </div>
  );
};

export default LandingPageView;
