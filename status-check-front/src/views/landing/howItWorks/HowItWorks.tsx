import Header from "../../../components/Header";
import Text from "../../../components/Text";
import Step1Image from "./media/carStep1.svg";
import Step2Image from "./media/carStep2.svg";
import Step3Image from "./media/carStep3.svg";

type HowItWorksStepType = {
  label: string;
  img: string;
  description: string;
};

const STEPS: HowItWorksStepType[] = [
  {
    label: "Zostaw auto",
    img: Step1Image,
    description: "Oddaj swój samochód do serwisu, który z nami współpracuje.",
  },
  {
    label: "Sprawdź status naprawy",
    img: Step2Image,
    description:
      "Wpisz numer rejestracyjny na naszej stronie i zobacz aktualny status naprawy.",
  },
  {
    label: "Odbierz auto",
    img: Step3Image,
    description:
      "Gdy naprawa zostanie zakończona, poinformujemy Cię o możliwości odbioru pojazdu.",
  },
];

const HowItWorks = () => {
  return (
    <div
      className="d-flex flex-wrap flex-md-nowrap justify-content-center gap-4"
      style={{ margin: "80px 0" }}
    >
      {STEPS.map((e, index) => (
        <div
          className="w-100 position-relative d-flex flex-column align-items-center justify-content-start gap-4 shadow rounded-4 p-3"
          key={index}
        >
          <div
            className="rounded-circle bg-secondary p-3 text-white position-absolute top-3 start-3 d-flex justify-content-center align-items-center"
            style={{ width: 40, height: 40 }}
          >
            <Text style={{ fontWeight: 600 }} as="span">
              {index + 1}
            </Text>
          </div>
          <div
            style={{ height: 150 }}
            className="d-flex flex-column justify-content-center"
          >
            <img src={e.img} alt={e.label} width={150} />
          </div>
          <div className="d-flex flex-column align-items-center gap-1">
            <Header
              as="h2"
              className="mb-2 text-center"
              style={{ fontWeight: 700, fontSize: 18 }}
            >
              {e.label}
            </Header>
            <Text
              as="span"
              className="mb-2 text-center"
              style={{ fontWeight: 400, fontSize: 14 }}
            >
              {e.description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
