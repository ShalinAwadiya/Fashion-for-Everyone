// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       if (elements == null) {
//         return;
//       }
  
//       const {error, paymentMethod} = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//       });
//     };
// }