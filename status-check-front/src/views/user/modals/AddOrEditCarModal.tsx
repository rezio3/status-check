import { Button, CircularProgress, TextField } from "@mui/material";
import Modal from "../../../components/Modal";
import { useState } from "react";
import type { useAddCar } from "../../../hooks/useCars";

type AddOrEditCarModalPropsType = {
  isOpen: boolean;
  close: () => void;
  addCarMutation: ReturnType<typeof useAddCar>;
};

const AddOrEditCarModal = ({
  isOpen,
  close,
  addCarMutation,
}: AddOrEditCarModalPropsType) => {
  const [plateNumber, setPlateNumber] = useState("");

  const handleAddCar = () => {
    addCarMutation.mutate(plateNumber);
  };

  return (
    <Modal isOpen={isOpen} close={close} title="Dodaj pojazd">
      <TextField
        fullWidth
        label="Numer rejestracyjny"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        placeholder="np. DW 12345"
        disabled={addCarMutation.isPending}
      />
      <Button
        onClick={handleAddCar}
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
    </Modal>
  );
};

export default AddOrEditCarModal;
