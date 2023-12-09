import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, 
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, 
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
    UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS 

} from '@/reducer/user';

function loginApi(data) {
    return axios.post('/login', data);
}

function* login(action) {
    try {
        // const result = yield call(loginApi, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,            
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function logoutApi() {
    return axios.post('/logout', );
}

function* logout() {
    try {
        // const result = yield call(logoutApi, action.data);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signupApi() {
    return axios.post('/signup', );
}

function* signup() {
    try {
        // const result = yield call(signupApi, action.data);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function followApi(data) {
    return axios.post('/follow', );
}

function* follow(action) {
    try {
        // const result = yield call(followApi, action.data);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function unfollowApi(data) {
    return axios.post('/unfollow', );
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowApi, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollow),
        fork(watchUnFollow),
    ]);
}

export default userSaga;