import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function GeneralSnackBar(Props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      Props.onClose();
      return;
    }
    Props.onClose();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        open={Props.open}
        onClose={handleClose}
        key={"top" + "center"}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%", textAlign: "center" }}>
          {Props.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default GeneralSnackBar;
