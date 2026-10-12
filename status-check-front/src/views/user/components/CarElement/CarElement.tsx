import Header from "../../../../components/Header";
import Text from "../../../../components/Text";
import type { RefactoredCar } from "../../../../utils/carsMockup";

const CarElement = ({ carData }: { carData: RefactoredCar }) => {
  return (
    <div className="position-relative d-flex flex-column bg-dark40 w-100 rounded-3 p-4 ps-5 overflow-hidden">
      <div
        className="position-absolute bg-primary text-white px-2 py-1"
        style={{ top: 0, left: 0, borderBottomRightRadius: 8 }}
      >
        {carData.order}
      </div>
      <Header as="h5" className="mb-1">
        {carData.brand} {carData.model} {carData.year}
      </Header>
      <Header as="h6" className="mb-1">
        {carData.plateNumber}
      </Header>
      <Text>{carData.ownerName}</Text>
    </div>
  );
};

export default CarElement;
