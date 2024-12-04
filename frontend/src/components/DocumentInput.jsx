import TextField from "@mui/material/TextField";

function DocumentInput(Props) {
  return (
    <div className="d-flex flex-column gap-2">
      <label className="fw-semibold fs-4">{Props.label}</label>
      <TextField id="outlined-multiline-static" multiline rows={10} />
    </div>
  );
}

export default DocumentInput;
