import { generateDummyPost,
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, 
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, 
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE, 
 } from "@/reducer/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "@/reducer/user";
import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { generate } from "short-id";

function addPostApi(data) {
    return axios.post('/addpost', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostApi, action.data);
        const id = generate();
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                contents: action.data.text,
            },
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function removePostApi(data) {
    return axios.post('/removePost', data);
}

function* removePost(action) {
    try {
        // const result = yield call(removePostApi, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function addCommentApi(data) {
    return axios.post('/addComment', data);
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentApi, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function postsApi(data) {
    return axios.post('/posts', data);
}

function* posts() {
    try {
        // const result = yield call(postsApi, action.data);
        yield delay(1000);
        yield put({
            type: POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchCommentPost() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchPosts() {
    yield takeLatest(POSTS_REQUEST, posts);
}

function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchCommentPost),
        fork(watchPosts),
    ])
}

export default postSaga;