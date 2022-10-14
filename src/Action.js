import { PRODUCT } from "./Types";

export const productAction = (data) => {
  return {
    type: PRODUCT,
    payload: data,
  };
};
