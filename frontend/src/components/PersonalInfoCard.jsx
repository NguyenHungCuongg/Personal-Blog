import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

function PersonalInfoCard(Props) {
  return (
    <div
      className="container f-flex flex-column text-center py-4"
      style={{ minHeight: "160px", border: "1.6px solid var(--dark-hover-color)", borderRadius: "20px" }}
    >
      <div id="iconSection" className="container">
        {Props.title === "Education" ? (
          <SchoolOutlinedIcon style={{ fontSize: "2rem" }} />
        ) : Props.title === "Skills" ? (
          <WorkspacePremiumOutlinedIcon style={{ fontSize: "2rem" }} />
        ) : null}
      </div>
      <h5 id="titleSection" style={{ color: "var(--dark-color)", fontWeight: "600" }}>
        {Props.title}
      </h5>
      <div id="contentSection" style={{ color: "var(--dark-hover-color)", fontFamily: "Lato" }}>
        {Props.info ? (
          <ul className="list-unstyled">
            {Props.info.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Update later...</p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfoCard;
