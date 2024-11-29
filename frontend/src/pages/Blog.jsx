import BlogAlbum from "../components/BlogAlbum";
import TagFilter from "../components/TagFilter";
import DeviderLine from "../components/DeviderLine";
import SearchBar from "../components/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderText from "../components/HeaderText";
import "bootstrap/dist/css/bootstrap.min.css";

function Blog() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div className="container my-5">
      <div id="blogHeaderSection">
        <HeaderText
          title="Blog Page"
          description="Explore an eclectic mix of topics, from art and design to technology and travel. My blogs promise something intriguing for everyone."
          containerClass="d-flex flex-column text-center py-5 my-5"
          containerStyle={isSmallScreen ? {} : { paddingLeft: "200px", paddingRight: "200px" }}
          titleClass="display-1 fw-bold text-body-emphasis lh-1 mb-3"
        />
      </div>
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
