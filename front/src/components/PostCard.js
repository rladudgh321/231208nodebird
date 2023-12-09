import { Avatar, Button, Card, List, Popover } from "antd";
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import ImageFile from './ImageFile';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import { useCallback, useState } from "react";
import { REMOVE_POST_REQUEST } from "@/reducer/post";


const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const {  } = useSelector((state) => state.post);
    const [like, setLike] = useState(false);
    const onLike = useCallback(() => {
        setLike((prev) => !prev);
    }, []);
    const [openMessage, setOpenMessage] = useState(false);
    const openMessageHandler = useCallback(() => {
        setOpenMessage((prev) => !prev);
    }, []);
    const onRemovePost = useCallback(() => {
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    }, [post, dispatch]);
    return (
        <>
            <List key={post.id} style={{ margin:'40px 0' }}>
                <Card
                    extra={<FollowButton post={post} />}
                    cover={post.Images?.[0] && <ImageFile images={post.Images} />}
                    actions={[
                        <RetweetOutlined key='retweet' />,
                        like
                        ? <HeartTwoTone key='like' onClick={onLike} twoToneColor='red' />
                        : <HeartOutlined key='unlike' onClick={onLike} />,
                        <MessageOutlined key='message' onClick={openMessageHandler} />,
                        <Popover content={[
                            <Button.Group key='buttonGroup'>
                                {
                                    me
                                    ? <>
                                        <Button key={post.id + 'edit'}>수정</Button>
                                        <Button key={post.id +'removePost'} onClick={onRemovePost}>삭제</Button>
                                    </>
                                    : <Button key={post.id +'callPost'}>신고</Button>
                                }
                            </Button.Group>
                        ]} key='more'>
                            <EllipsisOutlined />
                        </Popover>
                    ]}
                >
                    <Card.Meta 
                        avatar={<Avatar>{post.User?.nickname[0]}</Avatar>} 
                        title={post.User?.nickname}
                        description={post.contents}
                    />
                </Card>       
            </List>
            {
                openMessage && (
                    <>
                        <List
                            bordered
                            dataSource={post.Comments}
                            renderItem={(item) => (
                                <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    title={item.User.nickname}
                                    description={item.comment}
                                />
                            </List.Item>
                            )}
                        >
                        </List>
                        {me && <CommentForm post={post} />}
                    </>                    
                )
            }
        </>
    );
}

export default PostCard;
/**
 * 
 * 팔로워버튼
 * 이미지그림
 * 아바타 이름 contents
 * 버튼들
 * 
 */