import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCarts } from "../../redux/slices/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCarts());
  }, []);
  return <Box height="60vh">Payment successfull</Box>;
};

export default Success;
