import { Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../api/client";
import CarFound from "./components/CarFound";
import Text, { TextColor } from "../../components/Text";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import RoadMap from "./roadMap/RoadMap";
import FeatureBadge from "./components/FeatureBadge";
import TextInput from "../../components/TextInput";

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
        marginTop: "80px",
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ maxWidth: 700 }}
      >
        <FeatureBadge />
        <Header
          className="text-center mt-4"
          as="h1"
          style={{ marginBottom: "20px", fontSize: "48px", fontWeight: 600 }}
        >
          Sprawdź status naprawy swojego auta
        </Header>
        <Text className="text-center mt-4" style={{ maxWidth: 500 }}>
          Wprowadź numer rejestracyjny i dowiedz się na jakim etapie jest
          naprawa Twojego pojazdu
        </Text>
        <div className="d-flex gap-3 mt-5" style={{ maxWidth: "100%" }}>
          <TextInput
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
      </div>
      <RoadMap />
    </div>
  );
};

export default LandingPageView;
