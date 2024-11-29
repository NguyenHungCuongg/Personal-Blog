import LogoText from "../components/LogoText";

function HeaderText(Props) {
  return (
    <div className={`${Props.containerClass ? Props.containerClass : ""}`} style={Props.containerStyle}>
      <h1 className={`${Props.titleClass ? Props.titleClass : ""}`} style={Props.titleStyle}>
        {Props.title}
        {Props.logo && <LogoText />}
      </h1>
      <p className={`lead ${Props.descriptionClass ? Props.descriptionClass : ""}`} style={Props.descriptionStyle}>
        {Props.description}
      </p>
    </div>
  );
}

export default HeaderText;
