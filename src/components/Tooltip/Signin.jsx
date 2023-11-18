import { useState } from "react";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";

import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CssBaseline from "@mui/material/CssBaseline";

import { useDispatch } from "react-redux";

import { setSignupOpen } from "../../redux/slices/auth/authModalReducer";
const Signin = ({}) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <MenuList dense>
        <CssBaseline />
        <MenuItem>
          <Button
            fullWidth
            variant="contained"
            onClick={() => dispatch(setSignupOpen())}
          >
            Sign In | Create Acoount
          </Button>
        </MenuItem>

        <MenuItem sx={{}}>
          <Typography variant="h6" color="text.primary">
            Your Account
          </Typography>
        </MenuItem>
        <MenuItem sx={{}}>
          <ListItemIcon>
            {" "}
            <Inventory2OutlinedIcon />
          </ListItemIcon>
          <ListItemText>Purchases</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText>Wish List</ListItemText>
        </MenuItem>
        <MenuItem sx={{}}>
          <ListItemIcon>
            {" "}
            <AnnouncementOutlinedIcon />
          </ListItemIcon>
          <ListItemText>The Nordy Club Rewards</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <ListItemIcon>
            <LocalShippingOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Shipping Address</ListItemText>
        </MenuItem>
        <MenuItem sx={{}}>
          <ListItemIcon>
            {" "}
            <LocalAtmOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Payment Method</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <ListItemIcon>
            <LaunchOutlinedIcon />
          </ListItemIcon>
          <Typography>Pay And Manage NordStrom Card</Typography>
        </MenuItem>
        <MenuItem sx={{}}>
          <ListItemIcon>
            <StoreOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Store Locator</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <Typography variant="h6" fontStyle="bold" color="text.primary">
            Account Settings
          </Typography>
        </MenuItem>
        <MenuItem sx={{}}>
          <ListItemIcon>
            {" "}
            <HttpsOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Password And Personal info</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <ListItemIcon>
            <MailOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Email And Mail Preferences</ListItemText>
        </MenuItem>

        <MenuItem sx={{}}>
          <Typography variant="h6" color="text.primary">
            Need Help?
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Contact Us</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Signin;
