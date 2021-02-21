import axios from "axios";
import { history } from "../../../history";
import { getComments } from "../comments";
import { toast } from "react-toastify";

const API_URI = "";
export const getTopics = (routeParams) => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/posts?liked=0&created=0`, {
        params: routeParams,
      })
      .then((result) => {
        dispatch({
          type: "GET_TOPICS",
          topics: result.data.reverse(),
          routeParams,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const getTopicByCategory = (routeParams) => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/postsby?category=${routeParams}`)
      .then((result) => {
        dispatch({
          type: "GET_TOPIC_BY_CATEGORY",
          topics: result.data.reverse(),
          routeParams,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const getTopic = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/post?id=${id}`)
      .then((result) => {
        dispatch({
          type: "GET_TOPIC",
          topic: result.data,
          id,
        });
      })
      .catch((err) => console.log("ERROR", err));
  };
};
export const getMyTopics = () => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/posts?liked=0&created=1`)
      .then((result) => {
        if (result.data.status === "Unathorized") {
          toast.error(result.data.desciption, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            progress: undefined,
          });
          history.push("/login");
          return;
        }
        dispatch({
          type: "GET_MY_TOPICS",
          topics: result.data,
        });
      })
      .catch((err) => console.log("ERROR", err));
  };
};
export const getLikedTopics = () => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/posts?liked=1&created=0`)
      .then((result) => {
        if (result.data.status === "Unathorized") {
          toast.error(result.data.desciption, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            progress: undefined,
          });
          history.push("/login");
          return;
        }
        dispatch({
          type: "GET_LIKED_TOPICS",
          topics: result.data,
        });
      })
      .catch((err) => console.log("ERROR", err));
  };
};

export const addNewPost = (post) => {
  return (dispatch) => {
    axios.post(`${API_URI}/api/addpost`, post).then((response) => {
      dispatch({ type: "ADD_POST", post });
    });
  };
};

export const Reaction = (reaction, id) => {
  return (dispatch) => {
    axios.post(`${API_URI}/api/reaction`, reaction).then((response) => {
      if (reaction.post_id !== 0) {
        dispatch(getTopic(reaction.post_id));
      } else {
        dispatch(getComments(id));
      }
    });
  };
};
