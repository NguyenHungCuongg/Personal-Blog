import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
function ByUser(Props) {
  return (
    <div
      className="d-flex align-items-center align-middle"
      style={{ fontFamily: "var(--content-font)", color: "var(--dark-hover-color)" }}
    >
      By
      <PersonOutlineOutlinedIcon />
      {Props.username}
    </div>
  );
}

export default ByUser;
