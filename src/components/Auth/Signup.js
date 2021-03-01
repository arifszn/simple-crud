import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Routes from '../../helpers/Routes';
import Utils from '../../helpers/Utils';
import { saveToken } from '../../redux/slices/tokenSlice';
import { MdFormatColorText } from 'react-icons/md';
import { saveUser } from '../../redux/slices/userSlice';

const { Content } = Layout;

// Create a Title component that'll render an <section> tag with some styles
const Title = styled.h1`
    text-align: center;
    color: grey;
    margin-bottom: 30px;
`;

// Create a Wrapper component that'll render an <section> tag with some styles
const Wrapper = styled.div`
    margin: 28px;
`;

/**
 * Signup component
 */
const Signup = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.value);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        document.title = `Signup - ${Utils.getAppName()}`;
    }, []);

    useEffect(() => {
        if (token) {
            let { from } = location.state || { from: { pathname: Routes.web.dashboard } };
            history.push(from);
        }
        // eslint-disable-next-line
    }, [token]);

    const onSubmit = (values) => {
        setLoading(true);
        
        axios.post(Routes.api.signup, {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
        })
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                dispatch(saveToken({
                    token: response.data.payload.token.access_token,
                    remember: values.remember
                }));
                dispatch(saveUser(response.data.payload.user));
            });
        })
        .catch((error) => {
            Utils.handleException(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <React.Fragment>
            <Layout>
                <Content>
                    <Row 
                        justify="space-around" 
                        align="middle"
                        style={{height: '100vh'}}
                    >
                        <Col span={24}>
                            <Wrapper>
                                <Card 
                                    bordered={false} 
                                    style={{ maxWidth: 380, margin: '0 auto' }}
                                >
                                    <Row>
                                        <Col span={24}><Title>Signup</Title></Col>
                                        <Col span={24}>
                                            <Form
                                                name="signup"
                                                initialValues={{ remember: true }}
                                                onFinish={onSubmit}
                                            >
                                                <Form.Item
                                                    name="name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your name'
                                                        }
                                                    ]}
                                                >
                                                    <Input prefix={<MdFormatColorText />} placeholder="Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your email'
                                                        },
                                                        {
                                                            type: 'email',
                                                            message: 'Invalid email address'
                                                        }
                                                    ]}
                                                >
                                                    <Input prefix={<MailOutlined/>} placeholder="Email" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your password'
                                                        },
                                                        {
                                                            min: 5,
                                                            message: 'The password is too short'
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                                                </Form.Item>
                                                <Form.Item
                                                    name="confirmPassword"
                                                    dependencies={['password']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your password',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(rule, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject('Confirm password does not match');
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password prefix={<LockOutlined/>} placeholder="Confirm Password"/>
                                                </Form.Item>

                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                                        Signup
                                                    </Button>
                                                    <Button type="dashed" htmlType="button" block disabled={loading} style={{marginTop: '8px'}}>
                                                        <Link to={Routes.web.login}>
                                                            Login
                                                        </Link>
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Card>
                            </Wrapper>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default Signup;