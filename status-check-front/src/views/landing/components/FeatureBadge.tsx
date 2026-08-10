import Text from "../../../components/Text";

const FeatureBadge = () => {
  return (
    <div className="bg-dark60 py-2 px-3 rounded-pill">
      <Text
        className="text-uppercase text-secondary"
        style={{ fontWeight: 700, fontSize: 12 }}
      >
        Szybko &nbsp;•&nbsp; Wygodnie &nbsp;•&nbsp; Bezpiecznie
      </Text>
    </div>
  );
};

export default FeatureBadge;
