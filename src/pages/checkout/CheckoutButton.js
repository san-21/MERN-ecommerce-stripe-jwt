//show how to access tripe payment
// nothing to do with the  project
// it is alternative way

import { Box, Button } from "@mui/material";
import React from "react";
import axios from "axios";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const CheckoutButton = ({ cartItems }) => {
  return (
    <Box>
      <form
        action="http://localhost:4000/api/stripe/create-checkout-session"
        method="POST"
      >
        <Button
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
          Check Out with Form
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutButton;
