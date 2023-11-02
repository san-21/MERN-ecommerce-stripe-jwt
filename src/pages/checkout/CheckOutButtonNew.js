import React from "react";
import axios from "axios";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDialogOpen } from "../../redux/slices/authModalSlice";
export default function CheckOutButtonNew({ cartItems }) {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  /*******First way */
  const handleCheckout = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/stripe/create-checkout-session",
      {
        cartItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.data;
    console.log(data);
    window.location.href = data.url;
  };

  return (
    <Box>
      {loginStatus === "success" && (
        <Button
          onClick={handleCheckout}
          type="submit"
          sx={{
            mt: 12,
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
        >
          Check Out
        </Button>
      )}
      {loginStatus === "rejected" ||
        (loginStatus === "" && (
          <Button
            onClick={() => dispatch(setLoginDialogOpen())}
            type="submit"
            sx={{
              mt: 12,
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
          >
            Login To Check Out
          </Button>
        ))}
    </Box>
  );
}
