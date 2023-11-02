import React from "react";

import { useTheme } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";

const TopNotification = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.primary[500]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        padding: "6px",
        zIndex: 1,
        color: "white",
        fontWeight: 400,
        width: "100%",
        height: { xs: "70px", sm: "60px", md: "40px", lr: "40px" },
        marginBottom: 2,
      }}
    >
      <Typography variant="p">
        Free shipping over $89. Shop online or pick up select orders at a
        SanShop or sanShop store.
        <Link href="#" underline="always" color="inherit">
          Learn More
        </Link>
      </Typography>
    </Box>
  );
};

export default TopNotification;
