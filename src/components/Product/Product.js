import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Form, Input, Row, Col, Upload, Modal, InputNumber, Spin } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import Utils from '../../helpers/Utils';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import HTTP from '../HTTP';
import Constants from '../../helpers/Constants';

const { TextArea } = Input;

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const Wrapper = styled.div`
    padding: 50px 100px;
    @media (max-width: 768px) {
        padding: 0;
    }
`;

/**
 * Product component
 */
const Product = () => {
    const { id } = useParams();
    let history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [componentLoading, setComponentLoading] = useState(false);
    const [imageFileList, setImageFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);

    useEffect(() => {
        if (id) {
            loadProduct();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const loadProduct = () => {
        setComponentLoading(true);

        HTTP.get(`${Routes.api.product}?id=${id}`)
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                let product = response.data.payload;

                var newImageArray = [
                    {
                        uid: 1,
                        name: 'image.png',
                        status: 'done',
                        url: Utils.backend + '/' + product.image
                    }
                ];
                
                setImageFileList(newImageArray);

                form.setFieldsValue({
                    id: product.id, 
                    title: product.title, 
                    price: product.price, 
                    description: product.description, 
                    image: newImageArray
                });
            });
        })
        .catch((error) => {
            Utils.handleException(error, () => {
                if ((typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined') && error.response.data.status === Constants.STATUS_CODE_NOT_FOUND_ERROR) {
                    history.push(Routes.web.products);
                }
            });
        }).finally(() => {
            setComponentLoading(false);
        });
    }

    const onFinish = async values => {
        setLoading(true);
        const formData = new FormData();

        values.id && formData.append('id', values.id);
        formData.append('title', values.title);
        formData.append('price', values.price);
        formData.append('description', values.description);
        
        let fileBlob = null;
        const file = values.image[0];

        if (!file.url && !file.preview) {
            
            fileBlob = file.originFileObj;
        } else {
            
            fileBlob = await urlToBlob(file.url || file.preview);
        }
        
        formData.append('image', fileBlob); 

        HTTP.post(Routes.api.product, formData)
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                Utils.showNotification(response.data.message, 'success');
                form.resetFields();
                setImageFileList([]);
                history.push(Routes.web.products);
            });
        })
        .catch((error) => {
            Utils.handleException(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const imageListHandleChange = (info) => {
        setImageFileList(info.fileList.filter(file => validateImage(file)))
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const urlToBlob = async (url) => {
        const response = await fetch(url);
        
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', {type: blob.type});
        return file;
    }

    const validateImage = (file) => {
        if (!file.url && !file.preview) {
            const validType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';

            if (!validType) {
                Utils.showNotification('You can only upload image file!', 'error');
            }

            const validSize = file.size / 1024 / 1024 < 5;

            if (!validSize) {
                Utils.showNotification('Image must smaller than 5MB!', 'error');
            }

            return validType && validSize;
        }

        return true;
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return (
        <React.Fragment>
            <PageContainer 
                ghost
                title={id ? 'Edit Product' : 'New Product'}
                content={id ? 'Edit an existing product' : 'Create a new product'}
                extra={[
                    <Link key={"back"} to={Routes.web.products}>
                        <Button>Back</Button>
                    </Link>
                ]}
            >
                <Spin spinning={componentLoading} delay={500} size="large">
                    <Card className="z-shadow" hoverable={true}>
                        <Wrapper>
                            <Row>
                                <Col span={24}>
                                    <Form
                                        layout="vertical"
                                        name="SEO"
                                        form={form}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item name="id" hidden>
                                            <Input/>
                                        </Form.Item>
                                        <Row gutter={[48]}>
                                            <Col md={12} sm={24} xs={24}>
                                                <Form.Item
                                                    label='Title'
                                                    name="title"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Enter Title"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={12} sm={24} xs={24}>
                                                <Form.Item
                                                    label='Price'
                                                    name="price"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                        {
                                                            type: 'number',
                                                            message: 'Invalid input'
                                                        }
                                                    ]}
                                                >
                                                    <InputNumber style={{width: '100%'}} min={0.01} placeholder="Enter Price"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24} >
                                                <Form.Item
                                                    label='Description'
                                                    name="description"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <TextArea rows={4} placeholder="Enter Description"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24} >
                                                <Form.Item
                                                    name="image"
                                                    label="Image"
                                                    valuePropName="fileList"
                                                    getValueFromEvent={normFile}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please upload image',
                                                        },
                                                    ]}
                                                >
                                                    <Upload
                                                        accept={['image/png', 'image/jpeg', 'image/jpg']}
                                                        listType="picture-card"
                                                        fileList={imageFileList}
                                                        beforeUpload={
                                                            file => {
                                                                return false;
                                                            }
                                                        }
                                                        onPreview={handlePreview}
                                                        onChange={imageListHandleChange}
                                                    >
                                                        {imageFileList.length >= 1 ? null : uploadButton}
                                                    </Upload>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                >
                                                    <Button loading={loading} type="primary" htmlType="submit">
                                                        Save
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Wrapper>
                    </Card>
                </Spin>
            </PageContainer>
            <Modal
                visible={previewVisible}
                title={'Preview'}
                footer={null}
                centered
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    )
}

export default Product;