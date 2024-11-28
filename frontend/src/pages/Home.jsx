import useMediaQuery from "@mui/material/useMediaQuery";
import { assets } from "../assets/assets";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <div className="container col-xxl-8 px-4 py-5 my-5">
      <div className={`row flex-lg-row-reverse align-items-center g-5 py-5 ${isSmallScreen ? "text-center" : ""}`}>
        <div className={`col-10 col-sm-8 col-lg-5 ${isSmallScreen ? "mx-auto" : ""}`}>
          <img
            src={assets.homepage_img}
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            loading="lazy"
          />
        </div>
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Welcome to my homepage
            <br />
            cuong<span style={{ color: "var(--main-color)" }}>.blog</span>
          </h1>
          <p className="lead">
            Hi, I&apos;m Cuong! Welcome to my personal blog where I share my thoughts and experiences on manga, art,
            music, technology, and more. Stay tuned for insightful articles and updates.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Button variant="contained" size="large" color="primary">
              Discover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
