import Header from "../../../components/Header";
import Text, { TextColor } from "../../../components/Text";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

type CarFoundPropsType = {
  plateNumber: string;
  vin: string;
};

const CarFound = ({ plateNumber, vin }: CarFoundPropsType) => {
  return (
    <div className="border border-dark-subtle rounded p-3 mt-5">
      <Header as="h4" className="d-flex align-items-center gap-2 mb-4">
        <DirectionsCarFilledIcon />
        {plateNumber}
      </Header>
      <Text>
        <strong>Numer VIN:</strong> {vin}
      </Text>
      <Text>
        <strong>Status:</strong> w naprawie
      </Text>
      <Text color={TextColor.Muted} style={{ fontSize: 12 }}>
        * Dane osobowe właściciela są ukryte ze względów prywatności.
      </Text>
    </div>
  );
};

export default CarFound;
