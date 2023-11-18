import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Box, Button, CardActionArea, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const Product = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  return (
    <Card
      sx={{
        width: "100%",
        border: "none",
        borderRadius: "none",
        boxShadow: "none",
      }}
    >
      <Box
        position="relative"
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <CardMedia
          sx={{
            width: "100%",
            height: "400px",
            cursor: "pointer",
          }}
          image={!isHover ? product?.images[0][0] : product?.images[1][0]}
          onClick={() => navigate(`/productDetail/${product._id}`)}
          alt={product.description}
        />

        {/* ######################################  */}

        <Box width="70%">
          <Box
            display={isHover ? "block" : "none"}
            position="absolute"
            bottom="0"
            left="10px"
            right="10px"
            width="85%"
          >
            <Button
              onClick={() => navigate(`/productDetail/${product._id}`)}
              style={{
                borderRadius: 4,
              }}
              sx={{
                alignSelf: "center",
                justifySelf: "center",
                border: `1.5px solid ${theme.palette.primary[500]}`,
                fontWeight: "bold",
                backgroundColor: `${theme.palette.white[500]}`,
                opacity: "0.7",
                m: "0 6px 10px 10px",
                color: `${theme.palette.text[500]}`,
                "&:hover": {
                  backgroundColor: `${theme.palette.white[600]}`,
                  color: `${theme.palette.text[500]}`,
                },
              }}
              size="large"
              fullWidth
              variant="outlined"
              startIcon={<AddOutlined />}
            >
              Quick View
            </Button>
          </Box>
        </Box>

        {/* ############################################# */}
      </Box>

      <CardContent
        sx={{
          height: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          {product?.brand}
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          {product?.name}
        </Typography>
        <CardActionArea>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "400",
            }}
          >
            {product?.description}
          </Typography>
        </CardActionArea>
        <Typography
          sx={{
            fontSize: "14px",

            fontWeight: "400",
            textDecoration: "line-through",
          }}
        >
          ${product?.regularPrice}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "300",
            color: "red",
          }}
        >
          (Up to {product?.discount}% off select Items)
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            color: "red",
          }}
        >
          ${product?.salePrice}
        </Typography>
        <Stack direction="row">
          <Rating
            size="small"
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            sx={{
              color: "#186ADC",
            }}
          />

          {/* <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "400",
            }}
          >
            ({product?.rating.rate})
          </Typography> */}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Product;
