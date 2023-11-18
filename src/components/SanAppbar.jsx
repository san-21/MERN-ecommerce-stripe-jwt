import {
  AppBar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import TopNotification from "./TopNotification";
import { styled, useTheme } from "@mui/material/styles";
import logo from "../assets/images/sanlogo1.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
/////////////////////////////////////////Icons //////////////////

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { Link, useNavigate } from "react-router-dom";
import EmpityCartTooltip from "./Tooltip/EmpityCartTooltip";
import ShoppingBagListTooltip from "./Tooltip/ShoppingBagListTooltip";

import { useDispatch, useSelector } from "react-redux";

import {
  setFilteredProducts,
  setSearchTerm,
} from "../redux/slices/productSlice";
import { logout } from "../redux/slices/auth/authReducer";
import {
  setLoginOpen,
  setSignupOpen,
} from "../redux/slices/auth/authModalReducer";
import { instance } from "../services/axiosClient";
import { setUserUnAuthenticated } from "../redux/slices/auth/authenticateReducer";

const StyledButton = styled(Button)(({ theme }) => ({
  size: "small",

  color: theme.palette.alltextcolor.main,
  fontWeight: 300,
}));
const CartLightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[7],
    describeChild: true,
    fontSize: 11,
    width: "360px",
    height: "160px",
  },
}));
const ShoppinBagTooltipStyle = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[7],
    describeChild: true,
    fontSize: 11,
    width: "400px",
    height: "600px",
  },
}));
const SanAppbar = () => {
  const auth = useSelector((state) => state.auth);
  const userAuthenticated = useSelector(
    (state) => state.authenticate.userAuthenticated
  );

  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const cart = useSelector((state) => state.cart.totalQuantity);
  const theme = useTheme();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [signoutLoading, setSignoutLoading] = useState(false);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(setSearchTerm({ qs: searchTerm }));

    const filteredresult = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilteredProducts({ data: filteredresult }));
  };
  const handleSignout = async () => {
    setSignoutLoading(true);

    try {
      const result = await instance.post("/auth/logout");
      dispatch(logout());
      dispatch(setUserUnAuthenticated());
      console.log(result);

      setSignoutLoading(false);

      navigate("/", { replace: true });
    } catch (error) {
      setSignoutLoading(false);
    }
  };
  const handleSignupOpen = () => {
    dispatch(setSignupOpen());
  };
  const handleSigninOpen = () => {
    dispatch(setLoginOpen());
  };
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "inherit",
        position: "static",
        marginBottom: 2,
        miWidth: "100%",
      }}
    >
      <TopNotification />
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: `${theme.palette.white[500]}`,
          color: `${theme.palette.text[500]}`,
          height: "90px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100px", sm: "200px", md: "200px", lg: "250px" },
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Link to="/">
            <img alt="shoplogo" width="60%" height="auto" src={logo} sx={{}} />
          </Link>
        </Box>
        <Paper
          elevation={0}
          variant="outlined"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "40%",
            flex: 2,
            mr: { xs: 0, sm: 6 },
            variant: "outlined",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 0.5 }}
            placeholder="Search products or brands"
            onChange={handleSearch}
          />
        </Paper>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },

            justifyContent: "center",
            alignItems: "center",
            flex: 1.5,
            padding: "20px",
          }}
        >
          {userAuthenticated && (
            <Typography
              sx={{
                fontWeight: 600,
                color: `${theme.palette.primary.main}`,
                fontSize: "16px",
              }}
            >
              {auth.fullname}
            </Typography>
          )}

          {cart === 0 ? (
            <CartLightTooltip
              title={<EmpityCartTooltip />}
              arrow
              placement="bottom-end"
            >
              <Badge
                badgeContent={quantity}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 17,
                    top: 11,
                  },
                }}
                color="primary"
              >
                <StyledButton
                  variant="text"
                  onClick={() => navigate("/shopping-cart")}
                >
                  <WorkOutlineIcon />
                </StyledButton>
              </Badge>
            </CartLightTooltip>
          ) : (
            <ShoppinBagTooltipStyle
              title={<ShoppingBagListTooltip />}
              arrow
              placement="bottom-end"
            >
              <Badge
                badgeContent={quantity}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 17,
                    top: 11,
                  },
                }}
                color="primary"
              >
                <StyledButton
                  variant="text"
                  onClick={() => navigate("/shopping-cart")}
                >
                  <WorkOutlineIcon />
                </StyledButton>
              </Badge>
            </ShoppinBagTooltipStyle>
          )}

          <Button
            onClick={!userAuthenticated ? handleSignupOpen : handleSignout}
            variant="contained"
            sx={{
              width: "120px",
              height: "35px",
              ml: 2,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            {!userAuthenticated && !signoutLoading && "Join Now"}
            {userAuthenticated && !signoutLoading && "Sign Out"}
            {signoutLoading && (
              <CircularProgress
                size={30}
                sx={{
                  color: `${theme.palette.background[500]}`,
                }}
              />
            )}
          </Button>
          {!userAuthenticated && !signoutLoading && (
            <Button
              onClick={!userAuthenticated && handleSigninOpen}
              variant="outlined"
              sx={{
                width: "120px",
                height: "35px",
                ml: 2,
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
      <Box
        sx={{
          display: { xs: "flex", sm: "none", md: "none", lg: "none" },

          justifyContent: "center",
          alignItems: "center",
          flex: 1.5,
          padding: "20px",
        }}
      >
        {userAuthenticated && (
          <Typography
            sx={{
              fontWeight: 600,
              color: `${theme.palette.primary.main}`,
              fontSize: "13px",
            }}
          >
            {auth.fullname}
          </Typography>
        )}

        {cart === 0 ? (
          <CartLightTooltip
            title={<EmpityCartTooltip />}
            arrow
            placement="bottom-end"
          >
            <Badge
              badgeContent={quantity}
              sx={{
                "& .MuiBadge-badge": {
                  right: 17,
                  top: 11,
                },
              }}
              color="primary"
            >
              <StyledButton
                variant="text"
                onClick={() => navigate("/shopping-cart")}
              >
                <WorkOutlineIcon />
              </StyledButton>
            </Badge>
          </CartLightTooltip>
        ) : (
          <ShoppinBagTooltipStyle
            title={<ShoppingBagListTooltip />}
            arrow
            placement="bottom-end"
          >
            <Badge
              badgeContent={quantity}
              sx={{
                "& .MuiBadge-badge": {
                  right: 17,
                  top: 11,
                },
              }}
              color="primary"
            >
              <StyledButton
                variant="text"
                onClick={() => navigate("/shopping-cart")}
              >
                <WorkOutlineIcon />
              </StyledButton>
            </Badge>
          </ShoppinBagTooltipStyle>
        )}

        <Button
          onClick={!userAuthenticated ? handleSignupOpen : handleSignout}
          variant="contained"
          sx={{
            width: "120px",
            height: "35px",

            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          {!userAuthenticated && !signoutLoading && "Join Now"}
          {userAuthenticated && !signoutLoading && "Sign Out"}
          {signoutLoading && (
            <CircularProgress
              size={30}
              sx={{
                color: `${theme.palette.background[500]}`,
              }}
            />
          )}
        </Button>
        {!userAuthenticated && !signoutLoading && (
          <Button
            onClick={!userAuthenticated && handleSigninOpen}
            variant="outlined"
            sx={{
              width: "120px",
              height: "35px",
              ml: 2,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Log In
          </Button>
        )}
      </Box>

      <Divider
        sx={{
          marginTop: 3,
        }}
      />
    </AppBar>
  );
};

export default SanAppbar;
