import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BuildIcon from "@mui/icons-material/Build";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUpdateCarStatus, type Car } from "../../../../hooks/useCars";
import { CarStatus } from "../../../../utils/carStatus";

const CarActionButtons = ({ carData }: { carData: Car }) => {
  const updateStatus = useUpdateCarStatus();

  const handleStatusChange = (status: CarStatus) => {
    if (status === carData.status) {
      return;
    }

    updateStatus.mutate({
      carId: carData.id,
      status,
    });
  };

  const { isPending } = updateStatus;

  console.log(isPending);

  return (
    <div className="d-flex justify-content-between">
      <div>
        <IconButton
          color="secondary"
          onClick={() => {
            handleStatusChange(CarStatus.Review);
          }}
        >
          <RemoveRedEyeIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => {
            handleStatusChange(CarStatus.WaitingForParts);
          }}
        >
          <BuildIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => {
            handleStatusChange(CarStatus.InRepair);
          }}
        >
          <CarRepairIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => {
            handleStatusChange(CarStatus.ReadyToCollect);
          }}
        >
          <FileDownloadDoneIcon />
        </IconButton>
      </div>
      <IconButton aria-label="delete" color="primary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CarActionButtons;
