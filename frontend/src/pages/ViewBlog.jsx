import BlogHeader from "../components/BlogHeader";
import BannerImage from "../components/BannerImage";
import BlogContent from "../components/BlogContent";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewBlog() {
  return (
    <div
      className="container d-flex flex-column gap-4"
      style={{
        paddingLeft: "3rem",
        paddingRight: "3rem",
        marginTop: "3rem",
        marginBottom: "3rem",
      }}
    >
      <BannerImage />
      <BlogHeader />
      <BlogContent />
    </div>
  );
}

export default ViewBlog;
