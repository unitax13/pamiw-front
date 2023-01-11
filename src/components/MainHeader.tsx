import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import authService from "../services/auth.service";

const MainHeader = () => {
  const navigate = useNavigate();

  const onLogOutButtonClick = (e: any) => {
    authService.logout();
    navigate("/login");
  };

  return (
    <>
      <div className="w-full text-center bg-blue-500 h-20 flex flex-col justify-around align">
        <h1 className="tracking-widest text-white uppercase text-xl font-roboto">
          NOTATKOVIETZ
        </h1>
      </div>
      {authService.getCurrentUser().accessToken ? (
        <Button
          className="absolute left-10 top-5 bg-red-600"
          variant="contained"
          color="error"
          onClick={(e) => onLogOutButtonClick(e)}
        >
          Wyloguj
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default MainHeader;
