import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogAlbum from "../components/BlogAlbum";
import TagFilter from "../components/TagFilter";
import DeviderLine from "../components/DeviderLine";
import SearchBar from "../components/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderText from "../components/HeaderText";

function Blog() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.topic) {
      setTopics([location.state.topic]);
    }
  }, [location.state]);

  return (
    <div className="container mt-5" style={{ paddingBottom: "100px" }}>
      <div id="blogHeaderSection" className="py-5">
        <HeaderText
          title={
            <>
              <span style={{ color: "#8f2eb6" }}>Blog</span> Discovery
            </>
          }
          description="Explore an eclectic mix of topics, from art and design to technology and travel. My blogs promise something intriguing for everyone."
          containerClass="d-flex flex-column text-center py-5 my-5"
          containerStyle={isSmallScreen ? {} : { paddingLeft: "200px", paddingRight: "200px" }}
          titleClass="display-1 fw-bold text-body-emphasis lh-1 mb-3"
        />
      </div>
      <div
        id="blogSearchSection"
        className={`d-flex row align-items-center ${isSmallScreen ? "flex-column gap-2" : ""}`}
      >
        <div className={`${isSmallScreen ? "" : "col-8"}`}>
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
        </div>
        <div className={`${isSmallScreen ? "" : "col-4"}`}>
          <TagFilter
            animatedLabel={true}
            placeholder="Add more filters"
            value={topics}
            onChange={(value) => {
              setTopics(value);
            }}
          />
        </div>
      </div>
      <DeviderLine />
      <div className="py-5">
        <BlogAlbum search={search} topics={topics} />
      </div>
    </div>
  );
}

export default Blog;
