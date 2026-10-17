import Header from "../../../../components/Header";
import Text from "../../../../components/Text";
import type { Car } from "../../../../hooks/useCars";

type CarBasicDetailsPropsType = {
  carData: Car;
};

const CarBasicDetails: React.FC<CarBasicDetailsPropsType> = ({ carData }) => {
  return (
    <div className="d-flex flex-column gap-1">
      {(carData.brand || carData.model || carData.year) && (
        <Header as="h5">
          {carData.brand} {carData.model} {carData.year}
        </Header>
      )}
      <div className="d-flex gap-2 align-items-center">
        <Text>Nr rejestracyjny:</Text>
        <Header as="h6">{carData.plateNumber}</Header>
      </div>
      {carData.vin && (
        <div className="d-flex gap-2 align-items-center">
          <Text>VIN:</Text>
          <Header as="h6">{carData.vin}</Header>
        </div>
      )}
    </div>
  );
};

export default CarBasicDetails;
