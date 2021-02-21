import { history } from "../../../history";

import axios from "axios";
import { toast } from "react-toastify";

export const signupWithJWT = (email, password, nickname) => {
  return (dispatch) => {
    axios
      .post("/api/register", {
        email: email,
        password: password,
        nickname: nickname,
      })
      .then((response) => {
        if (!response.data) {
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
