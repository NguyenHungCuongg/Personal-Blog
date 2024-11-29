import Blogcard from "../components/Blogcard";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogAlbum() {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div className="col">
        <Blogcard />
      </div>
      <div className="col">
        <Blogcard />
      </div>
      <div className="col">
        <Blogcard />
      </div>
      <div className="col">
        <Blogcard />
      </div>
      <div className="col">
        <Blogcard />
      </div>
      <div className="col">
        <Blogcard />
      </div>
    </div>
  );
}

export default BlogAlbum;
