import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      500: "#186ADC",
      400: "#327FEF",
      300: "#fff",
    },
    secondary: {
      main: "#030202",
    },
    alltextcolor: {
      main: "#030202",
      light: "#f5f5f5",
    },
    background: {
      500: "#FFFFFF",
    },
    text: {
      100: "#d0d1d4",
      200: "#a0a3a8",
      300: "#71757d",
      400: "#414751",
      500: "#121926",
      600: "#0e141e",
      700: "#0b0f17",
      800: "#070a0f",
      900: "#040508",
    },
    indigo: {
      50: "#e1f1ff",
      100: "#ccddf6",
      200: "#99bbed",
      300: "#669ae4",
      400: "#3378db",
      500: "#0056d2",
      600: "#0045a8",
      700: "#00347e",
      800: "#002254",
      900: "#00112a",
    },
    green: {
      100: "#dbefdc",
      200: "#b7dfb9",
      300: "#94cf96",
      400: "#70bf73",
      500: "#4caf50",
      600: "#3d8c40",
      700: "#2e6930",
      800: "#1e4620",
      900: "#0f2310",
    },
    common: {
      white: "white",
    },

    bigpromo: {
      main: "#98C6C2",
    },
    bigpromo2: {
      main: "#FFEB99",
    },
    warning: {
      main: "#fe201f",
    },
    commonwhite: {
      main: "#ececec",
    },
  },
  typography: {
    fontSize: 12,
  },

  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14px",
          color: "black",
          backgroundColor: "black",
          border: "1px solid #dedede",
          borderRadius: 0,
        },
        arrow: {
          fontSize: 16,
          width: 17,
          "&::before": {
            border: "1px solid #dedede",
            backgroundColor: "#fff",
            boxSizing: "border-box",
          },
        },
      },
    },
  },
});
