import { Button, CircularProgress } from "@mui/material";
import { useAddCar, useUserCars } from "../../../hooks/useCars";
import { useState } from "react";
import type { AuthDataType } from "../../../hooks/useAuth";
import Text, { TextColor } from "../../../components/Text";

type DashboardPropsType = {
  authData: AuthDataType;
};

const Dashboard = ({ authData }: DashboardPropsType) => {
  const [plateNumber, setPlateNumber] = useState("");
  const isAuthenticated = authData?.authenticated;
  const { data: cars = [], isLoading: isCarsLoading } =
    useUserCars(isAuthenticated);
  const addCarMutation = useAddCar(() => setPlateNumber(""));

  const handleAddCar = () => {
    addCarMutation.mutate(plateNumber);
  };

  console.log(isCarsLoading);
  console.log(cars);

  return (
    <div className=" w-100 d-flex flex-column align-items-center">
      <Button variant="outlined" color="secondary" onClick={handleAddCar}>
        {addCarMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          "Dodaj pojazd"
        )}
      </Button>
      {addCarMutation.isError && (
        <Text color={TextColor.Danger} className="mt-2">
          {addCarMutation.error.message}
        </Text>
      )}
    </div>
  );
};

export default Dashboard;
