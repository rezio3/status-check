import Divider from "../../../components/Divider";
import SidebarButton from "../../../components/SidebarButton";
import Text from "../../../components/Text";

type SideBarPropsType = {
  userName: string;
};
const SideBar = ({ userName }: SideBarPropsType) => {
  return (
    <div className="d-flex flex-row" style={{ width: 220 }}>
      <div className="d-flex flex-column">
        <Text className="me-2" as="span" style={{ fontSize: 14 }}>
          {userName}
        </Text>
        <div className="d-flex flex-column">
          <SidebarButton label="Dashboard" />
          <SidebarButton label="Profil" />
          <SidebarButton label="Archiwum" />
        </div>
      </div>
      <Divider variant="right" />
    </div>
  );
};

export default SideBar;
