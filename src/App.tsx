import {
  Button,
  Grid,
  Paper,
  StyledEngineProvider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import MainHeader from "./components/MainHeader";
import Register from "./components/Register";
import "./index.css";
import MainElement from "./components/MainElement";
import MainSite from "./pages/MainSite";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <MainHeader />
          <Routes>
            <Route path="/" element={<MainElement />} />
            <Route path="/main" element={<MainSite />} />
            <Route
              path="/siema"
              element={
                <div className="p-4 font-semibold bg-slate-800 text-gray-50">
                  siemandzio
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </>
  );
}

export default App;
