import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// const YOUR_DOMAIN = "http://localhost:3000/shopping-cart";
router.post("/create-checkout-session", async (req, res) => {
  const cartItems = req.body.cartItems;
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[0][0]],
          description: item.description,
          metadata: {
            id: item._id,
            color: item.productColor,
          },
        },
        unit_amount: item.salePrice * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      quantity: item.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "ET"],
      },
      //you can do this in dashboard and paste rate id here
      // shipping_options: [
      //   { shipping_rate: "shr_1O5w7RFu4wyLHSp4lKCh6FDZ" },
      //   { shipping_rate: "shr_1O5wA6Fu4wyLHSp4xXrBfdyh" },
      // ],

      ////////above are the same as below
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items,
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/shopping-cart`,
    });

    res.json({ url: session.url });
  } catch (e) {
    switch (e.type) {
      case "StripeAPIConnectionError":
        console.log(`A Connection error occurred: ${e.message}`);
        break;
      case "StripeAPIError":
        console.log("Stripe internal error occurred.");
        break;
      default:
        console.log("Another problem occurred, maybe unrelated to Stripe.");
        break;
    }
  }
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

export default router;
