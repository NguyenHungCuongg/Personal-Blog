import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateAt() {
  return (
    <div
      className="d-flex align-items-center align-middle"
      style={{ fontFamily: "var(--content-font)", color: "var(--dark-hover-color)" }}
    >
      <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
      Sep 29th, 2024, 07:24
    </div>
  );
}

export default CreateAt;
