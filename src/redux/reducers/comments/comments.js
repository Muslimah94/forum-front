const initialState = {
  comments: [],
  routeParam: null,
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, comments: action.comments, routeParam: action.id };

    // case "TRASH_COMMENT":
    //   state.todos.find(i => i.id === action.id).isTrashed = true
    //   return { ...state }

    case "ADD_COMMENT":
      return { ...state };

    default:
      return state;
  }
};

export default comments;
