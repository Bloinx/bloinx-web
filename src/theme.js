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
          textTransform: "initial",
        },
        contained: {
          color: "white",
          backgroundColor: "#f58f98",
        },
        outlined: {
          backgroundColor: "#2b2d33",
          color: "white",
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
        root: {
          width: "100%",
          color: "white",
        },
        notchedOutline: {
          borderColor: "transparent",
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
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#2b2d33",
        },
        outlined: {
          color: "#FFFFFF",
        },
        nativeInput: {
          border: "1px solid red",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#2b2d33",
          borderRadius: 5,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        determinate: {
          height: 30,
          borderRadius: 15,
          backgroundColor: "rgba(245, 143, 152, 0.3)",
        },
        bar1Determinate: {
          borderRadius: 15,
        },
      },
    },
  },
  MuiPaginationUl: {
    marginRight: "5px",
    padding: "0px 15px",
    height: "40px",
    minWidth: "35px",
    backgroundColor: "$gray",
    border: "none",
    borderRadius: "3px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
});
