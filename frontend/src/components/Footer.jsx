import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <div id="footerContainer">
      <footer className="py-5 container">
        <div className="row">
          <div id="footerContent" className="col-6 col-md-2 mb-3">
            <h5>Navigation Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/blog" className="nav-link p-0 text-body-secondary">
                  Blog
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/about" className="nav-link p-0 text-body-secondary">
                  About me
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/contact" className="nav-link p-0 text-body-secondary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Legal Information</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Privacy Policy
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Terms of Service
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Resources</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Help Center
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Technologies used
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label className="visually-hidden">Email address</label>
                <TextField id="standard-basic" label="Email address" variant="standard" />
                <Button variant="contained" size="large" color="primary">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </footer>
      <div
        id="bottomOfFooter"
        className="d-flex flex-column flex-sm-row justify-content-between px-5 py-4 mt-4 border-top"
      >
        <p>© 2024 Company, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex gap-3">
          <li className="ms-3">
            <a href="https://github.com/NguyenHungCuongg" target="_blank">
              <GitHubIcon />
            </a>
          </li>
          <li className="ms-3">
            <a href="https://x.com/Whisper30554598" target="_blank">
              <XIcon />
            </a>
          </li>
          <li className="ms-3">
            <a href="https://www.facebook.com/profile.php?id=100068778787200" target="_blank">
              <FacebookIcon />
            </a>
          </li>
          <li className="ms-3">
            <a href="https://www.youtube.com/@cuongnguyen38535" target="_blank">
              <YouTubeIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
