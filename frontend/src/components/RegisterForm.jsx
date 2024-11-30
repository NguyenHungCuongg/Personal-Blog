import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
  return (
    <div className="container rounded-4 shadow p-5 px-5" style={{ maxWidth: "480px" }}>
      <form id="loginForm" className="d-flex justify-content-between flex-column gap-4">
        <h3 className="fs-1 fw-bold text-center">Register</h3>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <PasswordInputBar label="Password" />
        <PasswordInputBar label="Confirm Password" />
        <CheckboxWithLabel label="Remember me" />
        <Button variant="contained">Register</Button>
      </form>
      <div className="d-flex flex-column py-3">
        <p className="text-center py-2">
          Already have an account?{" "}
          <a href="/login" style={{ color: "var(--main-color)", cursor: "pointer" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
