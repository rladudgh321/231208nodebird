import { fork, all } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}

export default rootSaga;