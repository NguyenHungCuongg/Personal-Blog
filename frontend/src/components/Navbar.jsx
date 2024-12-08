import * as React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Avatar from "@mui/material/Avatar";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const settings = ["Logout"];

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, setAuthState } = React.useContext(AuthContext); //isAuthenticated, user, loading là ...authState (các giá trị của authState)
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = async () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", { withCredentials: true });
      if (response.data.success) {
        setAuthState({ isAuthenticated: false, user: null, loading: false });
        navigate("/");
      }
    } catch (err) {
      console.log("Error logging out user:", err);
    }
    setAnchorElUser(null);
  };

  const [checked, setChecked] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  React.useEffect(() => {
    if (!isSmallScreen) {
      setChecked(false);
    }
  }, [isSmallScreen]);
  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  //Nếu đang xác thực thì không component nào được render
  if (loading) {
    return null;
  }

  console.log("Navbar state:", { isAuthenticated, loading }); //debugging log
  return (
    <header
      id="navBarContainer"
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      {isSmallScreen && (
        <Button onClick={handleClick} id="menuButton" variant="text">
          <MenuIcon />
        </Button>
      )}
      <div id="navBarLogoContainer" className="col-md-3 mb-2 mb-md-0">
        <a
          href="/"
          className="fs-3 d-inline-flex link-body-emphasis text-decoration-none align-items-center"
          id="navBarLogo"
        >
          <DriveFileRenameOutlineOutlinedIcon />
          cuong<span style={{ color: "var(--main-color)" }}>.blog</span>
        </a>
      </div>
      <ul
        id="navBarTags"
        className={`gap-4 nav col-12 col-md-auto mb-2 justify-content-center text-center mb-md-0 ${
          isSmallScreen ? "" : "always-visible"
        }`}
      >
        {isSmallScreen ? (
          <Collapse in={checked}>
            <li>
              <a href="/" className="nav-link px-2">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" className="nav-link px-2">
                Blog
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link px-2">
                About Me
              </a>
            </li>
            <li>
              <a href="/contact" className="nav-link px-2">
                Contact
              </a>
            </li>
            <div id="navBarButtons" className="col-md-3 text-end d-flex gap-2">
              {isAuthenticated ? (
                <div className="d-flex gap-2 flex-column">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
                    <Avatar sx={{ bgcolor: "var(--main-color)" }}>{user.username[0]}</Avatar>
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography onClick={handleLogout} sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  <Button variant="outlined" size="large" color="primary" href="/createblog">
                    New Post
                    <AddOutlinedIcon />
                  </Button>
                </div>
              ) : (
                <Button variant="contained" size="large" color="primary" href="/login">
                  Login
                  <LoginOutlinedIcon />
                </Button>
              )}
            </div>
          </Collapse>
        ) : (
          <>
            <li>
              <a href="/" className="nav-link px-2">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" className="nav-link px-2">
                Blog
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link px-2">
                About Me
              </a>
            </li>
            <li>
              <a href="/contact" className="nav-link px-2">
                Contact
              </a>
            </li>
          </>
        )}
      </ul>
      {!isSmallScreen && (
        <div id="navBarButtons" className="col-md-3 text-end d-flex gap-2 justify-content-end">
          {isAuthenticated ? (
            <div className="d-flex gap-2">
              <Button variant="outlined" size="large" color="primary" href="/createblog">
                New Post
                <AddOutlinedIcon />
              </Button>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "var(--main-color)" }}>{user.username[0]}</Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogout} sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ) : (
            <Button variant="contained" size="large" color="primary" href="/login">
              Login
              <LoginOutlinedIcon />
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
