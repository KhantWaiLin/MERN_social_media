import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./scenes/HomePage";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import { themeSettings } from "./theme";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import Chat from "./scenes/ChatPage";



function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to={'/'} />} />
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to={'/'} />} />
          <Route path="/chat" element={isAuth ? <Chat /> : <Navigate to={'/'} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
