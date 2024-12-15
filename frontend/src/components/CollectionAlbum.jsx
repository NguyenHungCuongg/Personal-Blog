import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { convertDateToString } from "../../../backend/src/helpers/convertDateToString";
import axios from "axios";

function CollectionAlbum(Props) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mycollection/${Props.type}`, {
          withCredentials: true,
        });
        setPost(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [Props.type]);

  return (
    <div className="container my-3 py-3">
      <h3>{Props.type === "mypost" ? "My Posts" : "My Saved Posts"}</h3>
      <div className="row mb-2">
        {post.map((post) => (
          <div className="col-md-6 mb-3" key={post.postid}>
            <div
              className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative"
              style={{ alignItem: "stretch", flexWrap: "nowrap" }}
            >
              <div className="col-auto d-none d-lg-block" style={{ height: "250px", width: "200px" }}>
                <Link to={`/blog/${post.postid}`} style={{ textDecoration: "none" }}>
                  <img
                    alt="Banner"
                    className="bd-placeholder-img"
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    src={post.bannerimageurl || assets.defaultthumbnail}
                  />
                </Link>
              </div>
              <div className="col d-flex flex-column position-static p-4 " style={{ height: "100%" }}>
                <strong className="d-inline-block mb-2 text-primary-emphasis">{post.username}</strong>
                <Link to={`/blog/${post.postid}`} style={{ textDecoration: "none" }}>
                  <h3
                    className="mb-0"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>
                <div className="mb-1 text-body-secondary">{convertDateToString(post.postcreatedat)}</div>
                <p
                  className="card-text mb-auto"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                  }}
                >
                  {post.content}
                </p>
              </div>
              <div id="postModification" className="position-absolute bottom-0 end-0 p-2 d-flex justify-content-end">
                <Button color="var(--dark-hover-color)">
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionAlbum;
