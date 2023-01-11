import React from "react";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const onSubmitButtonClick = (e: any) => {
    e.preventDefault();

    //check pass length
    if (password.length < 6) {
      toast.error("Password should have at least 6 characters");
    } else if (password.length > 32) {
      toast.error("Password should have up to 32 characters");
    } else if (username.length > 48) {
      toast.error("Username should have up to 48 characters");
    } else {
      let thereWasError = false;

      if (!thereWasError) {
        const userData = {
          username,
          password,
        };

        AuthService.login(username, password).then(
          () => {
            console.log("Authenticated");
            navigate("/main");
            // blabla bla navigate
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            toast.error("Login failed.");
          }
        );
      }
    }
  };

  const onRegisterLinkClick = (e: any) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <section className="flex justify-around my-4">
        <h1 className="font-semibold text-xl">Logowanie</h1>
      </section>
      <>
        <div className="w-80 m-auto">
          {/* <Grid align="center"> */}
          <TextField
            label="Username"
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
          />
          <p className="pt-2">
            <TextField
              className=""
              label="Password"
              placeholder="Enter password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={() => {}}
              fullWidth
            />
          </p>
          <ToastContainer />

          <div className="pt-2">
            <Button
              className="bg-blue-500"
              type="submit"
              color="primary"
              variant="contained"
              onClick={(e) => {
                onSubmitButtonClick(e);
              }}
              fullWidth
            >
              Login
            </Button>
          </div>
          <Typography className="flex justify-around py-4 ">
            <a
              className="text-blue-600 underline"
              href="#"
              onClick={(e) => {
                onRegisterLinkClick(e);
              }}
            >
              Not having an account? Register
            </a>
          </Typography>
          {/* </Grid> */}
        </div>
      </>
    </>
  );
}

export default Login;
