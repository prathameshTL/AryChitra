const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Route to create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be passed from frontend, but we can hardcode for this demo or map budgets

    // In a real app, calculate amount based on the budget string.
    // For demo purposes, we will charge a flat ₹1000 INR consulting fee to start the project.
    const consultingFee = 1000;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'rzp_test_fallback') {
      // Fallback for demo purposes when keys are not set
      console.log('Razorpay keys not found, returning mock order');
      return res.json({
        id: `mock_order_${Date.now()}`,
        amount: consultingFee * 100,
        currency: "INR"
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: consultingFee * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to verify payment signature
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    // Check if it's a mock payment
    if (razorpay_order_id && razorpay_order_id.startsWith('mock_order_')) {
      return res.status(200).json({ message: "Mock Payment verified successfully" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", keySecret || 'fallback_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
