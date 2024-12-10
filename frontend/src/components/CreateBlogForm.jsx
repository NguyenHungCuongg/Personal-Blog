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
    e.preventDefault();
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
          onChange={(event, value) => {
            setTopics(event, value);
            setTopicsError(false);
          }}
        />
        <UploadFile label="Banner Image" />
        <DocumentInput
          label="Content"
          error={titleError}
          value={contentError ? "" : content}
          onChange={(e) => {
            setContent(e.target.value);
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
