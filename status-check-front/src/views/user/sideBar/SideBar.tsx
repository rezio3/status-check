import SidebarButton from "../../../components/SidebarButton";
import Text from "../../../components/Text";

type SideBarPropsType = {
  userName: string;
};
const SideBar = ({ userName }: SideBarPropsType) => {
  console.log(userName);
  return (
    <div className="bg-dark60 d-flex flex-column" style={{ width: 220 }}>
      <Text as="span" style={{ fontSize: 14 }}>
        {userName}
      </Text>
      <div className="d-flex flex-column">
        <SidebarButton label="Dashboard" />
        <SidebarButton label="Profil" />
        <SidebarButton label="Archiwum" />
      </div>
    </div>
  );
};

export default SideBar;
