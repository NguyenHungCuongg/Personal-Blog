import TagsList from "./TagsList";
import ByUser from "../components/ByUser";
import CreateAt from "./CreateAt";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogHeader() {
  return (
    <div>
      <h3 className="fs-1 fw-bold">What is Lorem Ipsum?</h3>
      <div className="d-flex align-items-center gap-4">
        <TagsList />
        <ByUser />
        <CreateAt />
      </div>
    </div>
  );
}

export default BlogHeader;
