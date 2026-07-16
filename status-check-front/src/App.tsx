import NavBar from "./layout/NavBar";
import "./style/global.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPageView from "./views/landing/LandingPageView";
import "bootstrap/dist/css/bootstrap.min.css";

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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="page-wrapper">
          <NavBar />
          <LandingPageView />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
