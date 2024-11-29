import BlogAlbum from "../components/BlogAlbum";
import TagFilter from "../components/TagFilter";
import DeviderLine from "../components/DeviderLine";
import SearchBar from "../components/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import "bootstrap/dist/css/bootstrap.min.css";

function Blog() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div className="container">
      <div id="blogSearchSection" className={`d-flex row ${isSmallScreen ? "flex-column gap-2" : ""}`}>
        <div className={`${isSmallScreen ? "" : "col-8"}`}>
          <SearchBar />
        </div>
        <div className={`${isSmallScreen ? "" : "col-4"}`}>
          <TagFilter />
        </div>
      </div>
      <DeviderLine />
      <BlogAlbum />
    </div>
  );
}

export default Blog;
