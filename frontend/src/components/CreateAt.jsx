import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

function CreateAt(Props) {
  return (
    <div
      className="d-flex align-items-center align-middle"
      style={{ fontFamily: "var(--content-font)", color: "var(--dark-hover-color)" }}
    >
      <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
      {Props.createAt}
    </div>
  );
}

export default CreateAt;
