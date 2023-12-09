import useInput from '@/hooks/useInput';
import { ADD_POST_REQUEST } from '@/reducer/post';
import { Form, Button, Input } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

const PostForm = () => {
    const dispatch = useDispatch();
    const { addpostLoading, addpostDone, imagePath } = useSelector((state) => state.post);
    const onRef = useRef();
    const imageUpload = useCallback(()=>{
        onRef.current.click();
    },[]);
    const [text, onChangeText, setText] = useInput('');
    const onSubmit = useCallback(()=> {
        console.log({text});
        dispatch({
            type:ADD_POST_REQUEST,
            data: { text }
        })
    },[dispatch, text]);
    useEffect(() => {
        if(addpostDone) setText('');
    },[addpostDone, setText]);
    return (
        <>
            <Form onFinish={onSubmit}>
                <Input.TextArea value={text} onChange={onChangeText} placeholder='게시글 창' />
                <input type='file' multiple style={{display:'none'}} ref={onRef} />
                <div>
                    {/* {
                        imagePath.map((v) => {
                            return <Image width={100} height={100} alt={v.src} key={v.src} src={v.src} />
                        })
                    } */}
                </div>
                <Button onClick={imageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{float:'right'}} htmlType='submit' loading={addpostLoading}>짹짹</Button>
            </Form>

        </>
    );
}

export default PostForm;