import React from 'react';
import { Menu, Row, Col } from 'antd';
import LoginForm from '@/components/LoginForm';
import UserProfile from '@/components/UserProfile';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const AppLayout = ({children}) => {
    const { me } = useSelector((state) => state.user);
    const items = [
        {
          label: <Link href='/'>노드버드</Link>,
          key: 'mainPage',
        },
        {
          label: <Link href='/profile'>프로필</Link>,
          key: 'profilePage',
        },
    ]
    return (
        <>
            <Menu mode="horizontal" items={items} style={{marginBottom: '10'}} />
            <Row>
                <Col md={6} xs={24}>
                    {
                        me
                        ? <UserProfile />
                        : <LoginForm />
                    }
                </Col>
            <Col md={12} xs={24}>{children}</Col>
            <Col md={6} xs={24}>
                <Link href='/'>메인화면</Link>
            </Col>
            </Row>
        </>
    );
}

export default AppLayout;

/**
 * 로그인페이지 - 회원정보 페이지
 * 메인페이지
 * 클릭페이지
 * 
 * {
                isLoggedIn
                ? <UserProfile />
                : <LoginForm />
            }
 */