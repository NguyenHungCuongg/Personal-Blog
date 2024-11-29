import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  return (
    <div className="container rounded-4 shadow p-5 px-5">
      <form id="loginForm" className="d-flex justify-content-between flex-column gap-4">
        <h3 className="fs-1 fw-bold text-center">Login</h3>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <PasswordInputBar />
        <CheckboxWithLabel label="Remember me" />
        <Button variant="contained">Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
