import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider } from "@mui/material/styles";
import "dayjs/locale/uk";
import { basicDateCalendarTheme } from "@/shared/ui/theme/basicDateCalendarTheme";
export default function BasicDateCalendar({ value, onChange }) {
  return (
    <ThemeProvider theme={basicDateCalendarTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <DateCalendar value={value} onChange={onChange} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
