import * as React from "react";
import Button from "@mui/material/Button";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function Navbar() {
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
      <div className="col-md-3 mb-2 mb-md-0">
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

      <div className="col-md-3 text-end d-flex gap-2">
        <Button variant="outlined" size="large" color="primary" href="/createblog">
          New Post
          <AddOutlinedIcon />
        </Button>
        <Button variant="contained" size="large" color="primary" href="/login">
          Login
          <LoginOutlinedIcon />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
