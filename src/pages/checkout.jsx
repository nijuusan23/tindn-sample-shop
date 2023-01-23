import { useState } from "react";
import axios from "axios";

import useCheckoutForm from "../customHooks/checkoutForm";
import OrderSummary from "../components/orderSummary";

const env = require("../env");

const tindnshopid = env.dev.tindnshopid;
const orderGuestAPIURL = env.dev.orderGuestAPIURL;
const username = "v42@gmail.com";

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(200);
  const [isLoading, setIsLoading] = useState(false);

  const cartCheckout = JSON.parse(localStorage.getItem("cart")) || [];
  const totalValue = cartCheckout.reduce(
    (prev, current) => prev + current.price.b2c.amount * current.quantity,
    0
  );

  const checkout = () => {
    setIsLoading(true);

    const payload = {
      customerInfo: {
        username: username,
        userType: "customer",
        legalName: inputs.firstName,
        firstName: inputs.firstName,
        shopId: tindnshopid,
        gatewayReference: {},
        lastName: inputs.lastName,
        avatar: "string",
        contact: {
          email: inputs.email,
          mobileNumber: inputs.mobileNumber,
        },
      },
      paymentInfo: {
        setupIntentId: "seti_1LurKoQhnL7ViwYNsyzApnKX",
        paymentMethodId: "pm_1MRuXaD8SBr38p0KCsUWulrB",
      },
      items: [],
      address: {
        street: inputs.street,
        city: inputs.city,
        country: inputs.country,
        zipcode: inputs.zipcode,
        latitude: "0",
        longitude: "0",
        fullAddress: `${inputs.street}, ${inputs.city}, ${inputs.country}, ${inputs.zipcode}`,
      },
      channelId: "b2c",
    };

    for (let i = 0; i < cartCheckout.length; i++) {
      payload.items.push({
        productId: cartCheckout[i].productid,
        quantity: cartCheckout[i].quantity,
        productInfo: cartCheckout[i],
      });
    }

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
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useCheckoutForm(checkout);

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

      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-gray-100 px-4 py-5 sm:p-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">
              Shipping Information
            </h2>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  required
                  onChange={handleInputChange}
                  value={inputs.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.email}
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.contactNumber}
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  onChange={handleInputChange}
                  value={inputs.country}
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option>Canada</option>
                  <option>Norway</option>
                  <option>Philippines</option>
                  <option>Singapore</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.postalCode}
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  autoComplete="postal-code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.streetAddress}
                  type="text"
                  name="street"
                  id="street"
                  autoComplete="street-address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.city}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputs.state}
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <h2 className="text-xl font-bold tracking-tight text-gray-900 my-6">
                Payment
              </h2>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  value={"4242424242424242"}
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on Card
                </label>
                <input
                  value={"Test Credit Card"}
                  type="text"
                  name="cardName"
                  id="card-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="cardExpiration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration
                </label>
                <input
                  value={"10/2023"}
                  type="text"
                  name="cardExpiration"
                  id="cardExpiration"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="cardCVC"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVC
                </label>
                <input
                  value={"314"}
                  type="text"
                  name="cardCVC"
                  id="cardCVC"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <span className="mr-10 font-bold">Total: ${totalValue}</span>

            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
