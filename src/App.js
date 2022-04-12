import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

import { END_POINT } from './helpers/constant';
 
import axios from "axios";
 
import { toast } from "react-toastify";
 
import "react-toastify/dist/ReactToastify.css";
function App() {

  // const [product, setProduct] = useState({
  //   name: "Stripe",
  //   price: 50,
  //   productBy: "Stripe company"
  // })
  // const [status, setStatus] = useState("")

  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     product
  //   }
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }
  //   return fetch(`${END_POINT}/api/payment`, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body)
  //   }).then(response => {
  //     console.log(response)
  //     const { status } = response;
  //     console.log("STATUS " + status)
  //     // setStatus("SUCCESS->please see the console to see the payment")
  //   })
  //     .catch(err => {
  //       console.log(err)
  //       // setStatus("ERROR")
  //     })
  // }

  // const display = () => {
  //   setStatus("")
  // }

  // const razorPayPaymentHandler = async (e) => {
  //   // setStatus("")
  //   const API_URL = `${END_POINT}/api/razorpay`
  //   const orderUrl = `${API_URL}/order`;
  //   const response = await Axios.get(orderUrl);
  //   const { data } = response;
  //   console.log("App -> razorPayPaymentHandler -> data", data)

  //   const options = {
  //     key: process.env.REACT_APP_RAZORPAY_KEY,
  //     name: "harith",
  //     description: "razorpay description",
  //     order_id: data.id,
  //     handler: async (response) => {
  //       try {
  //         const paymentId = response.razorpay_payment_id;
  //         console.log(paymentId)
  //         const url = `${API_URL}/capture/${paymentId}`;
  //         const captureResponse = await Axios.post(url, {})
  //         console.log(captureResponse)
  //         const successObj = JSON.parse(captureResponse.data)
  //         const captured = successObj.captured;
  //         console.log("App -> razorPayPaymentHandler -> captured", successObj)
  //         if (captured) {
  //           console.log('success')
  //           // setStatus('Razor payment-Sucess.Please see the console to the response')
  //         }

  //       } catch (err) {
  //         // setStatus('Razor payment-Failure.Please see the console to the response')
  //         console.log(err);
  //       }
  //     },
  //     theme: {
  //       color: "#686CFD",
  //     },
  //   };
  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // }

  toast.configure()
 
  const [product] = useState({
    name: "Sample Book",
    price: 120,
    description: "This is a sample book",
  });
 
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://powerful-wildwood-75399.herokuapp.com/checkout",
      { token, product }
    );
 
    console.log(response.status)
 
    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />


    //     <StripeCheckout
    //       stripeKey='pk_test_51KGEzFE1GOI0kgwzvMRy1odMUx9f8GH0BAfNgCVgGQNDZ5VNWFH89Yj2qcpjUl7duH351Me87ZCJBJEZXnysnaMu00CBwJdsSp'
    //       token={makePayment}
    //       name='Buy Stripe'
    //       amount={product.price * 100}
    //     >
    //       <button className='btn-large red'
    //       // onClick={display}
    //       >Buy Stripe {product.price}$</button>
    //     </StripeCheckout>


    //     {/* <form action="https://payment-gateway-node-be.herokuapp.com/api/payment/paypal" method="post">
    //       <button className='btn-large blue'>Buy Paypal 25$</button>
    //     </form> */}

    //     {/* <button className='btn-large green' onClick={razorPayPaymentHandler}>Buy Razorpay ₹30</button> */}

    //   </header>
    // </div>

    <div className="App">
    <div className="container">
      <br />
      <br />
      <h1 className="text-center">Stripe Checkout</h1>
      <br />
      <h2 className="text-center">Product Info</h2>
      <h3 className="text-center">Product Name: {product.name}</h3>
      <h3 className="text-center">Product Price: {product.price}</h3>
      <h3 className="text-center">
        Product Description: {product.description}
      </h3>
      <br />
      <div className="form-group container">
        <StripeCheckout
          className="center"
          stripeKey="pk_test_51KGEzFE1GOI0kgwzvMRy1odMUx9f8GH0BAfNgCVgGQNDZ5VNWFH89Yj2qcpjUl7duH351Me87ZCJBJEZXnysnaMu00CBwJdsSp"
          token={handleToken}
          amount={product.price * 100}
          name="Sample Book"
          billingAddress
          shippingAddress
        />
      </div>
    </div>
  </div>



  );
}

export default App;
