import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  );

  return (
    <Grid
      width="100%"
      container
      direction="row"
      spacing={3}
      margin={0}
      marginRight={1}
      sx={{}}
    >
      {isLoading && (
        <Box width="100%" height="70vh">
          <LinearProgress />
        </Box>
      )}
      {!isLoading &&
        (filteredProducts.length > 0 ? (
          filteredProducts?.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product._id}>
              <Product product={product} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              height: "50vh",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              No product Found
            </Typography>
          </Box>
        ))}
    </Grid>
  );
};

export default Products;

// const filteredItemsRedux = useSelector((state) => state.search.filteredItems);
// const [items, setItems] = useState(filteredItemsRedux);
// const searchQuery = useSelector((state) => state.search.queryString);
// const filteredItems = items.filter(
//   (item) => item.title.toLowerCase() === searchQuery.toLowerCase()
// );
// if (filteredItems) {
//   dispatch(setFilteredItems(filteredItems));
// }
