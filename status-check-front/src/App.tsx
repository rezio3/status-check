import NavBar from "./layout/NavBar";
import "./style/global.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPageView from "./views/landing/LandingPageView";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserView } from "./views/UserView";

const theme = createTheme({
  palette: {
    primary: {
      light: "#33ab9f",
      main: "#009688",
      dark: "#00695f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffcf33",
      main: "#ffc400",
      dark: "#b28900",
      contrastText: "#000",
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div className="page-wrapper">
            <NavBar />
            <UserView />
            <LandingPageView />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
