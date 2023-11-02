import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { productData } from "../../assets/data/productdata";
import { AddOutlined } from "@mui/icons-material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  addToCart,
  setSubTotal,
} from "../../redux/slices/cartSlice";
const StyledButton = styled(Button)({
  textTransform: "capitalize !important",
  textDecoration: "underline",
  fontSize: "14px",
  "&:hover": {
    textDecoration: "underline",
    textDecorationThickness: "2px",
  },
});

const ProductDetail = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.product.products);
  console.log(products);
  const params = useParams();
  const id = params.productId;
  // console.log(id);

  const [allProducts, setAllProducts] = useState(products);
  useEffect(() => {
    setAllProducts(products);
  }, []);

  const selectedProduct = allProducts.find((item) => item._id === id);
  const [product, setProduct] = useState(selectedProduct);
  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [quantity, setQuantiy] = useState(1);
  const isFilled = [productColor, productSize].every(Boolean);

  const handleAddtoCart = () => {
    if (isFilled) {
      dispatch(addProducts(product));
      dispatch(
        addToCart({
          item: { ...product, productSize, productColor, quantity },
        })
      );
    }
  };

  const handleSizeChange = (event) => {
    setProductSize(event.target.value);
  };
  const handleProductColor = (color) => {
    setProductColor(color);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "repeat(6,1fr)",
        gridTemplateRows: "auto",
      }}
      gap={15}
    >
      {/* imagebox */}
      <Box
        sx={{
          gridColumn: {
            xs: "span 6",
            sm: "span 6",
            md: "span 6",
            lg: "span 4",
          },

          height: "750px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box height="600px" width="45%">
          <img
            alt="photo1"
            width="100%"
            height="auto"
            maxh-height="600px"
            src={selectedProduct?.images[0][0]}
          />
        </Box>
        <Box height="600px" width="45%">
          <img
            alt="photo2"
            width="100%"
            height="auto"
            max-height="600px"
            src={selectedProduct?.images[1][0]}
          />
        </Box>
      </Box>

      {/* right detail */}
      <Box
        sx={{
          gridColumn: {
            xs: "span 6",
            sm: "span 6",
            md: "span 6",
            lg: "span 2",
          },
          gridRow: { xs: "1 /3", sm: "span 2" },

          height: "800px",
          marginRight: 5,
          marginTop: 6,
          padding: 4,
        }}
      >
        <Box
          width="100%"
          height="auto"
          mr={3}
          gap={1}
          display="flex"
          flexDirection="column"
          alignItems="start"
          mt={3}
        >
          <Box>
            <Box display="flex" alignItems="center">
              <Rating
                size="medium"
                name="half-rating"
                defaultValue={4.1}
                precision={0.5}
                sx={{
                  color: "#186ADC",
                }}
              />
              <Typography>(60)</Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {selectedProduct?.name}
          </Typography>
          <Typography>{selectedProduct?.brand}</Typography>
          <Typography>{selectedProduct?.salePrice}$</Typography>
          <Typography>{selectedProduct?.discount}%</Typography>
          <Box display="flex" flexDirection="row">
            <LocalShippingOutlinedIcon />

            <Typography> Free shipping on order $89+</Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 16,
            }}
          >
            {selectedProduct?.description}
          </Typography>
          <Typography>
            Color:
            <span
              style={{
                marginLeft: 2,
                fontSize: 17,
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              {productColor}
            </span>
          </Typography>
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              marginBottom={3}
            >
              {selectedProduct.colors.map((color, index) => (
                <Grid item key={index}>
                  <Box position="relative">
                    <div
                      onClick={() => handleProductColor(color)}
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "100%",
                        backgroundColor: color,
                      }}
                    >
                      {productColor === color && (
                        <CheckIcon
                          fontSize="medium"
                          sx={{
                            position: "absolute",
                            top: 0,

                            right: 0,
                            bottom: 100,
                            color: "white",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <FormControl
            fullWidth
            sx={{
              marginBottom: 3,
            }}
          >
            <InputLabel
              sx={{
                fontSize: "16px",
              }}
            >
              Choose Size
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              value={productSize}
              style={{
                height: "50px",
                marginTop: "10px",
                padding: "0px",
              }}
              onChange={handleSizeChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              {selectedProduct.sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            sx={{
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
            onClick={handleAddtoCart}
          >
            Add to Bag
          </Button>
          <Box display="flex">
            <IconButton disabled>
              <AddOutlined />
            </IconButton>
            <StyledButton>Add to Wish List</StyledButton>
          </Box>

          <Box bgcolor="#F0F3F5">
            <Typography p={1} letterSpacing={1}>
              Get a $40 Bonus Note when you use a new Nordstrom credit card.
              <StyledButton>Apply Now</StyledButton>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* bottom description */}
      <Box
        sx={{
          gridColumn: {
            xs: "span 6",
            sm: "span 6",
            md: "span 6",
            lg: "span 5",
          },
          gridRow: "span 7",
        }}
      >
        <Divider />
        <Box
          mt={7}
          mb={7}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            ml: { xs: 2, sm: 6 },
            mr: { xs: 0, sm: 6 },
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "90%", md: "80%", lg: "40%" },
              height: "auto",
              mb: 3,
              mr: 3,
            }}
          >
            <ReactQuill readOnly="true" value={selectedProduct?.content} />
          </Box>
          <Box
            width="40%"
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="start"
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
              variant="h5"
            >
              Shipping & Return
            </Typography>
            <Typography>Description</Typography>
            <ul>
              <li>
                This item qualifies for free shipping on orders over $89.{" "}
              </li>
              <li>
                This item is returnable within 40 days by mail or to U.S.
                Sanshop Rack and U.S. sanShop Store.{" "}
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
