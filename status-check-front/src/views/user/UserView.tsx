import Header from "../../components/Header";
import SideBar from "./sideBar/SideBar";
import Dashboard from "./dashboard/Dashboard";
import type { AuthDataType } from "../../hooks/useAuth";

type UserViewPropsType = {
  authData: AuthDataType;
  isAuthLoading: boolean;
};

export const UserView = ({ authData, isAuthLoading }: UserViewPropsType) => {
  const userEmail = authData?.user?.email;

  if (isAuthLoading) {
    // DO POPRAWY
    return <Header as="h2">Czeaj</Header>;
  }

  return (
    <div className="container w-100 d-flex my-5" style={{ flex: 1 }}>
      <SideBar userName={userEmail} />
      <Dashboard authData={authData} />
    </div>
  );
};
