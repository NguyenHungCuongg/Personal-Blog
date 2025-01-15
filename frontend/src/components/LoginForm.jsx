import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GeneralSnackBar from "./GeneralSnackBar";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const { setAuthState } = useContext(AuthContext);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.search.includes("error=email-used")) {
      setErrorMessage("Email has already been used");
      setOpenSnackBar(true);
    } else if (location.search.includes("error=cannot-signin")) {
      setErrorMessage("Cannot sign in using Google");
      setOpenSnackBar(true);
    }
  }, [location]);

  const handleSubmitGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      window.location.href = "http://localhost:3000/api/auth/google";
    } catch (err) {
      console.log("Error logining user:", err);
      setErrorMessage("An error occurred while signing up. Please try again.");
      setOpenSnackBar(true);
    }
  };

  const handleSubmit = async (e) => {
    setEmailError(false);
    setPasswordError(false);
    setOpenSnackBar(false);
    setErrorMessage("");

    e.preventDefault();
    //Trường hợp nếu email hoặc password không được nhập
    if (email.trim() === "") {
      setEmailError(true);
    }
    if (password.trim() === "") {
      setPasswordError(true);
    }
    if (email.trim() === "" || password.trim() === "") {
      return;
    }
    //Trường hợp nếu các input hợp lệ
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          email: email,
          password: password,
          rememberMe: rememberMe,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
          justLoggedIn: true,
        }));
        navigate("/"); // Redirect to home page
      } else {
        setErrorMessage(response.data.error);
        setOpenSnackBar(true);
        if (response.data.error === "User not found") {
          setEmailError(true);
        } else {
          setPasswordError(true);
        }
      }
    } catch (err) {
      console.log("Error logging in user:", err);
      setErrorMessage("An error occurred while logging in. Please try again.");
      setOpenSnackBar(true);
    }
  };

  return (
    <div className="container rounded-4 shadow p-5 px-5" style={{ maxWidth: "480px" }}>
      <GeneralSnackBar open={openSnackBar} errorMessage={errorMessage} onClose={() => setOpenSnackBar(false)} />
      <form id="loginForm" className="d-flex justify-content-between flex-column gap-4" onSubmit={handleSubmit}>
        <AccountCircleOutlinedIcon style={{ fontSize: "5rem", color: "var(--main-color)", margin: "auto" }} />
        <h3 className="fs-1 fw-bold text-center">Login</h3>
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
        <CheckboxWithLabel label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <form
        id="loginFormGoogle"
        className="d-flex justify-content-between flex-column gap-4 mt-3"
        onSubmit={handleSubmitGoogleAuth}
      >
        <Button className="btn btn-lg btn-google btn-block text-uppercase btn-outline border" type="submit">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google
        </Button>
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
