import { Box, Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import CartItemsList from "./CartItemsList";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import OrderSummary from "./OrderSummary";

const ShoppingCart = () => {
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart.totalQuantity);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "grid",
          // gridAutoFlow: "row",
          gridTemplateColumns: "repeat(6,1fr)",
          gridTemplateRows: {
            xs: "repeat(auto, 200px)",
            sm: "repeat(auto, 200px)",
            md: "repeat(auto, 200px)",
            lg: "repeat(auto, 200px)",
          },

          backgroundColor: "#eef2f6",
          gap: 3,
          padding: 3,
        }}
      >
        {/* shoppingbox */}
        <Box
          sx={{
            gridColumn: { xs: "span 6", sm: "span 4", md: "span 4" },
            gridRow: "span 7",
            backgroundColor: "white",
            mt: 4,
          }}
        >
          {cart >= 1 && (
            <Typography
              variant="h4"
              sx={{
                mt: 4,
                fontWeight: 600,
                textAlign: "center",
                alignItems: "center",
                color: `${theme.palette.text[300]}`,
              }}
            >
              Shopping Bag({cartItems.length})
            </Typography>
          )}
          {cart === 0 && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                textAlign: "center",
                alignItems: "center",
                color: `${theme.palette.text[300]}`,
                mt: 6,
              }}
            >
              No Item in The Cart
            </Typography>
          )}
        </Box>

        {/* Order Summary */}
        <Box
          sx={{
            gridColumn: { xs: "span 6", sm: "span 4", md: "span 2" },
            gridRow: { xs: "9 / 29", sm: "span 9", md: "span 8" },
            backgroundColor: "white",
            mt: 4,
            minHeight: "200px",
            maxHeight: "450px",
            p: 4,
          }}
        >
          {cart >= 1 && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Order Summary
              <OrderSummary />
            </Typography>
          )}
          {cart === 0 && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              No Order Summary Yet
            </Typography>
          )}
        </Box>

        {/* Shopping List */}

        {cart >= 1 && (
          <Box
            sx={{
              overflow: "auto",
              gridColumn: { xs: "span 6", sm: "span 4", md: "span 4" },
              gridRow: "auto",
              backgroundColor: "white",
              minHeight: "400px",

              p: 4,
            }}
          >
            <CartItemsList />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ShoppingCart;
