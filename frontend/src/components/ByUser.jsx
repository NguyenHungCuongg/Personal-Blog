import "bootstrap/dist/css/bootstrap.min.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
function ByUser() {
  return (
    <div
      className="d-flex align-items-center align-middle"
      style={{ fontFamily: "var(--content-font)", color: "var(--dark-hover-color)" }}
    >
      By
      <PersonOutlineOutlinedIcon />
      Nguyen Hung Cuong
    </div>
  );
}

export default ByUser;
