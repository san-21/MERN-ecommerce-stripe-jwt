import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  quantityDecrement,
  quantityIncrement,
  removeProduct,
  clearCarts,
} from "../../redux/slices/cartSlice";
const CartItemsList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const theme = useTheme();

  const handleDecrement = (productId, productColor, productSize) => {
    dispatch(
      quantityDecrement({
        id: productId,
        color: productColor,
        size: productSize,
      })
    );
  };
  const handleIncrement = (productId, productColor, productSize) => {
    dispatch(
      quantityIncrement({
        id: productId,
        color: productColor,
        size: productSize,
      })
    );
  };
  const handleRemove = (productId, productColor, productSize) => {
    dispatch(
      removeProduct({ id: productId, color: productColor, size: productSize })
    );
  };
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        alignItems: "start",
        overflow: "auto",
        maxHeight: "70vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: 700,
          mb: 2,
        }}
      >
        Shipping({totalQuantity} items)
      </Typography>
      <Button
        onClick={() => dispatch(clearCarts())}
        sx={{
          textTranform: "capitalize",
        }}
      >
        Clear All Carts
      </Button>
      <Divider />
      {cartItems?.map((product, index) => (
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
                width: "100px",
                height: "160px",
                marginRight: "20px",
              }}
            />
            <Box flexGrow={1}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: `${theme.palette.text[500]}`,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: `${theme.palette.text[500]}`,
                  textTransform: "capitalize",
                }}
              >
                Size:{product.productSize}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
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
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  backgroundColor: product.productColor,
                }}
              ></div>
            </Box>
            <Typography
              sx={{
                color: `${theme.palette.text[300]}`,
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  fontSize: "16px",
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
              ml: 16,
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
              <RemoveIcon fontSize="medium" color="primary" />
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
              <AddIcon fontSize="medium" color="primary" />
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
              ml: 16,
              mb: 2,
              fontSize: "16px",
              textTransform: "capitalize",
            }}
          >
            Remove
          </Button>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default CartItemsList;
