import Login from "./Login";
import reactLogo from "./assets/react.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

function MainElement() {
  const [count, setCount] = useState(0);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    // nav("/main");
  });

  const onLoginButtonClicked = (e: any) => {
    nav("/login");
  };

  const onRegisterButtonClicked = (e: any) => {
    nav("/register");
  };

  return (
    <div>
      <div className="pd-8"></div>
      <h1 className="pt-4 pb-2 flex justify-around text-3xl">
        Witaj w Notatkovietz!
      </h1>
      <h2 className="flex justify-around text-xl pb-4">
        Zarejestruj się lub zaloguj:
      </h2>

      <div>
        <div className="py-2 flex justify-around">
          <div>
            <div className="w-60">
              <Button
                className="bg-blue-500"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onLoginButtonClicked(e)}
              >
                Logowanie
              </Button>
            </div>
            <div className="w-60 py-2">
              <Button
                variant="outlined"
                // color="primary"
                className="text-blue-500 stroke-blue-500"
                fullWidth
                onClick={(e) => onRegisterButtonClicked(e)}
              >
                Rejestracja
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="p-5 border-gray-200 p-">
        <div className="flex justify-around">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo w-24" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react w-24" alt="React logo" />
          </a>
        </div>
        <div className="my-1">
          <h1 className="py-1 top-5 flex border-2 border-red-300 justify-around">
            Vite + React działają cuda
          </h1>
        </div>
        <div className="flex justify-around">
          <div className="flex-col justify-around">
            <div className="flex justify-around">
              <button
                className="m-auto font-roboto font-medium"
                onClick={() => setCount((count) => count + 1)}
              >
                count is {count}
              </button>
            </div>
            <div className="flex justify-around">
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <div className="flex justify-around">
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default MainElement;
