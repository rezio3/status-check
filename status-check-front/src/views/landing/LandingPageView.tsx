import { Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../api/client";
import CarFound from "./carFound/CarFound";
import Text, { TextColor } from "../../components/Text";
import SearchCarInput from "../../components/TextInput";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import RoadMap from "./roadMap/RoadMap";

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
        as="h1"
        style={{ marginBottom: "20px", fontSize: "48px", fontWeight: 400 }}
      >
        Sprawdź status naprawy swojego auta
      </Header>
      <div className="d-flex gap-3" style={{ maxWidth: "100%" }}>
        <SearchCarInput
          inputValue={plateNumberInputValue}
          setInputValue={setPlateNumberInputValue}
          isPending={searchCarMutation.isPending}
          label="Numer rejestracyjny"
          icon={<DirectionsCarFilledIcon />}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          disabled={
            searchCarMutation.isPending || !plateNumberInputValue.trim()
          }
          loading={searchCarMutation.isPending}
        >
          Sprawdź
        </Button>
      </div>

      {searchCarMutation.isError && (
        <Text color={TextColor.Danger} className="mt-4">
          {searchCarMutation.error.message}
        </Text>
      )}
      {searchCarMutation.isSuccess && searchCarMutation.data && (
        <CarFound
          plateNumber={searchCarMutation.data.plateNumber}
          vin={searchCarMutation.data.vin}
        />
      )}
      <RoadMap />
    </div>
  );
};

export default LandingPageView;
