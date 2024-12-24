import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import BlogHeader from "../components/BlogHeader";
import BannerImage from "../components/BannerImage";
import BlogContent from "../components/BlogContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

function ViewBlog() {
  const { postId } = useParams(); //truy xuat postID tu URL động bên Routes của App.jsx
  const [post, setPost] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log("Error fetching post", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="loader-container">
        <PuffLoader color={"var(--main-color)"} loading={true} size={150} speedMultiplier={1} />
      </div>
    );
  }

  //vì giá trị của post.postcreatedate trong database là một Object Date() nên cần chuyển đổi nó sang dạng string
  const formattedDate = format(new Date(post.postcreatedat), "MM/dd/yyyy");

  return (
    <div
      className="container d-flex flex-column gap-4"
      style={{
        paddingLeft: "3rem",
        paddingRight: "3rem",
        marginTop: "3rem",
        marginBottom: "3rem",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseError}
      >
        <Alert severity="error">Something went wrong. Please try again later.</Alert>
      </Snackbar>
      <BannerImage bannerImageUrl={post.bannerimageurl} />
      <BlogHeader title={post.title} topics={post.topics} createAt={formattedDate} username={post.username} />
      <BlogContent content={post.content} />
    </div>
  );
}

export default ViewBlog;
