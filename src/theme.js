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
      20: "#F6F7F8",
      50: "#FFFFFF",
      100: "#fcfcfd",
      200: "#f8fafb",
      300: "#f5f7fa",
      350: "#FDFDFD",
      400: "#f1f5f8",
      500: "#eef2f6",
      600: "#bec2c5",
      700: "#8f9194",
      800: "#5f6162",
      900: "#303031",
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
    blue: {
      100: "#d2eafc",
      200: "#a6d5f9",
      300: "#79bff7",
      400: "#4daaf4",
      500: "#2095f1",
      600: "#1a77c1",
      700: "#135991",
      800: "#0d3c60",
      900: "#061e30",
    },
    background: {
      20: "#F6F7F8",
      50: "#FFFFFF",
      100: "#fcfcfd",
      200: "#f8fafb",
      300: "#f5f7fa",
      350: "#FDFDFD",
      400: "#f1f5f8",
      500: "#eef2f6",
      600: "#bec2c5",
      700: "#8f9194",
      800: "#5f6162",
      900: "#303031",
    },

    white: {
      100: "#fefefe",
      200: "#fcfdfe",
      300: "#fbfcfd",

      400: "#f9fbfd",
      500: "#ffffff",
      600: "#c6c8ca",
      700: "#959697",
      800: "#636465",
      900: "#323232",
    },
    red: {
      100: "#f9cece",
      200: "#f29c9c",
      300: "#ec6b6b",
      400: "#e53939",
      500: "#df0808",
      600: "#b20606",
      700: "#860505",
      800: "#590303",
      900: "#2d0202",
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
