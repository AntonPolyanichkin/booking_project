import { createTheme } from "@mui/material/styles";

export const basicDateCalendarTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          backgroundColor: "#ffffff",
          borderRadius: "10%",
        },
      },
    },
  },
});
