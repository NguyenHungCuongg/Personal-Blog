function UploadFile(Props) {
  return (
    <div className="d-flex flex-column gap-2">
      <label className="fw-semibold fs-4">{Props.label}</label>
      <input type="file" />
    </div>
  );
}

export default UploadFile;
