function CollectionAlbum() {
  return (
    <div className="row mb-2">
      <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
          <div className="col-auto d-none d-lg-block">
            <svg
              className="bd-placeholder-img"
              width="200"
              height="250"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                This is banner
              </text>
            </svg>
          </div>
          <div className="col d-flex flex-column position-static p-4">
            <strong className="d-inline-block mb-2 text-primary-emphasis">I dont know</strong>
            <h3 className="mb-0">This is title</h3>
            <div className="mb-1 text-body-secondary">This is date</div>
            <p className="card-text mb-auto">Description</p>
            <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
              delete post
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
          <div className="col-auto d-none d-lg-block">
            <svg
              className="bd-placeholder-img"
              width="200"
              height="250"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                This is banner
              </text>
            </svg>
          </div>
          <div className="col d-flex flex-column position-static p-4">
            <strong className="d-inline-block mb-2 text-primary-emphasis">I dont know</strong>
            <h3 className="mb-0">This is title</h3>
            <div className="mb-1 text-body-secondary">This is date</div>
            <p className="card-text mb-auto">Description</p>
            <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
              delete post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionAlbum;
