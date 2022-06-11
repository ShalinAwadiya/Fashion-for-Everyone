export const reducer = (state, action) => {
    if (action.type === "REMOVE") {
        return {
            ...state,
            item: state.item.filter((currentElemenet) => {
                return currentElemenet.id !== action.payload;
            }

            ),
        }
    }
    if (action.type === "INCREMENT") {
        let inccart = state.item.map((currentElemenet) => {
            if (currentElemenet.id === action.payload) {
                return { ...currentElemenet, quantity: currentElemenet.quantity + 1 };
            }
            return currentElemenet
        });
        return { ...state, item: inccart }

    }

    if (action.type === "DECREMENT") {
        const inccart = state.item.map((currentElemenet) => {
            if (currentElemenet.id === action.payload) {
                return { ...currentElemenet, quantity: currentElemenet.quantity - 1 };
            }
            return currentElemenet
        })
        .filter((currentElemenet)=>currentElemenet.quantity !==0);
        return {...state, item: inccart}
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
      return state;

    };