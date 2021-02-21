import axios from "axios";
import { getTopic } from "../forum";

const API_URI = "";

export const getComments = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${API_URI}/api/comments?post_id=${id}`, {
        params: id,
      })
      .then((result) => {
        dispatch({
          type: "GET_COMMENTS",
          comments: result.data,
          id,
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const trashComment = id => {
//   return (dispatch, getState) => {
//     const params = getState().todoApp.todo.routeParam
//     axios
//       .post("/api/app/todo/trash-todo", id)
//       .then(response => dispatch({ type: "TRASH_TASK", id }))
//       .then(dispatch(getTodos(params)))
//   }
// }

export const addNewComment = (comment) => {
  return (dispatch, getState) => {
    const id = getState().comments.comments.routeParam;
    axios.post(`${API_URI}/api/comment`, comment).then((response) => {
      dispatch({ type: "ADD_COMMENT", comment });
      dispatch(getComments(id));
      dispatch(getTopic(id));
    });
  };
};
