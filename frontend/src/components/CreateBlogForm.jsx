import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import TagFilter from "./TagFilter";
import UploadFile from "./UploadFile";
import DocumentInput from "./DocumentInput";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext";

function CreateBlogForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Please try again later.");

  const [titleError, setTitleError] = useState(false);
  const [topicsError, setTopicsError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const fileInput = useRef(null);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setTopicsError(false);
    setContentError(false);

    //Kiểm tra xem các giá trị có hợp lệ không (có trống hay không)
    if (title.trim() === "") {
      setTitleError(true);
    }
    if (topics.length === 0) {
      setTopicsError(true);
    }
    if (content.trim() === "") {
      setContentError(true);
    }
    if (title.trim() === "" || topics.length === 0 || content.trim() === "") {
      return;
    }

    let uploadedBannerImageUrl = "";
    if (fileInput.current) {
      const uploadResponse = await fileInput.current.handleUpload();
      if (uploadResponse?.fileUrl) {
        uploadedBannerImageUrl = uploadResponse.fileUrl; // Lưu giá trị trực tiếp vào biến tạm thời
      } else {
        setErrorMessage("An error occurred while uploading the banner image. Please try again.");
        setOpenSnackbar(true);
        return;
      }
    }

    try {
      console.log("Gia tri cua banner Image URL truoc khi duoc truyen vao API:", uploadedBannerImageUrl);
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        {
          title: title,
          topics: topics,
          content: content,
          user: user,
          bannerImageUrl: uploadedBannerImageUrl,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log(response.data.message);
        navigate("/blog");
      } else {
        setOpenSnackbar(true);
        console.log(response.data.message);
      }
    } catch (error) {
      setOpenSnackbar(true);
      console.log("Error submitting post:", error);
    }
  };

  return (
    <div className="container d-flex p-3 px-5">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseError}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <form
        id="createBlogForm"
        className="container d-flex flex-column gap-4 rounded shadow-sm px-5 py-5"
        style={{ border: "solid 2px var(--main-color)" }}
        onSubmit={handleSubmit}
      >
        <h1 className="fw-bold pt-2">Create Blog Post</h1>
        <TextInput
          error={titleError}
          helperText="Please enter a title"
          id={titleError ? "outlined-error fullWidth" : "outlined-basic fullWidth"}
          label="Title"
          animatedLabel={false}
          placeholder="Enter post title"
          value={titleError ? "" : title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
        />
        <TagFilter
          error={topicsError}
          animatedLabel={false}
          label="Topics"
          placeholder="Add post topics"
          value={topicsError ? [] : topics}
          onChange={(value) => {
            setTopics(value);
            setTopicsError(false);
          }}
        />
        <UploadFile label="Banner Image" ref={fileInput} />
        <DocumentInput
          label="Content"
          error={contentError}
          helperText="Please enter content"
          value={contentError ? "" : content}
          onChange={(value) => {
            setContent(value);
            setContentError(false);
          }}
        />
        <hr />
        <Button variant="contained" type="submit" sx={{ padding: "6px 12px" }}>
          Create Post
        </Button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
