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
import EntropyCounter from "./EntropyCounter";
import authService from "../services/auth.service";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handlePassword2Change = (event: any) => {
    setPassword2(event.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const onSubmitButtonClick = (e: any) => {
    // console.log("Button clicked");

    //check pass length
    if (password.length < 6) {
      toast.error("Password should have at least 6 characters");
    } else if (password.length > 32) {
      toast.error("Password should have up to 32 characters");
    } else if (email.length > 48) {
      toast.error("Email should have up to 48 characters");
    } else {
      let thereWasError = false;
      const re =
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      try {
        if (!re.test(email)) {
          toast.error("Please enter valid e-mail address");
          thereWasError = true;
        }
      } catch (e) {
        toast.error("Please enter valid e-mail address");
        thereWasError = true;
      }
      if (!thereWasError) {
        if (password !== password2) {
          toast.error("Passwords do not match");
        } else {
          const userData = {
            name,
            email,
            password,
          };

          authService.register(name, email, password).then(
            () => {
              console.log("Registered");
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
              toast.error("Registration failed");
            }
          );
        }
      }
    }
  };

  const onLoginLinkClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/login");
  };

  const onKeyPressed = (e: any) => {
    if (e.key === "Enter") {
      // console.log("Enter was pressed");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="flex justify-around my-4">
        <h1 className="font-semibold text-xl">Rejestracja</h1>
      </section>

      <section className="w-80 m-auto">
        <div className="centered">
          {/* <Grid align="center"> */}
          <div className="my-2">
            <TextField
              label="Name"
              placeholder="Enter name"
              id="name"
              value={name}
              onChange={handleNameChange}
              fullWidth
            />
          </div>
          <div className="my-2">
            <TextField
              label="E-mail"
              placeholder="Enter e-mail"
              id="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
          </div>
          <div className="my-2">
            <TextField
              label="Password"
              placeholder="Enter password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
          </div>
          <div className="my-2">
            <TextField
              label="Confirm password"
              placeholder="Confirm password"
              id="password2"
              type="password"
              value={password2}
              onChange={handlePassword2Change}
              onKeyPress={onKeyPressed}
              fullWidth
            />
          </div>
          <EntropyCounter password={password}></EntropyCounter>
          <div className="my-2">
            <Button
              className="bg-blue-500"
              type="submit"
              color="primary"
              variant="contained"
              onSubmit={onSubmit}
              onClick={onSubmitButtonClick}
              fullWidth
            >
              Register
            </Button>
          </div>
          <div className="flex justify-around py-2">
            <Typography>
              <a
                className="text-blue-600 underline"
                href="#"
                onClick={onLoginLinkClick}
              >
                Already having an account? Log in.
              </a>
            </Typography>
          </div>
          {/* </Grid> */}
        </div>
      </section>
    </>
  );
};

export default Register;
