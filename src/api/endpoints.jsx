import axios from "axios";
const env = require("../env");
const tindnshopid = env.dev.tindnshopid;

export function getSetupIntent() {
  return axios
    .post(
      "https://apistg.tindn.no/v1/customer/gateway/payment/stripe/setup-intent",
      {},
      { headers: { tindnshopid } }
    )
    .then((res) => res.data.data);
}
