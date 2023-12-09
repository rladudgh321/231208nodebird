import AppLayout from "@/components/AppLayout";
import { useCallback, useMemo, useState } from "react";
import { Input, Form, Button, Checkbox } from 'antd';
import useInput from "@/hooks/useInput";
import styledc from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "@/reducer/user";

const Red = styledc.div`
    color:red;
    `;

const Signup = () => {
    const dispatch = useDispatch();
    const { signupLoading } = useSelector((state) => state.user);
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const onChnagePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(false);
    },[]);
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e)=>{
        setTerm(e.target.checked);
        setTermError(false);
    },[]); 
    const styled = useMemo(() => ({
        padding:10
    }),[]);
    
    const onSubmit = useCallback(()=>{
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        dispatch({
            type:SIGN_UP_REQUEST,
            data:{
                id, password, nickname
            }
        })
        console.log({id, password, nickname});
    },[password, passwordCheck, term, dispatch, id, nickname]);
    return (
        <>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div style={styled}>
                        <label htmlFor="id">이메일</label>
                        <Input type="email" id="id" value={id} onChange={onChangeId} />
                    </div>
                    <div style={styled}>
                        <label htmlFor="password">비밀번호</label>
                        <Input id="password" type="password" value={password} onChange={onChangePassword} />
                    </div>
                    <div style={styled}>
                        <label htmlFor="passwordCheck">비밀번호 확인</label>
                        <Input id="passwordCheck" type="password" value={passwordCheck} onChange={onChnagePasswordCheck} />
                        { passwordError && <Red>비밀번호 오류입니다</Red> }
                    </div>
                    <div style={styled}>
                        <label htmlFor="nickname">닉네임</label>
                        <Input id="nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                    <div style={styled}>
                        <Checkbox checked={term} onChange={onChangeTerm}>약관에 동의합니다</Checkbox>
                        { termError && <Red>약관에 동의하셔야 회원가입이 진행됩니다</Red> }
                    </div>
                    <div style={{ textAlign:'center', padding:10 }}>
                        <Button type="primary" style={{ width:'70vw' }} htmlType='submit' loading={signupLoading}>회원가입</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    );
}

export default Signup;