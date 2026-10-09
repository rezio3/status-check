import Text from "../../../components/Text";

type SideBarPropsType = {
  userName: string;
};

const SideBar = ({ userName }: SideBarPropsType) => {
  return (
    <div
      className=""
      style={{ width: 220, borderRight: "1px solid rgba(0,0,0,0.2)" }}
    >
      <Text as="span" style={{ fontSize: 14 }}>
        {userName}
      </Text>
    </div>
  );
};

export default SideBar;
