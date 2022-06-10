import "./App.css";
import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import EquationSolver from "./components/equation";
import Basic from "./components/basic";

const theme = createTheme({
  palette: {
    primary: {
      main: "#daa520",
    },
    mode: "dark",
    secondary: {
      main: "#ff0000",
    },
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState("1");

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Navbar for calculator"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Basic" value="1" />
              <Tab label="Solve equation" value="2" />
              <Tab label="Unit Converter" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Basic />
          </TabPanel>
          <TabPanel value="2">
            <EquationSolver />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}

export default App;
