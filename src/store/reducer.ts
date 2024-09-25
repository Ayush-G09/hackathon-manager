import { Challange, NotificationCard } from "../types";
import { data } from "../utils/demoData";

interface ChallengesState {
  challenges: Challange[];
  notifications: NotificationCard[];
}

const initialState: ChallengesState = {
  challenges: data,
  notifications: [],
};

type Action =
  | { type: "ADD_CHALLENGE"; payload: Challange }
  | { type: "UPDATE_CHALLENGE"; payload: Challange }
  | { type: "DELETE_CHALLENGE"; payload: string }
  | { type: "ADD_NOTIFICATION"; payload: NotificationCard }
  | { type: "REMOVE_NOTIFICATION"; payload: string }; 

const themeReducer = (state: ChallengesState = initialState, action: Action): ChallengesState => {
  switch (action.type) {
    case "ADD_CHALLENGE":
      return { ...state, challenges: [...state.challenges, action.payload] };
    case "UPDATE_CHALLENGE":
      return {
        ...state,
        challenges: state.challenges.map((challenge) =>
          challenge.id === action.payload.id ? action.payload : challenge
        ),
      };
    case "DELETE_CHALLENGE":
      return {
        ...state,
        challenges: state.challenges.filter((challenge) => challenge.id !== action.payload),
      };
      case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload),
      };
    default:
      return state;
  }
};

export default themeReducer;
