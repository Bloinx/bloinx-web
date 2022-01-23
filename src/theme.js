import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#F58F98",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          textTransform: "initial",
        },
        contained: {
          color: "#FFF",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#AAA",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#AAA",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#2B2D33",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#292929",
          boxShadow: "0px 0px 10px black",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#292929",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "white",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: 25,
        },
      },
    },
  },
});
