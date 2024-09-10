import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      // Send HTTP GET request
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.ok) {
        setOk(true);
      } else setOk(false);
    };
    // It means,if user logs in => token is not empty
    if (auth?.token) authCheck();
  });
  return ok ? <Outlet /> : <Spinner />;
};
export default PrivateRoute;
