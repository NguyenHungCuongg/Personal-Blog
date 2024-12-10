import TextField from "@mui/material/TextField";

function DocumentInput(Props) {
  const handleChange = (e) => {
    Props.onChange(e.target.value);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <label className="fw-semibold fs-4">{Props.label}</label>
      <TextField
        error={Props.error}
        value={Props.value}
        id="outlined-multiline-static"
        multiline
        rows={10}
        onChange={handleChange}
      />
    </div>
  );
}

export default DocumentInput;
