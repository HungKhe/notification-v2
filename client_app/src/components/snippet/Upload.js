import React, { useRef, useState } from "react";
import { Form, Alert } from "react-bootstrap";
function Upload(props) {
  let [error, setError] = useState(false);
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const { label, renderFile, imgUrl } = props;
  let [imageUrl, setImageUrl] = useState(imgUrl);
  const inputUploadFile = useRef(null);
  const initHandleChange = e => {
    //inputEl.current.focus();
    let file = e.currentTarget.files[0];
    console.log("file: ", file);
    if (!file) {
      setImageUrl("");
      return false;
    }

    let filesize = (file.size / 1024 / 1024).toFixed(4);
    console.log(filesize);
    if (filesize > 2) {
      setError(true);
      setMessage("Lỗi!!! Hình ảnh không được lớn hơn 2MB");
      return false;
    }
    var reader = new FileReader();
    reader.onload = function() {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const toggleInputFile = () => {
    inputUploadFile.current.click();
    setError(false);
    setMessage("");
  };
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        name="fileUpload"
        onChange={initHandleChange}
        className="d-none"
        ref={inputUploadFile}
        multiple={false}
        accept="image/png, image/jpeg"
      />
      <div className="action">
        <button
          disabled={loading}
          type="button"
          className="btn insButton mr-3"
          onClick={toggleInputFile}
        >
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path
              fill="none"
              d="M9.634,10.633c0.116,0.113,0.265,0.168,0.414,0.168c0.153,0,0.308-0.06,0.422-0.177l4.015-4.111c0.229-0.235,0.225-0.608-0.009-0.836c-0.232-0.229-0.606-0.222-0.836,0.009l-3.604,3.689L6.35,5.772C6.115,5.543,5.744,5.55,5.514,5.781C5.285,6.015,5.29,6.39,5.522,6.617L9.634,10.633z"
            ></path>
            <path
              fill="none"
              d="M17.737,9.815c-0.327,0-0.592,0.265-0.592,0.591v2.903H2.855v-2.903c0-0.327-0.264-0.591-0.591-0.591c-0.327,0-0.591,0.265-0.591,0.591V13.9c0,0.328,0.264,0.592,0.591,0.592h15.473c0.327,0,0.591-0.264,0.591-0.592v-3.494C18.328,10.08,18.064,9.815,17.737,9.815z"
            ></path>
          </svg>
          <span>Tải ảnh lên</span>
        </button>
        {imageUrl ? <img src={imageUrl} height="50px" alt="" /> : ""}
      </div>
      {error && message !== "" ? (
        <Alert className="pageAlert" variant="danger">
          {message}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default Upload;
