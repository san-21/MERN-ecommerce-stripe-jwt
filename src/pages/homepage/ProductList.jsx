import { Container, Typography } from "@mui/material";
import React from "react";
// import SortProduct from "./SortProduct";
import Products from "./Products";

const ProductList = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginLeft: 3,
          fontWeight: 700,
        }}
      >
        Our Products
      </Typography>

      {/* <SortProduct /> */}
      <Products />
    </Container>
  );
};

export default ProductList;
