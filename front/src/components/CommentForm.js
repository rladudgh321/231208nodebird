import useInput from "@/hooks/useInput";
import { ADD_COMMENT_REQUEST } from "@/reducer/post";
import { Input,Form, Button } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const { addcommentDone } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const onSubmit = useCallback(() => {
        console.log({
            userId: post.User.id,
            postId: post.id,
            contents: commentText,
        });
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data: {
                userId: post.User.id,
                postId: post.id,
                contents: commentText,
            }
        })
    },[commentText, post, dispatch]);
    useEffect(()=>{
        if(addcommentDone) setCommentText('');
    },[setCommentText, addcommentDone]);
    return (
        <>
            <Form onFinish={onSubmit}>
                <Input.TextArea placeholder="댓글을 달아보자" value={commentText} onChange={onChangeCommentText} />
                <Button type="primary" style={{ float:'right' }} htmlType="submit">삐약</Button>
            </Form>
        </>
    );
}

export default CommentForm;