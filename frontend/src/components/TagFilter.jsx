import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function TagFilter() {
  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={blogTags}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label="Topics" placeholder="Add more filters" />}
      sx={{ maxWidth: "auto" }}
    />
  );
}

const blogTags = [
  { title: "Art" },
  { title: "Technology" },
  { title: "Programming & Coding" },
  { title: "Design" },
  { title: "Book" },
  { title: "Anime & Manga" },
  { title: "Self-development" },
  { title: "Travel" },
];

export default TagFilter;
