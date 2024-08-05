import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.css";
import {} from 'react-router-dom';
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outletContextObj] = useOutletContext();
  const shoppingDataPool = outletContextObj['shoppingDataPool'][0];
  const chosenFoods = outletContextObj['chosenFoods'];
  const navigate = useNavigate();

  console.log(chosenFoods)

  async function addSales() {
    try {
      const result = await fetch("http://localhost:3001/sales", {
        method: "PATCH",
        body: JSON.stringify(chosenFoods),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPrevOrders() {
    try {
      const result = await fetch("http://localhost:3001/addPrevOrders", {
        method: "PATCH",
        body: JSON.stringify(shoppingDataPool),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(shoppingDataPool)
  
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          //TODO 
          addSales()
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    addPrevOrders()
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payLoad",
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };
  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    <form
      className={styles.paymentForm}
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} className={styles.paymentElement}/>
      <button disabled={isLoading || !stripe || !elements} id="submit"  className={styles.submitButton}>
        <span id="button-text">
          {/* {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} */}
          {isLoading ? <div className="spinner" id="spinner"></div> : `確認付款 $${shoppingDataPool['totalPrice']}`}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className={styles.paymentMessage}>{message}</div>}
    </form>
  );
}