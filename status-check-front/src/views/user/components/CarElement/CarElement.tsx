import { IconButton } from "@mui/material";
import type { Car } from "../../../../hooks/useCars";
import CarBasicDetails from "./CarBasicDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "../../../../components/Divider";
import CarActionButtons from "./CarActionButtons";

const CarElement = ({ carData }: { carData: Car }) => {
  return (
    <div className="position-relative bg-dark40 w-100 rounded-3 p-4 ps-5 overflow-hidden">
      <BadgeOrderAbsolute order={carData.order} />
      <div className="d-flex align-items-center justify-content-between">
        <CarBasicDetails carData={carData} />
        <div>
          <IconButton aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Divider variant="top" className="my-2" />
      <CarActionButtons />
    </div>
  );
};

export default CarElement;

type BadgeOrderAbsolutePropsType = {
  order: number;
};

const BadgeOrderAbsolute: React.FC<BadgeOrderAbsolutePropsType> = ({
  order,
}) => {
  return (
    <div
      className="position-absolute bg-primary text-white px-2 py-1"
      style={{ top: 0, left: 0, borderBottomRightRadius: 8 }}
    >
      {order}
    </div>
  );
};
