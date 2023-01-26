import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getSetupIntent } from "../api/endpoints";
import OrderSummary from "../components/orderSummary";
import CheckoutForm from "../components/CheckoutForm";
const env = require("../env");

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(200);
  const stripePromise = loadStripe(
    "pk_test_51MRtrYD8SBr38p0KlBzAJaCnpxcr72wsrjvLx7tJcDYRSgAjL04Zf0Kd07xbrxPBo4lUG2SPOdrUIJtZvk7TnuWd00D6px2SrH"
  );
  const [secret, setSecret] = useState("");
  const orderGuestAPIURL = env.dev.orderGuestAPIURL;
  const tindnshopid = env.dev.tindnshopid;

  useEffect(() => {
    getSetupIntent().then((res) => {
      setSecret(res.client_secret);
    });
  }, []);
  const checkout = (payload) => {
    axios
      .post(orderGuestAPIURL, payload, {
        headers: { tindnshopid },
      })
      .then((res) => {
        localStorage.setItem("cart", JSON.stringify([]));
        setOpen(true);
      })
      .catch((err) => {
        setStatus(err.response.status);
        setOpen(true);
      })
      .finally(() => {
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className="mx-auto max-w-2xl py-10 px-4 sm:py-18 sm:px-6">
      <OrderSummary
        status={status}
        open={open}
        setOpen={setOpen}
      ></OrderSummary>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Checkout
        </h2>
      </div>

      {secret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: secret,
            appearance: {
              theme: "stripe",
              variables: { colorText: "#555555" },
            },
          }}
        >
          <CheckoutForm callBack={(e) => checkout(e)} secret={secret} />
        </Elements>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </div>
  );
}
