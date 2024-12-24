import useMediaQuery from "@mui/material/useMediaQuery";
import TagsList from "./TagsList";
import ByUser from "../components/ByUser";
import CreateAt from "./CreateAt";

function BlogHeader(Props) {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div>
      <h3 className="fs-1 fw-bold">{Props.title}</h3>
      <div className={`d-flex align-items-center ${isSmallScreen ? "flex-column gap-2" : " gap-4"}`}>
        <TagsList topics={Props.topics} />
        <div className="d-flex align-items-center gap-4">
          <ByUser username={Props.username} />
          <CreateAt createAt={Props.createAt} />
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
