import Divider from "@mui/material/Divider";
import "bootstrap/dist/css/bootstrap.min.css";

function DeviderLine() {
  return (
    <Divider
      className="my-5"
      sx={{
        borderBottomWidth: "1px",
        borderColor: "#615561",
        borderBottomStyle: "solid",
      }}
    />
  );
}

export default DeviderLine;
