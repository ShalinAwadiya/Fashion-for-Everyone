// Pooja Anandani - B00911392
import React, { createContext, useEffect, useReducer } from "react";
import Context from "./Context";
import { reducer } from "./Reducer";
import AXIOS_CLIENT from "../../utils/apiClient";

export const CartContext = createContext();

const initialState = {
  item: [],
  totalAmount: 0,
  totalItem: 0,
  coupon: {
    code:"-",
    minCartPrice:0
  },
};
const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getCoupon = (coupon) => {
    return dispatch({
      type: "GetCoupon",
      payload: coupon,
    });
  };
  const loadItem = (items) => {
    return dispatch({
      type: "LOAD",
      payload: items,
    });
  };
  const removeItem = (id) => {
    AXIOS_CLIENT.delete("/cart/remove_item", { data: { productId: id } }).then(
      (response) => {
        return dispatch({
          type: "REMOVE",
          payload: response.data.cart.products,
        });
      }
    );
  };
  const increment = (index) => {
    AXIOS_CLIENT.post("/cart/update_quantity", { index: index, type: "inc" }).then(
      (response)=>{
        return dispatch({
          type: "INCREMENT",
          payload: index,
        }); 
      }

    ).catch(
      (error)=>{
        console.log(error);
      }
    )

  
  };

  const decrement = (index) => {
    AXIOS_CLIENT.post("/cart/update_quantity", { index: index, type: "dec" }).then(
      (response)=>{
        return dispatch({
          type: "DECREMENT",
          payload: index,
        }); 
      }

    ).catch(
      (error)=>{
        console.log(error);
      }
    )

  
  };
  const removeCoupon = () => {
    AXIOS_CLIENT.delete("/cart/remove_coupon").then((response) => {
      return dispatch({
        type: "REMOVECOUPON",
        payload: response.data.cart.coupon,
      });
    }).catch((error)=>{
      console.log(error);
    });
  };
  
  useEffect(() => {
    AXIOS_CLIENT.get("/cart")
      .then((response) => {
        loadItem(response.data.cart.products);
        if(response.data.cart.coupon){

            getCoupon(response.data.cart.coupon);
        }
       
      })
      .catch((error) => {
        loadItem([]);
        getCoupon({});
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "TOTAL" });
  }, [state.item]);

  return (
    <>
      <CartContext.Provider
        value={{ ...state, removeItem, increment, decrement, removeCoupon }}
      >
        <Context />
       
      </CartContext.Provider>
    </>
  );
};

export default Cart;
