import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

function ServiceInfoCard(Props) {
  return (
    <div className="container d-flex gap-2 justify-content-center px-5">
      <div id="iconSection">
        {Props.title === "Web Development" ? (
          <PublicOutlinedIcon style={{ fontSize: "3rem", color: "var(--main-color)" }} />
        ) : Props.title === "UX/UI Design" ? (
          <PermMediaOutlinedIcon style={{ fontSize: "3rem", color: "var(--main-color)" }} />
        ) : Props.title === "Book Cover Design" ? (
          <MenuBookOutlinedIcon style={{ fontSize: "3rem", color: "var(--main-color)" }} />
        ) : null}
      </div>
      <div id="textSection" className="text-start">
        <h5 style={{ color: "var(--dark-color)", fontWeight: "600" }}>{Props.title}</h5>
        <p style={{ color: "var(--dark-hover-color)", fontFamily: "Lato" }}>{Props.info}</p>
      </div>
    </div>
  );
}

export default ServiceInfoCard;
