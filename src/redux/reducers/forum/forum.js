const initialState = {
  topics: [],
  routeParam: null,
  topic: {},
  liked: [],
  my: [],
};

const forum = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOPICS":
      return {
        ...state,
        topics: action.topics,
        routeParam: action.routeParams,
      };
    case "GET_TOPIC_BY_CATEGORY":
      return {
        ...state,
        topics: action.topics,
        routeParam: action.routeParams,
      };
    case "GET_MY_TOPICS":
      return {
        ...state,
        my: action.topics,
      };
    case "GET_LIKED_TOPICS":
      return {
        ...state,
        liked: action.topics,
      };

    case "GET_TOPIC":
      return { ...state, topic: action.topic, routeParam: action.id };

    case "ADD_POST":
      return { ...state };

    default:
      return state;
  }
};

export default forum;
