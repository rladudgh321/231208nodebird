import { useCallback } from 'react';
import { Card, Skeleton, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '@/reducer/user';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
    margin-top:15px
`;
// Skeleton 로딩할때 사용해보기 <Skeleton loading={loading} avatar active></Skeleton>
const UserProfile = () => {
    const { logoutLoading, me } = useSelector((state) => state.user);
    console.log('me', me);
    const dispatch = useDispatch();
    const onSubmit = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    },[])
    return (
        <>
            <Card
                style={{
                marginTop: 16,
                }}
                actions={[
                <div key='twit'>짹짹<br />{me.Posts.length || 0}</div>,
                <div key='following'>팔로잉<br />{me.Followings.length || 0}</div>,
                <div key='follower'>팔로워<br />{me.Followers.length || 0}</div>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>모킹</Avatar>}
                    title="모킹이름"
                    description="모킹 설명란"
                />
                <ButtonWrapper onClick={onSubmit} loading={logoutLoading}>로그아웃</ButtonWrapper>
            </Card>
        </>
    );
}

export default UserProfile;