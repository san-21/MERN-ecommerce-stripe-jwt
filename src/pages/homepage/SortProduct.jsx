import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { setFilteredProducts } from "../../redux/slices/productSlice";
const SortProduct = () => {
  const totalProducts = useSelector(
    (state) => state.product.filteredProducts.length
  );

  const [currentValue, setCurrentValue] = useState("featured");
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        sx={{
          display: { xs: "none", sm: "block" },
          marginLeft: 3,
          paddingTop: 4,
          fontSize: 16,
        }}
      >
        {totalProducts} Items
      </Typography>

      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          value={currentValue}
          style={{
            width: 300,
            height: "40px",
            marginTop: "10px",
            padding: "0px",
          }}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value="rating">Sort by Customer rating</MenuItem>
          <MenuItem value="newest">Sort by newest</MenuItem>
          <MenuItem value="featured">Sort by featured</MenuItem>
          <MenuItem value="off">Sort by percent off</MenuItem>
          <MenuItem value="priceLH">Sort by price: low to high</MenuItem>
          <MenuItem value="priceHL">Sort by price: high to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortProduct;
