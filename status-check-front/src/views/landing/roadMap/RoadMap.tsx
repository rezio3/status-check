import Text from "../../../components/Text";
import Step1Image from "./media/carStep1.svg";
import Step2Image from "./media/carStep2.svg";
import Step3Image from "./media/carStep3.svg";

const STEPS = [
  { label: "Zostaw auto", img: Step1Image },
  { label: "Sprawdź status naprawy", img: Step2Image },
  { label: "Odbierz auto", img: Step3Image },
];

const RoadMap = () => {
  return (
    <div
      className="d-flex justify-content-center gap-5"
      style={{ marginTop: 160 }}
    >
      {STEPS.map((e, index) => (
        <div
          className="d-flex flex-column align-items-center justify-content-end gap-5"
          style={{ height: 220 }}
          key={index}
        >
          <img src={e.img} alt="Oddaj auto do naprawy" width={150} />
          <div className="d-flex gap-2 align-items-end">
            <Text style={{ fontSize: 32, fontWeight: 900 }} as="span">
              {index + 1}.
            </Text>
            <Text as="span" className="mb-2">
              {e.label}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadMap;
