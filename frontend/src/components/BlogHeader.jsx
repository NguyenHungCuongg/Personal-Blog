import useMediaQuery from "@mui/material/useMediaQuery";
import TagsList from "./TagsList";
import ByUser from "../components/ByUser";
import CreateAt from "./CreateAt";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogHeader() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div>
      <h3 className="fs-1 fw-bold">What is Lorem Ipsum?</h3>
      <div className={`d-flex align-items-center ${isSmallScreen ? "flex-column gap-2" : " gap-4"}`}>
        <TagsList />
        <div className="d-flex align-items-center gap-4">
          <ByUser />
          <CreateAt />
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
