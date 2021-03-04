import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Routes from '../../helpers/Routes';
import Utils from '../../helpers/Utils';
import { saveToken } from '../../redux/slices/tokenSlice';
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
 * Login component
 */
const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.value);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        document.title = `Login - ${Utils.getAppName()}`;
    }, []);

    useEffect(() => {
        if (token) {
            let { from } = location.state || { from: { pathname: Routes.web.dashboard } };
            history.push(from);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onSubmit = (values) => {
        setLoading(true);
        
        axios.post(Routes.api.login, {
            email: values.email,
            password: values.password,
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
                                    hoverable={true}
                                    bordered={false}
                                    className="z-shadow"
                                    style={{ maxWidth: 380, margin: '0 auto' }}
                                >
                                    <Row>
                                        <Col span={24}><Title>Login</Title></Col>
                                        <Col span={24}>
                                            <Form
                                                name="login"
                                                initialValues={{ remember: true }}
                                                onFinish={onSubmit}
                                            >
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
                                                    <Input prefix={<UserOutlined/>} placeholder="Email" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your password'
                                                        }
                                                    ]}
                                                >
                                                    <Input.Password
                                                        prefix={<LockOutlined/>}
                                                        placeholder="Password"
                                                    />
                                                </Form.Item>
                                                <Form.Item>
                                                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                                                    <Checkbox>Remember me</Checkbox>
                                                    </Form.Item> */}

                                                    <Link to={Routes.web.forgetPassword}>
                                                        Forgot password?
                                                    </Link>
                                                </Form.Item>

                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                                        Log in
                                                    </Button>
                                                    <Button type="dashed" htmlType="button" block disabled={loading} style={{marginTop: '8px'}}>
                                                        <Link to={Routes.web.signup}>
                                                            Create New Account
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

export default Login;