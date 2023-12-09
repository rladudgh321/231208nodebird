import { produce } from "immer";
import { generate } from 'short-id'
import { faker  } from '@faker-js/faker';

const initialState = {
    mainPost:[{
        id:1,
        User:{
            id:1,
            nickname:'kyh',
        },
        contents:'목 데이터 내용이다 #김영호 #노드버드',
        Comments:[{
            id:'klajew',
            User:{
                id:generate(),
                nickname:'김지유',
            },
            comment:'아빠 힘내세요 지유가 있잖아요',
        },{
            id:'kl3aje2w',
            User:{
                id:generate(),
                nickname:'김김김',
            },
            comment:'김은 맛있어',
        }],
        Images: [{
            src:'https://cdn.pixabay.com/photo/2017/09/26/13/42/apple-2788662_1280.jpg'
        },{
            src:'https://cdn.pixabay.com/photo/2015/02/27/17/58/bananas-652497_1280.jpg'
        },{
            src:'https://cdn.pixabay.com/photo/2015/06/19/16/48/watermelon-815072_1280.jpg'
        },]
    }],
    imagePath:[{
        src:'https://cdn.pixabay.com/photo/2017/09/26/13/42/apple-2788662_1280.jpg'
    },{
        src:'https://cdn.pixabay.com/photo/2015/02/27/17/58/bananas-652497_1280.jpg'
    },{
        src:'https://cdn.pixabay.com/photo/2015/06/19/16/48/watermelon-815072_1280.jpg'
    },],
    hasmorePosts:true,
    addpostLoading:false,
    addpostDone:false,
    addpostError:null,
    removepostLoading:false,
    removepostDone:false,
    removepostError:null,
    addcommentLoading:false,
    addcommentDone:false,
    addcommentError:null,
    postsLoading:false,
    postsDone:false,
    postsError:null,
}

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id:generate(),
        nickname:generate(),
    },
    contents:data.contents,
    Comments:[{
        id:'klajew',
        User:{
            id:generate(),
            nickname:'김지유',
        },
        comment:'아빠 힘내세요 지유가 있잖아요',
    }],
    Images:[{
        src:'https://cdn.pixabay.com/photo/2017/09/26/13/42/apple-2788662_1280.jpg'
    },{
        src:'https://cdn.pixabay.com/photo/2015/02/27/17/58/bananas-652497_1280.jpg'
    },{
        src:'https://cdn.pixabay.com/photo/2015/06/19/16/48/watermelon-815072_1280.jpg'
    },],
});

const dummyComment = (data) => ({
    id: generate(),
    User: {
        id:data.userId,
        nickname:generate(),
    },
    comment:data.contents
});

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id:generate(),
    User: {
        id:generate(),
        nickname:faker.person.fullName(),
    },
    contents: faker.lorem.words(10),
    Comments:[{
        id:generate(),
        User:{
            id:generate(),
            nickname:faker.person.fullName(),
        },
        comment: faker.lorem.words(10),
    }],
    Images: [{
        src:faker.image.urlPicsumPhotos(),
    },{
        src:faker.image.urlPicsumPhotos(),
    },{
        src:faker.image.urlPicsumPhotos(),
    }],
}))

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

const postReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case ADD_POST_REQUEST:
            draft.addpostLoading = true;
            draft.addpostDone = false;
            draft.addpostError = null;
            break;
        case ADD_POST_SUCCESS:
            draft.addpostLoading = false;
            draft.addpostDone = true;
            draft.mainPost.unshift(dummyPost(action.data));
            break;
        case ADD_POST_FAILURE:
            draft.addpostLoading = false;
            draft.addpostError = action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.removepostLoading = true;
            draft.removepostDone = false;
            draft.removepostError = null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.removepostLoading = false;
            draft.removepostDone = true;
            const index = draft.mainPost.findIndex((v) => v.id === action.data);
            draft.mainPost.splice(index,1);
            break;
        case REMOVE_POST_FAILURE:
            draft.removepostLoading = false;
            draft.addpostError = action.error;
            break;
        case ADD_COMMENT_REQUEST:
            draft.addcommentLoading = true;
            draft.addcommentDone = false;
            draft.addcommentError = null;
            break;
        case ADD_COMMENT_SUCCESS:{
            draft.addcommentLoading = false;
            draft.addcommentDone = true;
            const post = draft.mainPost.find((v) => v.id === action.data.postId);
            post.Comments.unshift(dummyComment(action.data));
            break;
        }
        case ADD_COMMENT_FAILURE:
            draft.addcommentLoading = false;
            draft.addcommentError = action.error;
            break;
        case POSTS_REQUEST:
            draft.postsLoading = true;
            draft.postsDone = false;
            draft.postsError = null;
            break;
        case POSTS_SUCCESS:
            draft.postsLoading = false;
            draft.postsDone = true;
            draft.mainPost = action.data.concat(draft.mainPost);
            draft.hasmorePosts = draft.mainPost.length <= 50;
            break;
        case POSTS_FAILURE:
            draft.postsLoading = false;
            draft.postsError = action.error;
            break;
        default :
            break;
    }
});

export default postReducer;