import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { actUploadImage } from "../../actions/upload";
function Upload(props) {
  const { label, error, loading, message, imgUrl, appActUploadImage } = props;
  let [stError, setError] = useState(error);
  let [stMessage, setMessage] = useState(message);
  let [stLoading, setLoading] = useState(loading);
  let [imageUrl, setImageUrl] = useState(imgUrl);
  let [imageFile, setImageFile] = useState(null);
  const inputUploadFile = useRef(null);
  const initHandleChange = e => {
    let file = e.currentTarget.files[0];
    if (!file) return false;

    let filesize = (file.size / 1024 / 1024).toFixed(4);
    if (filesize > 2) {
      setError(true);
      setMessage("Lỗi!!! Hình ảnh không được lớn hơn 2MB");
      return false;
    }
    console.log(file);
    setImageFile(file);
    var reader = new FileReader();
    reader.onload = function() {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    appActUploadImage(file);
  };
  const toggleInputFile = () => {
    inputUploadFile.current.click();
    setError(false);
    setMessage("");
  };
  const initRemoveImage = e => {
    e.preventDefault();
    imageFile({});
    setImageUrl("");
  };
  useEffect(() => {
    setLoading(loading);
    setError(error);
    setMessage(message);
    setImageUrl(imgUrl);
  }, [props]);
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
          disabled={stLoading}
          type="button"
          className="btn insButton mr-3"
          onClick={toggleInputFile}
        >
          {stLoading ? (
            <>
              <svg className="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M16.889,8.82c0.002-0.038,0.006-0.075,0.006-0.112c0-1.427-1.158-2.585-2.586-2.585c-0.65,0-1.244,0.243-1.699,0.641c-0.92-1.421-2.513-2.364-4.333-2.364c-2.595,0-4.738,1.914-5.108,4.406c-1.518,0.361-2.648,1.722-2.648,3.35c0,1.904,1.543,3.447,3.447,3.447h12.065c1.904,0,3.447-1.543,3.447-3.447C19.48,10.547,18.377,9.201,16.889,8.82 M16.033,14.74H3.968c-1.426,0-2.585-1.16-2.585-2.586c0-1.2,0.816-2.233,1.985-2.512C3.71,9.561,3.969,9.279,4.021,8.931C4.333,6.838,6.162,5.26,8.277,5.26c1.461,0,2.811,0.736,3.61,1.971c0.135,0.21,0.355,0.351,0.604,0.385c0.039,0.006,0.08,0.008,0.119,0.008c0.207,0,0.408-0.074,0.566-0.212c0.316-0.275,0.719-0.428,1.133-0.428c0.951,0,1.725,0.773,1.723,1.733L16.027,8.78c-0.018,0.408,0.252,0.772,0.646,0.874c1.146,0.293,1.945,1.321,1.945,2.5C18.619,13.58,17.459,14.74,16.033,14.74"
                ></path>
              </svg>
              <span>Đang tải...</span>
            </>
          ) : (
            <>
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
            </>
          )}
        </button>
        {imageUrl ? (
          <div className="reviewFile">
            <img src={imageUrl} height="50px" alt="" />
            <a href="#" onClick={initRemoveImage}>
              ×
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
      {stError && stMessage !== "" ? (
        <Alert className="pageAlert" variant="danger">
          {stMessage}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}
const mapStateToProps = state => {
  return {
    loading: state.uploadReducer.loading,
    error: state.uploadReducer.error,
    message: state.uploadReducer.message,
    imageUrl: state.uploadReducer.imageUrl
  };
};
const mapDispatchToProps = dispatch => {
  return {
    appActUploadImage: file => dispatch(actUploadImage(file))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
