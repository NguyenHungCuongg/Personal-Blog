import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";

function TagsList() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Art" variant="outlined" onClick={handleClick} />
      <Chip label="Technology" variant="outlined" onClick={handleClick} />
      <Chip label="Design" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}

export default TagsList;
