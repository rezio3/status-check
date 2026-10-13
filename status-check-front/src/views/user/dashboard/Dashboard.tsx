import { Button, CircularProgress } from "@mui/material";
import { useAddCar, useUserCars } from "../../../hooks/useCars";
import { useState } from "react";
import type { AuthDataType } from "../../../hooks/useAuth";
import Text, { TextColor } from "../../../components/Text";
import CarElement from "../components/CarElement/CarElement";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditCarModal from "../modals/AddOrEditCarModal";

type DashboardPropsType = {
  authData: AuthDataType;
};

const Dashboard = ({ authData }: DashboardPropsType) => {
  const [isAddCardModalOpen, setIsAddCarModalOpen] = useState(false);
  const isAuthenticated = authData?.authenticated;

  const { data: cars = [], isLoading: isCarsLoading } =
    useUserCars(isAuthenticated);
  const addCarMutation = useAddCar();
  console.log(isCarsLoading);
  return (
    <div className="w-100 d-flex flex-column align-items-start gap-3 ms-4">
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setIsAddCarModalOpen(true)}
      >
        {addCarMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          <>
            <AddIcon className="me-1" /> Dodaj pojazd
          </>
        )}
      </Button>
      {addCarMutation.isError && (
        <Text color={TextColor.Danger} className="mt-2">
          {addCarMutation.error.message}
        </Text>
      )}
      <div className="d-flex flex-column gap-2 w-100">
        {cars.map((car) => (
          <CarElement carData={car} key={car.id} />
        ))}
      </div>
      <AddOrEditCarModal
        isOpen={isAddCardModalOpen}
        close={() => setIsAddCarModalOpen(false)}
        addCarMutation={addCarMutation}
      />
    </div>
  );
};

export default Dashboard;
