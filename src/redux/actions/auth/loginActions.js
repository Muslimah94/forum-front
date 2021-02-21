import { history } from "../../../history";
import axios from "axios";
import { toast } from "react-toastify";

const API_URI = "";
export const loginWithJWT = (user) => {
  return (dispatch) => {
    axios
      .post(`${API_URI}/api/login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (!response.data.desciption) {
          dispatch({ type: "LOGIN" });
          history.push("/");
        } else {
          toast.error(response.data.desciption, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const logoutWithJWT = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} });
    history.push("/login");
  };
};

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};
