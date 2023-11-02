import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  quantityDecrement,
  quantityIncrement,
  removeProduct,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ShoppingBagListTooltip = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const theme = useTheme();
  const navigate = useNavigate();
  const handleDecrement = (productId) => {
    dispatch(quantityDecrement(productId));
  };
  const handleIncrement = (productId) => {
    dispatch(quantityIncrement(productId));
  };
  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };
  return (
    <Box
      clasName="shoppingtolltip"
      sx={{
        justifyContent: "space-between",
        alignItems: "start",

        height: "90%",
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "start",
          overflow: "auto",
          height: "80%",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Shipping({cartItems.length} items)
        </Typography>
        <Divider />
        {cartItems.map((product, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",

                p: 2,
              }}
            >
              <img
                src={product.images[0][0]}
                alt={product.name}
                style={{
                  width: "70px",
                  height: "120px",
                  marginRight: "10px",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: `${theme.palette.text[500]}`,
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: `${theme.palette.text[500]}`,
                  }}
                >
                  Size:{product.productSize}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: `${theme.palette.text[500]}`,
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {" "}
                    Color:
                  </span>
                  {product.productColor}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: `${theme.palette.text[300]}`,

                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  $
                </span>
                {product.salePrice * product.quantity}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary",
                ml: 11,
              }}
            >
              <IconButton
                onClick={() =>
                  handleDecrement(
                    product._id,
                    product.productColor,
                    product.productSize
                  )
                }
              >
                <RemoveIcon fontSize="small" color="primary" />
              </IconButton>
              <Typography variant="h6">Qty {product.quantity}</Typography>
              <IconButton
                onClick={() =>
                  handleIncrement(
                    product._id,
                    product.productColor,
                    product.productSize
                  )
                }
              >
                <AddIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Button
              onClick={() =>
                handleRemove(
                  product._id,
                  product.productColor,
                  product.productSize
                )
              }
              size="large"
              sx={{
                ml: 11,
                mb: 1,
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              Remove
            </Button>
            <Divider />
          </Box>
        ))}
      </Box>
      <Divider />
      <Typography
        sx={{
          mt: 2,
          mr: 2,
          fontSize: "16px",
          color: `${theme.palette.text[500]}`,
          textAlign: "right",
        }}
      >
        SubTotal: {subTotal}
      </Typography>
      <Button
        sx={{
          mt: 6,
          textTransform: "capitalize",
          height: "50px",
          "&:hover": {
            color: "primary",
          },
        }}
        size="large"
        variant="contained"
        fullWidth
        startIcon={<WorkOutlineOutlinedIcon />}
        onClick={() => navigate("/shopping-cart")}
      >
        View Bag & Check Out
      </Button>
    </Box>
  );
};

export default ShoppingBagListTooltip;
