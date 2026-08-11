import Text from "../../../components/Text";

type SideBarPropsType = {
  userName: string;
};

const SideBar = ({ userName }: SideBarPropsType) => {
  return (
    <div className="bg-dark60" style={{ width: 220 }}>
      <Text as="span" style={{ fontSize: 14 }}>
        {userName}
      </Text>
    </div>
  );
};

export default SideBar;
