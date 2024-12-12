import { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const UploadFile = forwardRef((Props, ref) => {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (file === null) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await axios.post("http://localhost:3000/api/upload", formData);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <label className="fw-semibold fs-4">{Props.label}</label>
      <input type="file" onChange={handleChange} />
    </div>
  );
});

UploadFile.displayName = "UploadFile";

export default UploadFile;
