import * as Types from '../../constants/types';
import { takeEvery, call, put, delay } from "redux-saga/effects";
import Service from '../../utils/service';
import { actUploadImageFail, actUploadImageSuccess } from '../../actions/upload';

function uploadImage(file){
    return Service.apiUploadImage(file);
}
function* workerUploadImage({payload}){
    delay(2000)
    try{
        console.log('dt', payload)
        var fileData = new FormData();
        fileData.append('image', payload);
        const response = yield call(uploadImage, fileData);
        const data = response.data;
        yield put(actUploadImageSuccess(data));
    }catch(error){
        yield put(actUploadImageFail(error));
    }
}
export const uploadSaga = [
    takeEvery(Types.UPLOAD_IMAGE, workerUploadImage)
]