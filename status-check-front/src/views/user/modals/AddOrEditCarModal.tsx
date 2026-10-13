import { Button, CircularProgress, TextField } from "@mui/material";
import Modal from "../../../components/Modal";
import type { useAddCar } from "../../../hooks/useCars";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../../../providers/NotificationProvider";

type AddOrEditCarModalPropsType = {
  isOpen: boolean;
  close: () => void;
  addCarMutation: ReturnType<typeof useAddCar>;
};

export type CarFormValues = {
  plateNumber: string;
  brand: string;
  model: string;
  year: string;
  vin: string;
  phone: string;
};

const AddOrEditCarModal = ({
  isOpen,
  close,
  addCarMutation,
}: AddOrEditCarModalPropsType) => {
  const { control, handleSubmit } = useForm<CarFormValues>({
    defaultValues: {
      plateNumber: "",
      brand: "",
      model: "",
      year: "",
      vin: "",
      phone: "",
    },
  });
  const { notify } = useNotification();

  const handleAddCar = async (data: CarFormValues) => {
    try {
      await addCarMutation.mutateAsync(data);

      notify("Dodano pojazd", "success");
      close();
    } catch {
      notify("Coś poszło nie tak. Spróbuj ponownie.", "danger");
    }
  };

  const isPending = addCarMutation.isPending;

  return (
    <Modal isOpen={isOpen} close={close} title="Dodaj pojazd">
      <div className="d-flex flex-column pb-3">
        <div className="d-flex flex-column align-items-end gap-3 mt-3 mb-4">
          <div className="d-flex flex-row gap-3">
            <Controller
              name="plateNumber"
              control={control}
              rules={{
                required: true,
                validate: (value) => !!value.trim(),
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Numer rejestracyjny*"
                  disabled={isPending}
                  error={!!error}
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Marka"
                  disabled={isPending}
                />
              )}
            />
          </div>
          <div className="d-flex flex-row gap-3">
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Model"
                  disabled={isPending}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Rok produkcji"
                  type="number"
                  disabled={isPending}
                />
              )}
            />
          </div>
          <div className="d-flex flex-row gap-3">
            <Controller
              name="vin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Numer VIN"
                  disabled={isPending}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Telefon"
                  type="number"
                  disabled={isPending}
                />
              )}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit(handleAddCar)}
          variant="contained"
          disabled={isPending}
          sx={{ whitespace: "nowrap", px: 3 }}
        >
          {addCarMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "Dodaj pojazd"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default AddOrEditCarModal;
