import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import GeneralSnackBar from "./GeneralSnackBar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";

function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      window.location.href = "http://localhost:3000/api/auth/google";
    } catch (err) {
      console.log("Error registering user:", err);
      setErrorMessage("An error occurred while registering. Please try again.");
      setOpenSnackBar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Reset lại các trạng thái lỗi
    setEmailError(false);
    setPasswordError(false);
    setCheckConfirmPassword(true);
    setConfirmPasswordError(false);
    setUsernameError(false);
    setOpenSnackBar(false);
    setErrorMessage("");

    //Các trường hợp nếu email, username, password hoặc confirmPassword không được nhập
    if (email.trim() === "") {
      setEmailError(true);
    }
    if (username.trim() === "") {
      setUsernameError(true);
    }
    if (password.trim() === "") {
      setPasswordError(true);
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError(true);
    }
    if (email.trim() === "" || password.trim() === "" || username.trim() === "" || confirmPassword.trim() === "") {
      return;
    }
    if (password !== confirmPassword) {
      setCheckConfirmPassword(false);
      return;
    }

    //Trường hợp nếu các input hợp lệ
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        email: email,
        username: username,
        password: password,
        rememberMe: rememberMe,
      });
      //Nếu đăng ký thành công thì chuyển hướng về trang chủ
      if (response.data.success) {
        navigate("/"); // Redirect về home page
      } else {
        setErrorMessage(response.data.error);
        setOpenSnackBar(true);
        setEmailError(true);
        setUsernameError(true);
        setPasswordError(true);
        setConfirmPasswordError(true);
      }
    } catch (err) {
      console.log("Error registering user:", err);
      setErrorMessage("An error occurred while registering. Please try again.");
      setOpenSnackBar(true);
    }
  };
  return (
    <div className="container rounded-4 shadow p-5 px-5" style={{ maxWidth: "480px" }}>
      <GeneralSnackBar open={openSnackBar} errorMessage={errorMessage} onClose={() => setOpenSnackBar(false)} />
      <form id="registerForm" className="d-flex justify-content-between flex-column gap-4" onSubmit={handleSubmit}>
        <AccountCircleOutlinedIcon style={{ fontSize: "5rem", color: "var(--main-color)", margin: "auto" }} />
        <h3 className="fs-1 fw-bold text-center">Register</h3>
        <TextField
          error={emailError}
          id={emailError ? "outlined-error" : "outlined-basic"}
          label="Email"
          variant="outlined"
          value={emailError ? "" : email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          helperText={emailError ? "Please enter your email" : ""}
        />
        <TextField
          error={usernameError}
          id={usernameError ? "outlined-error" : "outlined-basic"}
          label="Username"
          variant="outlined"
          value={usernameError ? "" : username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError(false);
          }}
          helperText={usernameError ? "Please enter your username" : ""}
        />
        <PasswordInputBar
          error={passwordError}
          label="Password"
          value={passwordError ? "" : password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          errorMessage={passwordError ? "Please enter your password" : ""}
        />
        <PasswordInputBar
          error={confirmPasswordError || !checkConfirmPassword}
          label="Confirm Password"
          value={confirmPasswordError ? "" : confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(false);
            setCheckConfirmPassword(true);
          }}
          errorMessage={
            confirmPasswordError ? "Please enter your password" : !checkConfirmPassword ? "Passwords do not match" : ""
          }
        />
        <CheckboxWithLabel label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </form>
      <form
        id="registerFormGoogle"
        className="d-flex justify-content-between flex-column gap-4 mt-3"
        onSubmit={handleSubmitGoogleAuth}
      >
        <Button className="btn btn-lg btn-google btn-block text-uppercase btn-outline border" type="submit">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google
        </Button>
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
