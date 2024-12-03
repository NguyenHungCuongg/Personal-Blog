import TextField from "@mui/material/TextField";

function TextInput(Props) {
  return (
    <div>
      <label>{Props.label}</label>
      <TextField fullWidth id="fullWidth" />
    </div>
  );
}

export default TextInput;
