import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Pagination from "@mui/material/Pagination";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { convertDateToString } from "../../../backend/src/helpers/convertDateToString";
import axios from "axios";

function CollectionAlbum(Props) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const postPerPage = 12; // Số lượng bài viết hiển thị trên mỗi trang
  const [page, setPage] = useState(1);

  // Tính toán số lượng bài viết hiển thị trên mỗi trang
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mycollection/${Props.type}`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        setOpenSnackbar(true);
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [Props.type]);

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
          const newPost = posts.filter((item) => item.postid !== selectedPost.postid);
          setPosts(newPost);
        }
      } catch (error) {
        setOpenSnackbar(true);
        console.log("Error deleting post", error);
      }
    }
    setOpen(false);
  };

  return (
    <div className="container my-3 py-3">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseError}
      >
        <Alert severity="error">Something went wrong. Please try again later.</Alert>
      </Snackbar>
      <h1 className="mb-4 fw-semibold">{Props.type === "mypost" ? "My Post" : "My Saved Posts"}</h1>
      <hr className="mb-3" />
      <div className="row mb-2">
        {currentPosts.length === 0 ? (
          <div className="container text-center">
            <img src={assets.emptycollection} alt="Empty Collection" style={{ width: "100%" }} />
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {currentPosts.map((post) => (
                <div className="col-md-6 mb-3" key={post.postid}>
                  <div
                    className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative"
                    style={{
                      alignItem: "stretch",
                      flexWrap: "nowrap",
                      display: "flex",
                      height: "100%",
                      minHeight: "250px",
                    }}
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
                    <div
                      id="postModification"
                      className="position-absolute bottom-0 end-0 p-2 d-flex justify-content-end"
                    >
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
              ))}
            </div>

            <Pagination
              className="mt-5 align-self-center"
              count={Math.ceil(posts.length / postPerPage)}
              page={page}
              onChange={handleChangePage}
              color="secondary"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionAlbum;
