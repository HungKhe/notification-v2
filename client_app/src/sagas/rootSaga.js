import { all } from 'redux-saga/effects';
import { uploadSaga } from './upload/upload';
export default function* rootSagas() {
    yield all([
        ...uploadSaga
    ])
}