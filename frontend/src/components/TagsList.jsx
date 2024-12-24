import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function TagsList(Props) {
  const navigate = useNavigate();

  const handleClick = (topic) => {
    navigate("/blog", { state: { topic: topic } }); //Chuyển hướng đến trang blog với topic được chọn
  };

  return (
    <Stack direction="row" spacing={1}>
      {Props.topics.map((topic) => (
        <Chip key={topic} label={topic} variant="outlined" onClick={() => handleClick(topic)} />
      ))}
    </Stack>
  );
}

export default TagsList;
