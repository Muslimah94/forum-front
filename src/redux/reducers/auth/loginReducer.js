export const login = (state = { userRole: "unauthorized" }, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { userRole: "authorized" };
    }
    case "LOGOUT": {
      return { userRole: "unauthorized" };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    default: {
      return state;
    }
  }
};
