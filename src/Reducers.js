import { PRODUCT } from "./Types";

const initialState = {
  Total_No_Of_Item: 0,
};

export const Reducer = (state = initialState, action) => {
  console.log("state", state.Total_No_Of_Item);
  switch (action.type) {
    case PRODUCT:
      return {
        ...state,
        Total_No_Of_Item: action.payload,
      };
    default:
      return state;
  }
};
