import TextField from "@mui/material/TextField";

function TextInput(Props) {
  return (
    <div>
      {Props.animatedLabel ? (
        <TextField fullWidth id="fullWidth" label={Props.label} />
      ) : (
        <div className="d-flex flex-column gap-2">
          <label className="fw-semibold fs-4">{Props.label}</label>
          <TextField fullWidth id="fullWidth" placeholder={Props.placeholder} />
        </div>
      )}
    </div>
  );
}

export default TextInput;
