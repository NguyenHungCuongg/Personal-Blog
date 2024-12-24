import Divider from "@mui/material/Divider";

function DeviderLine() {
  return (
    <Divider
      className="my-5"
      sx={{
        borderBottomWidth: "1px",
        borderColor: "var(--dark-hover-color)",
        borderBottomStyle: "solid",
      }}
    />
  );
}

export default DeviderLine;
