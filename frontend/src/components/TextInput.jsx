import TextField from "@mui/material/TextField";

function TextInput(Props) {
  return (
    <div>
      {Props.animatedLabel ? (
        <TextField
          onChange={Props.onChange}
          id={Props.id}
          error={Props.error}
          helperText={Props.error ? Props.helperText : ""}
          value={Props.value}
          fullWidth
          label={Props.label}
        />
      ) : (
        <div className="d-flex flex-column gap-2">
          <label className="fw-semibold fs-4">{Props.label}</label>
          <TextField
            onChange={Props.onChange}
            id={Props.id}
            helperText={Props.error ? Props.helperText : ""}
            error={Props.error}
            value={Props.value}
            fullWidth
            placeholder={Props.placeholder}
          />
        </div>
      )}
    </div>
  );
}

export default TextInput;
