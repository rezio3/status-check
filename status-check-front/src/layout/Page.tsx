import { useAuthUser } from "../hooks/useAuth";
import LandingPageView from "../views/landing/LandingPageView";
import { UserView } from "../views/UserView";

const Page = () => {
  const { data: authData, isLoading: isAuthLoading } = useAuthUser();
  const isAuthenticated = authData?.authenticated;

  return (
    <>
      {isAuthenticated ? (
        <UserView authData={authData} isAuthLoading={isAuthLoading} />
      ) : (
        <LandingPageView />
      )}
    </>
  );
};

export default Page;
