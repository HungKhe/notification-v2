import * as Types from "../../constants/types";
const initialState = {
  error: false,
  loading: false,
  message: "",
  imageUrl: ""
};
const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPLOAD_IMAGE:
      console.log("Reducer: ", action.payload);
      return { ...state, loading: true };
    case Types.UPLOAD_IMAGE_SUCCESS:
      console.log("Reducer succ: ", action.payload);
      return { ...state };
    case Types.UPLOAD_IMAGE_FAIL:
      console.log("Reducer err: ", action.payload);
      return { ...state };
    default:
      return state;
  }
};

export default uploadReducer;
