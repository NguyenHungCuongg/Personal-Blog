import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordInputBar from "./PasswordInputBar";
import CheckboxWithLabel from "./CheckboxWithLabel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: email,
        username: username,
        password: password,
        rememberMe: rememberMe,
      });
      console.log("User registered:", response.data);
    } catch (err) {
      console.log("Error registering user:", err);
    }
  };
  return (
    <div className="container rounded-4 shadow p-5 px-5" style={{ maxWidth: "480px" }}>
      <form id="loginForm" className="d-flex justify-content-between flex-column gap-4" onSubmit={handleSubmit}>
        <AccountCircleOutlinedIcon style={{ fontSize: "5rem", color: "var(--main-color)", margin: "auto" }} />
        <h3 className="fs-1 fw-bold text-center">Register</h3>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInputBar label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordInputBar
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <CheckboxWithLabel label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <Button variant="contained" type="submit">
          Register
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
