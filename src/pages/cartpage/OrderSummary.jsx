import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import CheckOutButtonNew from "../checkout/CheckOutButtonNew";
const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 3,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          Subtotal
        </Typography>
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
            }}
          >
            $
          </span>
          {parseInt(subTotal)}
        </Typography>
      </Box>
      {/* ///// */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          Shipping
        </Typography>
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          Free
        </Typography>
      </Box>
      {/* //// */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          Estimated tax
        </Typography>
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
            }}
          >
            $
          </span>
          0.00
        </Typography>
      </Box>
      <Divider
        sx={{
          mt: 2,
        }}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          Estimated total
        </Typography>
        <Typography
          sx={{
            color: `${theme.palette.text[300]}`,
            fontSize: "20px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
            }}
          >
            $
          </span>
          {parseInt(subTotal)}
        </Typography>
      </Box>
      {/* <CheckoutButton cartItems={cartItems} /> */}
      <CheckOutButtonNew cartItems={cartItems} />
    </Box>
  );
};

export default OrderSummary;
