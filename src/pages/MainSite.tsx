import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import authHeader from "../services/auth-header";
import MemosContainer from "../components/MemosContainer";

function MainSite() {
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());

    if (!currentUser) {
      navigate("/login");
    }

    setUserReady(true);
  }, []);

  return (
    <>
      {/* <div className="p-4">{JSON.stringify(currentUser)}</div> */}
      {/* <div className="p-4">{JSON.stringify(authHeader())}</div> */}
      {/* <div>Hello, {JSON.stringify(currentUser)}</div> */}
      <div></div>
      <MemosContainer />
    </>
  );
}

export default MainSite;
