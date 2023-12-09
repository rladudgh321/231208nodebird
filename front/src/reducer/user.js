import { produce } from "immer";

const initialState = {
    me: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
}
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const mockUser = (data) => ({
    ...data,
    id:1,
    email:'kyh_0625@naver.com',
    password:'111',
    nickname:'kyh',
    Followings:[{id: 1}, {id: 2}, {id:3}],
    Followers:[{id: 1}, {id: 2}],
    Posts:[{id:1}],
})

const userReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case ADD_POST_TO_ME:
            draft.me.Posts.unshift({id: action.data});
            break;
        case REMOVE_POST_OF_ME:{
            const index = draft.me.Posts.findIndex((v) => v.id === action.data);
            draft.me.Posts.splice(index,1);
            break;
        }
        case LOG_IN_REQUEST:
            draft.loginLoading = true;
            draft.loginDone = false;
            draft.loginError = null;
            break;
        case LOG_IN_SUCCESS:
            draft.loginLoading = false;
            draft.loginDone = true;
            draft.me = mockUser(action.data);
            break;
        case LOG_IN_FAILURE:
            draft.loginLoading = false;
            draft.loginError = action.error;
            break;
        case LOG_OUT_REQUEST:
            draft.logoutLoading = true;
            draft.logoutDone = false;
            draft.logoutError = null;
            break;
        case LOG_OUT_SUCCESS:
            draft.logoutLoading = false;
            draft.logoutDone = true;
            draft.me = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logoutLoading = false;
            draft.logoutError = action.error;
            break;
        case SIGN_UP_REQUEST:
            draft.signupLoading = true;
            draft.signupDone = false;
            draft.signupError = null;
            break;
        case SIGN_UP_SUCCESS:
            draft.signupLoading = false;
            draft.signupDone = true;
            break;
        case SIGN_UP_FAILURE:
            draft.signupLoading = false;
            draft.signupError = action.error;
            break;
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followDone = false;
            draft.followError = null;
            break;
        case FOLLOW_SUCCESS: //post.id -> me.Followings
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({id: action.data});
            break;
        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break;
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowDone = false;
            draft.unfollowError = null;
            break;
        case UNFOLLOW_SUCCESS:
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            const index = draft.me.Followings.findIndex((v) => v.id === action.data);
            draft.me.Followings.splice(index, 1);
            break;
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
        default :
            break;
    }
});

export default userReducer;