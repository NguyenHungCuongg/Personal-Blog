import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import "bootstrap/dist/css/bootstrap.min.css";

function PasswordInputBar(Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined">
      <InputLabel error={Props.error} htmlFor="outlined-adornment-password">
        {Props.label}
      </InputLabel>
      <OutlinedInput
        error={Props.error}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={Props.value}
        onChange={Props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={Props.label}
      />
      {Props.error ? <FormHelperText error="true">Please enter your password</FormHelperText> : ""}
    </FormControl>
  );
}

export default PasswordInputBar;
