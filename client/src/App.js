import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import loginPage from "scenes/loginPage";
import profilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<loginPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<profilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
