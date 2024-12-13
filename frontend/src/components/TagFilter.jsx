import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function TagFilter(Props) {
  const handleChange = (event, value) => {
    const tagNames = value.map((option) => option.tagName);
    Props.onChange(tagNames);
  };

  return (
    <div>
      {Props.animatedLabel ? (
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={blogTags}
          getOptionLabel={(option) => option.displayName}
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
            getOptionLabel={(option) => option.displayName}
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
  //tagName dùng để gửi lên server (dễ truy vấn database hơn), displayName dùng để hiển thị trên giao diện
  { tagName: "Art", displayName: "Art" },
  { tagName: "Technology", displayName: "Technology" },
  { tagName: "Programing&Coding", displayName: "Programing & Coding" },
  { tagName: "Design", displayName: "Design" },
  { tagName: "Book", displayName: "Book" },
  { tagName: "Anime&Manga", displayName: "Anime & Manga" },
  { tagName: "SelfDevelopment", displayName: "Self Development" },
  { tagName: "Travel", displayName: "Travel" },
  { tagName: "Music", displayName: "Music" },
  { tagName: "Life", displayName: "Life" },
  { tagName: "entertainment", displayName: "Entertainment" },
  { tagName: "education", displayName: "Education" },
];

export default TagFilter;
