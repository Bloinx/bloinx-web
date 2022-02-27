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
  },
});
