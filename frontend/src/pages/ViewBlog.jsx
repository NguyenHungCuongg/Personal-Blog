import BlogHeader from "../components/BlogHeader";
import BannerImage from "../components/BannerImage";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewBlog() {
  return (
    <div className="container d-flex flex-column gap-4">
      <BannerImage />
      <BlogHeader />
    </div>
  );
}

export default ViewBlog;
