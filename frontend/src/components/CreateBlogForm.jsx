import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import TagFilter from "./TagFilter";
import UploadFile from "./UploadFile";
import DocumentInput from "./DocumentInput";
import axios from "axios";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext";

function CreateBlogForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [topicsError, setTopicsError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submitting post");
    e.preventDefault();
    setTitleError(false);
    setTopicsError(false);
    setContentError(false);
    console.log(title);
    console.log(topics);
    console.log(content);
    console.log(user);
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
    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        {
          title: title,
          topics: topics,
          content: content,
          user: user,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log(response.data.message);
        navigate("/blog");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error submitting post:", error);
    }
  };

  return (
    <div className="container d-flex p-3 px-5">
      <form
        id="createBlogForm"
        className="container d-flex flex-column gap-4 rounded shadow-sm px-5 py-5"
        style={{ border: "solid 2px var(--main-color)" }}
        onSubmit={handleSubmit}
      >
        <h1 className="fw-bold pt-2">Create Blog Post</h1>
        <TextInput
          error={titleError}
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
          animatedLabel={false}
          label="Topics"
          placeholder="Add post topics"
          value={topicsError ? [] : topics}
          onChange={(value) => {
            setTopics(value);
            setTopicsError(false);
          }}
        />
        <UploadFile label="Banner Image" />
        <DocumentInput
          label="Content"
          error={contentError}
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
