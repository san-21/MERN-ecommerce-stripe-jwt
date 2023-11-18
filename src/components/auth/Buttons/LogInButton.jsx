import { Button } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";

const LogInButton = ({ title, imgUrl, altTitle }) => {
  const theme = useTheme();
  return (
    <Button
      position="relative"
      size="large"
      variant="outlined"
      startIcon={
        // <GoogleIcon />
        <img
          width="25"
          height="25"
          src={imgUrl}
          alt={altTitle}
          style={{
            position: "absolute",
            left: 15,
            top: 11,
          }}
        />
      }
      sx={{
        mb: 2,
        width: "100%",
        height: "48px",
        border: `1px solid ${theme.palette.text[400]}`,
        color: `${theme.palette.text[600]}`,
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: "14px",
        "&:hover": {
          backgroundColor: `${theme.palette.indigo[50]}`,
          border: `1px solid ${theme.palette.text[400]}`,
          color: `${theme.palette.indigo[500]}`,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default LogInButton;
