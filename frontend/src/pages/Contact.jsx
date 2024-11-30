import { assets } from "../assets/assets";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactForm from "../components/Contactform";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div className={"container col-xxl-8 px-4 py-5 my-5"}>
      <div className={`row align-items-center g-5 py-5 ${isSmallScreen ? "text-center" : ""}`}>
        <div className={`col-10 col-sm-8 col-lg-6 ${isSmallScreen ? "mx-auto" : ""}`}>
          <img
            src={assets.contact_img}
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            loading="lazy"
          />
        </div>
        <div className="col-lg-5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
