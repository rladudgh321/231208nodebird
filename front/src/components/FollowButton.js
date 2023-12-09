import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '@/reducer/user';
import {Button} from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FollowButton = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const isFollow = me?.Followings.find((v) => v.id === post.id);
    const onFollow = useCallback(()=>{
        dispatch({
            type: FOLLOW_REQUEST,
            data: post.id
        })
    },[dispatch, post]);
    const onUnFollow = useCallback(() => {
        dispatch({
            type: UNFOLLOW_REQUEST,
            data: post.id
        })
    }, [dispatch, post]);
    if(!me) return null;
    return (
        <>
            {
                isFollow
                ? <Button onClick={onUnFollow}>언팔로우</Button>
                : <Button onClick={onFollow}>팔로우</Button>
            }
            
        </>
    );
}

export default FollowButton;