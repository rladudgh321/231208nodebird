import useInput from '@/hooks/useInput';
import { LOG_IN_REQUEST } from '@/reducer/user';
import { Form, Input, Button } from 'antd';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const LoginForm = () => {
    const { loginLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [pwd, onChangePwd] = useInput('');
    const onSubmit = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, pwd },
        })
    },[]);
    return (
        <>
            <Form style={{padding:5}} onFinish={onSubmit}>
                <label htmlFor='email' >이메일</label>
                <Input id='email' type='email' style={{margin:'3px 0'}} value={email} onChange={onChangeEmail} />
                <label htmlFor='pwd'>비밀번호</label>
                <Input id='pwd' type='password' style={{margin:'3px 0'}} value={pwd} onChange={onChangePwd} />
                <div style={{margin:'5px 0'}}>
                    <Button type='primary' htmlType='submit' loading={loginLoading}>로그인</Button>
                    <Button style={{float:'right'}} href='/signup'>회원가입</Button>
                </div>
            </Form>
        </>
    );
}

export default LoginForm;