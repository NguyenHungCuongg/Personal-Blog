import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { convertDateToString } from "../../../backend/src/helpers/convertDateToString";
import axios from "axios";

function CollectionAlbum(Props) {
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = async (confirm) => {
    if (!selectedPost) return;
    if (confirm) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/mycollection/${Props.type}/delete/${selectedPost.postid}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          const newPost = post.filter((item) => item.postid !== selectedPost.postid);
          setPost(newPost);
        }
      } catch (error) {
        console.log("Error deleting post", error);
      }
    }
    setOpen(false);
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="mb-4 fw-semibold">{Props.type === "mypost" ? "My Post" : "My Saved Posts"}</h1>
      <hr className="mb-3" />
      <div className="row mb-2">
        {post.length === 0 ? (
          <div className="text-center">
            <img src={assets.emptycollection} alt="Empty Collection" style={{ width: "100%" }} />
          </div>
        ) : (
          post.map((post) => (
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
                      className="mb-0 fw-semibold"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        color: "var(--dark-color)",
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
                  <Button color="var(--dark-hover-color)" onClick={() => handleClickOpen(post)}>
                    <DeleteIcon />
                  </Button>
                  <Dialog
                    open={open}
                    onClose={() => handleClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {Props.type === "mypost"
                          ? "This action will delete your post permanently."
                          : "This action will remove the post from your saved list."}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleClose(false)} color="var(--grey-color)">
                        Cancel
                      </Button>
                      <Button onClick={() => handleClose(true)} autoFocus color="error">
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CollectionAlbum;
