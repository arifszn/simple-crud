import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Form, Input, Button, Space } from 'antd';
import styled from 'styled-components';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../../helpers/Routes';
import Utils from '../../helpers/Utils';
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
 * ForgetPassword component
 */
const ForgetPassword = () => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.token.value);

    useEffect(() => {
        document.title = `Forget Password - ${Utils.getAppName()}`;
    }, []);

    useEffect(() => {
        if (token) {
            history.push(Routes.web.dashboard);
        }
        // eslint-disable-next-line
    }, [token]);

    const onSubmit = (values) => {
        setLoading(true);
        
        axios.post(Routes.api.forgetPassword, {
            email: values.email
        })
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                Utils.showNotification(response.data.message, 'success', null, true);
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
                                        <Col span={24}><Title>Forget Password</Title></Col>
                                        <Col span={24}>
                                            <Form
                                                name="forgetPassword"
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

                                                <Form.Item>
                                                    <Space direction="vertical" style={{width: '100%'}}>
                                                        <Button type="primary" htmlType="submit" block loading={loading}>
                                                            Send Reset Email
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

export default ForgetPassword;