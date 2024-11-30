import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  return (
    <div className="container rounded-4 shadow p-5 px-5" style={{ maxWidth: "480px" }}>
      <form id="loginForm" className="d-flex justify-content-between flex-column gap-4">
        <AccountCircleOutlinedIcon style={{ fontSize: "5rem", color: "var(--main-color)", margin: "auto" }} />
        <h3 className="fs-1 fw-bold text-center">Login</h3>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <PasswordInputBar label="Password" />
        <CheckboxWithLabel label="Remember me" />
        <Button variant="contained">Login</Button>
      </form>
      <div className="d-flex flex-column py-3">
        <a
          className="text-center py-2"
          href="/forgot-password"
          style={{ color: "var(--main-color)", pointer: "cursor" }}
        >
          Forgot your password?
        </a>
        <p className="text-center py-2">
          Don&apos;t have an account?{" "}
          <a href="/register" style={{ color: "var(--main-color)", cursor: "pointer" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
