import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function TagFilter(Props) {
  return (
    <div>
      {Props.animatedLabel ? (
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={blogTags}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Topics" placeholder="Add more filters" />}
          sx={{ maxWidth: "auto" }}
        />
      ) : (
        <div>
          <label>{Props.label}</label>
          <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={blogTags}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} placeholder="Add more filters" />}
            sx={{ maxWidth: "auto" }}
          />
        </div>
      )}
    </div>
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
