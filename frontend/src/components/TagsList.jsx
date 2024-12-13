import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";

function TagsList(Props) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={1}>
      {Props.topics.map((topic) => (
        <Chip key={topic} label={topic} variant="outlined" onClick={handleClick} />
      ))}
    </Stack>
  );
}

export default TagsList;
