import LogoText from "../components/LogoText";

function HeaderText(Props) {
  return (
    <div className={`${Props.containerClass ? Props.containerClass : ""}`}>
      <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
        {Props.title}
        {Props.logo && <LogoText />}
      </h1>
      <p className="lead">{Props.description}</p>
    </div>
  );
}

export default HeaderText;
