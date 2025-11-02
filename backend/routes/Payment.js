const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config();

router.post('/digitalis-pay', async (req, res) => {
  const { amount, phoneNumber, orderId } = req.body;

  try {
    const response = await axios.post(
      "https://api.digitalispay.com/api/pay/request-to-pay",
      {
        amount,
        clientPhoneNumber: phoneNumber,
        payerPhoneNumber: phoneNumber,
        paymentRef: orderId
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.DIGITALIS_PAY_API_KEY,
        }
      }
    );

    return res.json({ status: "success", message: "Request sent to user's phone." });
  } catch (err) {
    console.log("PAY ERROR:", err.response?.data || err.message);
    return res.status(500).json({
      status: "error",
      message: err.response?.data || "Payment failed. Try again."
    });
  }
});

module.exports = router;
