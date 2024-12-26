import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Blogcard from "../components/Blogcard";
import Pagination from "@mui/material/Pagination";

function BlogAlbum(Props) {
  const [posts, setPosts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const search = Props.search;
  const topics = Props.topics;
  const postPerPage = 9; // Số lượng bài viết hiển thị trên mỗi trang
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts", {
          params: { search, topics },
        });
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [search, topics]); //Chỉ chạy khi search hoặc topics thay đổi

  // Tính toán số lượng bài viết hiển thị trên mỗi trang
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return currentPosts.length === 0 ? (
    <div className="container text-center">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseError}
      >
        <Alert severity="error">Something went wrong. Please try again later.</Alert>
      </Snackbar>
      <img src={assets.emptycollection} alt="Empty Collection" style={{ width: "100%" }} />
    </div>
  ) : (
    <div className="d-flex flex-column gap-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseError}
        >
          <Alert severity="error">Something went wrong. Please try again later.</Alert>
        </Snackbar>
        {currentPosts.map((post) => (
          <div className="col" key={post.postid}>
            <Blogcard post={post} />
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
  );
}

export default BlogAlbum;
