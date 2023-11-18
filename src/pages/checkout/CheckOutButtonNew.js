import React from "react";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { setLoginOpen } from "../../redux/slices/auth/authModalReducer";
import { instance } from "../../services/axiosClient";
export default function CheckOutButtonNew({ cartItems }) {
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(
    (state) => state.authenticate.userAuthenticated
  );
  /*******First way */
  const handleCheckout = async () => {
    const res = await instance.post("/api/stripe/create-checkout-session", {
      cartItems,
    });

    const data = await res.data;
    console.log(data);
    window.location.href = data.url;
  };

  return (
    <Box>
      {userAuthenticated && (
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
      {!userAuthenticated && (
        <Button
          onClick={() => dispatch(setLoginOpen())}
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
      )}
    </Box>
  );
}
