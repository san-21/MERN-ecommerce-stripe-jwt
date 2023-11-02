import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import MobileScreenShareOutlinedIcon from "@mui/icons-material/MobileScreenShareOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
const StyledFooterButton = styled(Button)(({ theme }) => ({
  disableElevation: true,
  disableFocusRipple: true,
  textTransform: "capitalize !important",
  fontSize: "14px",
  color: theme.palette.alltextcolor.main,
  paddingBottom: "0px",
  fontWeight: 300,
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  paddingLeft: "10px",
}));
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexDirection: "column",
  // width: "15%",
}));
const Footer = () => {
  return (
    <Box
      sx={{
        height: { xs: "650px", sm: "530px", md: "400px", lg: "370px" },
        display: "flex",
        alignItems: "space-around",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#F0F3F5",
        mt: 20,
        mb: 0,
      }}
    >
      <Container maxWidth="xl">
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="space-between"
          flexDirection="row"
          pt={4}
          mb={3}
          sx={{
            gap: { xs: 0, sm: 2, md: 3, lg: 6 },
          }}
        >
          <StyledBox>
            <StyledTypography>Customer Service</StyledTypography>
            <StyledFooterButton component={Link} variant="text">
              Order Status
            </StyledFooterButton>
            <StyledFooterButton variant="text">GUest Return</StyledFooterButton>
            <StyledFooterButton variant="text">
              Shipping & Return Policy
            </StyledFooterButton>
            <StyledFooterButton variant="text">Gift Cards</StyledFooterButton>
            <StyledFooterButton
              sx={{
                justifySelf: "flex-start",
                alignSelf: "start",
              }}
              variant="text"
            >
              FAQ
            </StyledFooterButton>
            <StyledFooterButton variant="text">Contact Us</StyledFooterButton>
          </StyledBox>
          <StyledBox>
            <StyledTypography>About Us</StyledTypography>
            <StyledFooterButton variant="text">
              About Our Brand
            </StyledFooterButton>
            <StyledFooterButton variant="text">The San club</StyledFooterButton>
            <StyledFooterButton variant="text">
              Store Locator
            </StyledFooterButton>
            <StyledFooterButton variant="text">All Brands</StyledFooterButton>
            <StyledFooterButton variant="text">Careers</StyledFooterButton>

            <StyledFooterButton variant="text">
              Get Email Updates
            </StyledFooterButton>
            <StyledFooterButton variant="text">SanShop Blog</StyledFooterButton>
            <StyledFooterButton variant="text">San Podcast</StyledFooterButton>
          </StyledBox>
          <StyledBox>
            <StyledTypography>San Shop & The Community</StyledTypography>
            <StyledFooterButton variant="text">
              Corporate Social Responsibility
            </StyledFooterButton>
            <StyledFooterButton variant="text">
              Diversity,Inclusion & Belonging
            </StyledFooterButton>
            <StyledFooterButton variant="text">
              Big Brothers Big Sisters
            </StyledFooterButton>
            <StyledFooterButton variant="text">
              Donate Clothes
            </StyledFooterButton>
          </StyledBox>
          <StyledBox>
            <StyledTypography>Sanshop Card</StyledTypography>
            <StyledFooterButton variant="text">
              Apply For a SanShop Card
            </StyledFooterButton>
            <StyledFooterButton variant="text">Payy My Bill</StyledFooterButton>
            <StyledFooterButton variant="text">
              Manage My Sanshop Card
            </StyledFooterButton>
          </StyledBox>
          <StyledBox
            sx={{
              display: { xs: "none" },
            }}
          >
            <StyledTypography>San,Inc.</StyledTypography>
            <StyledFooterButton variant="text">Sanshop</StyledFooterButton>
            <StyledFooterButton variant="text">HauteLook</StyledFooterButton>
            <StyledFooterButton variant="text">
              Inverstor Relations
            </StyledFooterButton>
            <StyledFooterButton variant="text">
              Press release
            </StyledFooterButton>
            <StyledFooterButton variant="text">
              San Media Network
            </StyledFooterButton>
          </StyledBox>

          <Box
            width="300px"
            pt={3}
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            flexDirection="column"
            rowGap={4}
          >
            <Box display="flex" alignItems="start" gap={2}>
              <IconButton disabled>
                <MobileScreenShareOutlinedIcon />
              </IconButton>
              <StyledFooterButton>Download Our App</StyledFooterButton>
            </Box>

            <Box display="flex" gap={2}>
              <IconButton>
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            gap: { xs: 0, sm: 2, md: 3, lg: 6 },
            ml: 3,
          }}
        >
          <StyledFooterButton>Privacy</StyledFooterButton>
          <StyledFooterButton>
            Don Not Sell My Personal Information
          </StyledFooterButton>
          <StyledFooterButton>Terms & Conditions</StyledFooterButton>
          <StyledFooterButton>Intereset Based Ads</StyledFooterButton>
          <StyledFooterButton>California Supply Chain Act</StyledFooterButton>
          <Typography
            sx={{
              display: { xs: "none" },
            }}
          >
            {" "}
            © 2023 Sanshop{" "}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
