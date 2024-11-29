import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

function SearchBar() {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Search</InputLabel>
      <OutlinedInput
        label="Search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default SearchBar;
