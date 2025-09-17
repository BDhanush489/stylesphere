import Razorpay from "razorpay";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    payment_capture: 1,
  });

  return Response.json(order);
}
