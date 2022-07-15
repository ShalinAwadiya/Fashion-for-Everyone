// Pooja Anandani - B00911392
import AXIOS_CLIENT from "../../utils/apiClient";

export const reducer = (state, action) => {
  if (action.type === "REMOVE") {
    return {...state, item:action.payload}
  }
  if (action.type === "INCREMENT") {
    const inccart = state.item.map((currentElemenet,index) => {
      if (index=== action.payload) {
        return { ...currentElemenet, quantity: currentElemenet.quantity + 1 };
      }
      return currentElemenet
    })
      .filter((currentElemenet) => currentElemenet.quantity !== 0);
    return { ...state, item: inccart }
  }

  if (action.type === "DECREMENT") {
    const inccart = state.item.map((currentElemenet,index) => {
      if (index === action.payload) {

        return { ...currentElemenet, quantity: currentElemenet.quantity - 1 };
      }
      return currentElemenet
    }).filter((currentElemenet) => currentElemenet.quantity !== 0 & currentElemenet.quantity > 0);
    return { ...state, item: inccart }
  }

  if (action.type === "TOTAL") {
    let { totalItem, totalAmount } = state.item.reduce(
      (accum, curVal) => {
        let { price, quantity } = curVal;
        let updatedTotalAmount = price * quantity;
        accum.totalAmount += updatedTotalAmount;

        accum.totalItem += quantity;
        return accum;
      },
      {
        totalItem: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItem, totalAmount };
  }
  if(action.type === "LOAD") {
    return {...state, item:action.payload}
  }
  if(action.type === "GetCoupon") {
    return {...state, coupon:action.payload}
  }
  if(action.type === "REMOVECOUPON") {
    return {...state, coupon:action.payload}
  }
  return state;

};
