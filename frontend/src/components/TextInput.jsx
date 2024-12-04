import TextField from "@mui/material/TextField";

function TextInput(Props) {
  return (
    <div>
      {Props.animatedLabel ? (
        <TextField fullWidth id="fullWidth" label={Props.label} />
      ) : (
        <div>
          <label>{Props.label}</label>
          <TextField fullWidth id="fullWidth" />
        </div>
      )}
    </div>
  );
}

export default TextInput;
