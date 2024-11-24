import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function Navbar() {
  return (
    <header
      id="navBarContainer"
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="fs-3 d-inline-flex link-body-emphasis text-decoration-none" id="navBarLogo">
          cuong<span style={{ color: "var(--main-color)" }}>.blog</span>
        </a>
      </div>

      <ul id="navBarTags" className="gap-4 nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
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
      </ul>

      <div className="col-md-3 text-end">
        <Button variant="contained" size="large" color="primary">
          Login
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
