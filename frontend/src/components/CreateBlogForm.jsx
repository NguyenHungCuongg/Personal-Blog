import TextInput from "./TextInput";
import TagFilter from "./TagFilter";
import UploadFile from "./UploadFile";
import DocumentInput from "./DocumentInput";
import Button from "@mui/material/Button";

function CreateBlogForm() {
  return (
    <div
      className="container d-flex flex-column gap-4 rounded shadow-sm px-5 py-5"
      style={{ border: "solid 2px var(--main-color)" }}
    >
      <h1 className="fw-bold pt-2">Create Blog Post</h1>
      <TextInput label="Title" animatedLabel={false} placeholder="Enter post title" />
      <TagFilter animatedLabel={false} label="Topics" placeholder="Add post topics" />
      <UploadFile label="Banner Image" />
      <DocumentInput label="Content" />
      <hr />
      <Button variant="contained" sx={{ padding: "6px 12px" }}>
        Create Post
      </Button>
    </div>
  );
}

export default CreateBlogForm;
