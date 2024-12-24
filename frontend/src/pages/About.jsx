import PersonalInfoCard from "../components/PersonalInfoCard";
import ServiceInfoCard from "../components/ServiceInfoCard";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import useMediaQuery from "@mui/material/useMediaQuery";

const educationalInfo = ["University Of Information Technology", "Tp.HCM", "2022"];

const skillInfo = ["Front-end: ReactJS", "Back-end: NodeJS, PostgreSQL, ExpressJS", "Design: Photoshop, Figma"];

const services = [
  {
    title: "Web Development",
    info: "Creating high-quality, responsive, and modern websites tailored to meet your specific needs. Whether it's an e-commerce platform, portfolio, or business site, I deliver solutions that are both functional and visually appealing.",
  },
  {
    title: "UX/UI Design",
    info: "Designing intuitive and user-friendly interfaces that enhance the user experience. My focus is on creating clean, professional designs that prioritize usability and align with your brand identity.",
  },
  {
    title: "Book Cover Design",
    info: "Designing eye-catching book covers that captivate readers and bring your vision to life. From typography to imagery, I ensure your book stands out in the marketplace.",
  },
];

const About = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div className={"container py-5"}>
      <div id="myselfSection" className="container text-center px-4 py-4 my-5">
        <p className="py-0 my-0 fw-medium fs-3" style={{ color: "var(--dark-hover-color)" }}>
          About
        </p>
        <h2 className="fw-bolder display-4">Myself</h2>
        Update Later
      </div>
      <hr />
      <div id="serviceSection" className="container text-center px-4 py-4 my-5">
        <p className="py-0 my-0 fw-medium fs-3" style={{ color: "var(--dark-hover-color)" }}>
          About
        </p>
        <h2 className="fw-bolder display-4">Best Services</h2>
        <div className={isSmallScreen ? `g-5 row py-5 d-flex flex-column gap-3` : `row g-5 py-5`}>
          {services.map((service, index) => (
            <div key={index} className={isSmallScreen ? `col-12 px-2` : `col-4 px-2`}>
              <ServiceInfoCard title={service.title} info={service.info} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div id="experienceSection" className="container text-center px-4 py-4 my-5">
        <p className="py-0 my-0 fw-medium fs-3" style={{ color: "var(--dark-hover-color)" }}>
          About
        </p>
        <h2 className="fw-bolder display-4">My Experience</h2>
        <div className="row align-items-center g-5 py-5">
          <div className={isSmallScreen ? `col-12` : `col-4`}>This is my profile image (update later)</div>
          <div className={isSmallScreen ? `col-12 row py-5 d-flex flex-column` : `col-8 row py-5`}>
            <div className={isSmallScreen ? `col-12 px-2` : `col-6 px-2`}>
              <PersonalInfoCard title="Education" info={educationalInfo} />
            </div>
            <div className={isSmallScreen ? `col-12 px-2` : `col-6 px-2`}>
              <PersonalInfoCard title="Skills" info={skillInfo} />
            </div>
            <div className="col-12 px-2 py-4 d-flex justify-content-center gap-3">
              <a
                href="https://github.com/NguyenHungCuongg"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <GitHubIcon style={{ fontSize: "2rem" }} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100068778787200"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FacebookIcon style={{ fontSize: "2rem" }} />
              </a>
              <a
                href="https://www.youtube.com/@cuongnguyen38535"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <YouTubeIcon style={{ fontSize: "2rem" }} />
              </a>
              <a
                href="https://x.com/Whisper30554598"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <XIcon style={{ fontSize: "2rem" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
