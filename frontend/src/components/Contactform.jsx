import Button from "@mui/material/Button";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";

function Contactform() {
  return (
    <div className="container rounded-4 shadow p-5 px-5">
      <form id="contactForm" className="d-flex justify-content-between flex-column gap-4">
        <h3 className="fs-3 fw-semibold">GET IN TOUCH</h3>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-multiline-static" label="Message" multiline rows={4} />
        <Button variant="contained">Send</Button>
      </form>
      <div id="contactInfoContainer" className="d-flex flex-column mt-4 gap-2">
        <div className="d-flex align-items-cente gap-2">
          <LocalPhoneOutlinedIcon />
          <p className="mb-0" style={{ fontFamily: "Lato", color: "#615561" }}>
            +84 987647235
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <EmailOutlinedIcon />
          <p className="mb-0" style={{ fontFamily: "Lato", color: "#615561" }}>
            cuonghungnguyentop@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contactform;
