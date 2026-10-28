import type { Car } from "../../../../hooks/useCars";
import CarBasicDetails from "./CarBasicDetails";
import Divider from "../../../../components/Divider";
import CarActionButtons from "./CarActionButtons";
import { getCarStatusLabel } from "../../../../utils/carStatus";

const CarElement = ({ carData }: { carData: Car }) => {
  return (
    <div className="position-relative bg-dark40 w-100 rounded-3 p-4 ps-5 overflow-hidden">
      {carData.order && <BadgeAbsolute content={carData.order} />}
      {!carData.order && (
        <BadgeAbsolute content={getCarStatusLabel(carData.status)} />
      )}
      <div className={`d-flex align-items-center ${!carData.order && "mt-3"}`}>
        <CarBasicDetails carData={carData} />
      </div>
      <Divider variant="top" className="my-2" />
      <CarActionButtons carData={carData} />
    </div>
  );
};

export default CarElement;

type BadgeOrderAbsolutePropsType = {
  content: number | string;
};

const BadgeAbsolute: React.FC<BadgeOrderAbsolutePropsType> = ({ content }) => {
  return (
    <div
      className="position-absolute bg-primary text-white px-2 py-1"
      style={{ top: 0, left: 0, borderBottomRightRadius: 8, fontSize: 14 }}
    >
      {content}
    </div>
  );
};
