import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

function CheckboxWithLabel(Props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
      <label>{Props.label}</label>
    </div>
  );
}

export default CheckboxWithLabel;
