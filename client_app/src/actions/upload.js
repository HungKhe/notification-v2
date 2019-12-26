import * as Types from '../constants/types';

/* Upload */
export const actUploadImage = (file) => {
    return {
        type: Types.UPLOAD_IMAGE,
        payload: file
    }
}
export const actUploadImageSuccess = (file) => {
    return {
        type: Types.UPLOAD_IMAGE_SUCCESS,
        payload: file
    }
}
export const actUploadImageFail = (error) => {
    return {
        type: Types.UPLOAD_IMAGE_FAIL,
        payload: error
    }
}