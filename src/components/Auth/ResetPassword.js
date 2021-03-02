import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Form, Input, Button, Space } from 'antd';
import styled from 'styled-components';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import Utils from '../../helpers/Utils';
import Routes from '../../helpers/Routes';
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
 * ResetPassword component
 */
const ResetPassword = ({ data }) => {
    const { token } = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Reset Password';
    }, []);

    const onSubmit = (values) => {
        setLoading(true);
        
        axios.post(Routes.api.resetPassword, {
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
            token: token,
        })
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                Utils.showNotification(response.data.message, 'success');
                history.push(Routes.web.login);
            });
        })
        .catch((error) => {
            Utils.handleException(error);
        }).finally(() => {
            setLoading(false);
        });
    }

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
                                    className="z-shadow"
                                    style={{ maxWidth: 380, margin: '0 auto' }}
                                >
                                    <Row>
                                        <Col span={24}><Title>Reset Password</Title></Col>
                                        <Col span={24}>
                                            <Form
                                                name="resetPassword"
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
                                                    <Input prefix={<MailOutlined />} placeholder="Email" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your new password'
                                                        },
                                                        {
                                                            min: 5,
                                                            message: 'The password is too short'
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password prefix={<LockOutlined />} placeholder="New Password"/>
                                                </Form.Item>

                                                <Form.Item
                                                    name="confirmPassword"
                                                    dependencies={['password']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter your new password',
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
                                                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password"/>
                                                </Form.Item>

                                                <Form.Item>
                                                    <Space direction="vertical" style={{width: '100%'}}>
                                                        <Button type="primary" htmlType="submit" block loading={loading}>
                                                            Reset Password
                                                        </Button>
                                                        
                                                        <Button type="default" htmlType="button" block disabled={loading}>
                                                            <Link to={Routes.web.login}>Back to Login</Link>
                                                        </Button>
                                                    </Space>
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

export default ResetPassword;