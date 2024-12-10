import { useState } from "react";
import TextInput from "./TextInput";
import TagFilter from "./TagFilter";
import UploadFile from "./UploadFile";
import DocumentInput from "./DocumentInput";
import Button from "@mui/material/Button";

function CreateBlogForm() {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [topicsError, setTopicsError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const handleSubmit = async (e) => {
    setTitleError(false);
    setTopicsError(false);
    setContentError(false);

    e.preventDefault();
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
          id={titleError ? "outlined-error" : "outlined-basic"}
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
        <Button variant="contained" sx={{ padding: "6px 12px" }} type="submit">
          Create Post
        </Button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
