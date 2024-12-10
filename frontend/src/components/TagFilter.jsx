import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function TagFilter(Props) {
  const handleChange = (event, value) => {
    Props.onChange(value);
  };

  return (
    <div>
      {Props.animatedLabel ? (
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={blogTags}
          getOptionLabel={(option) => option.tagName}
          renderInput={(params) => <TextField {...params} label="Topics" placeholder="Add more filters" />}
          sx={{ maxWidth: "auto" }}
          onChange={handleChange}
        />
      ) : (
        <div className="d-flex flex-column gap-2">
          <label className="fw-semibold fs-4">{Props.label}</label>
          <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={blogTags}
            getOptionLabel={(option) => option.tagName}
            renderInput={(params) => <TextField {...params} placeholder={Props.placeholder} />}
            sx={{ maxWidth: "auto" }}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

const blogTags = [
  { tagName: "Art" },
  { tagName: "Technology" },
  { tagName: "Programming & Coding" },
  { tagName: "Design" },
  { tagName: "Book" },
  { tagName: "Anime & Manga" },
  { tagName: "Self-development" },
  { tagName: "Travel" },
];

export default TagFilter;
