import NavBar from "./layout/NavBar";
import "./style/global.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./layout/Page";
import Footer from "./layout/Footer";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e08552",
      main: "#d96d37",
      dark: "#c45a27",

      contrastText: "#fff",
    },
    secondary: {
      light: "#8B85FF",
      main: "#6c63ff",
      dark: "#5148E0",
      contrastText: "#fff",
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
            <Page />
            <Footer />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
