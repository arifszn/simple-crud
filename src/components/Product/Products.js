import React, { useRef, useState } from 'react';
import { Button, Space, Modal, Dropdown, Menu, Card, Avatar } from 'antd';
import ProTable from '@ant-design/pro-table';
import { DownOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Routes from '../../helpers/Routes';
import Utils from '../../helpers/Utils';
import HTTP from '../HTTP';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useHistory } from 'react-router-dom';

const { confirm } = Modal;

/**
 * Products component
 */
const Products = () => {
    const [loading, setLoading] = useState(false);
    const actionRef = useRef();
    let history = useHistory();

    const showConfirm = (rows) => {
        let ids = [];
        rows.forEach(row => {
            ids.push(row.id);
        });
        confirm({
            confirmLoading: loading,
            title: `Do you want to delete ${ids.length === 1 ? 'this product' : 'these products'}?`,
            content: 'This action is irreversible',
            icon: <ExclamationCircleOutlined style={{ color: 'red' }}/>,
            mask: true,
            okType: 'danger',
            maskTransitionName:"maskTransitionName",
            onOk() {
                setLoading(true);
                HTTP.delete(Routes.api.product, {
                    params: {
                        ids: ids
                    }
                })
                .then(response => {
                    Utils.handleSuccessResponse(response, () => {
                        Utils.showNotification(response.data.message, 'success');
                        actionRef.current?.reloadAndRest();
                    })
                })
                .catch((error) => {
                    Utils.handleException(error);
                }).finally(() => {
                    setLoading(false);
                });
            },
        });
    }

    const menu = (row) => (
        <Menu>
            <Menu.Item 
                key="0"
                onClick={() => {
                    history.push(Routes.web.editProduct.replace(':id', row.id))
                }}
                icon={<EditOutlined />}
            >
                Edit
            </Menu.Item>
            <Menu.Item 
                key="1"
                onClick={() => showConfirm([row])}
                icon={<DeleteOutlined />}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            search: true,
            sorter: true,
            width: 170,
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: true,
            search: true,
            width: 50,
            render: (_, row) => (
                `$ ${row.price}`
            ),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            sorter: false,
            align: 'center',
            width: 70,
            search: false,
            render: (_, row) => (
                row.image ?
                <Space>
                    <Avatar
                        size="large"
                        src={Utils.backend + '/' + row.image}
                    />
                </Space>
                :
                '-'
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            search: true,
            ellipsis:true,
            width: 170,
        },
        {
            title: 'Option',
            valueType: 'option',
            align: 'center',
            width: 100,
            render: (text, row, _, action) => [
                <Dropdown key="0" overlay={menu(row)} trigger={['click']}>
                    <a className="ant-dropdown-link" href={'#!'} onClick={e => e.preventDefault()}>
                        Option <DownOutlined />
                    </a>
                </Dropdown>,
            ],
        }
    ];

    return (
        <React.Fragment>
            <PageContainer 
                ghost
                extra={[
                    <Link key={"add"} to={Routes.web.newProduct}>
                        <Button  type="primary">
                            New Product
                        </Button>,
                    </Link>
                ]}
                content="List of all products"
            >
                <Card className="z-shadow" hoverable={true}>
                    <ProTable
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={{
                            showQuickJumper: true,
                            pageSize: 10
                        }}
                        tableLayout={'fixed'}
                        rowSelection={{
                            // onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                        }}
                        /* expandable={{
                            expandedRowRender: record => <p style={{ margin: '0 17px' }}>Description: {record.description}</p>,
                        }} */
                        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                            <Space size={24}>
                                <span>
                                    Selected {selectedRowKeys.length} products
                                    <a
                                        href={'#!'}
                                        style={{
                                        marginLeft: 8,
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onCleanSelected();
                                        }}
                                    >
                                        <strong>Cancel Selection</strong>
                                    </a>
                                </span>
                            </Space>
                        )}
                        tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                            <Space>
                                <Button type="primary" onClick={() => showConfirm(selectedRows)}>Batch Deletion</Button>
                            </Space>
                        )}
                        actionRef={actionRef}
                        request={async (params, sorter, filter) => {
                            return HTTP.get(Routes.api.products+'?page='+params.current, {
                                params: {
                                    params,
                                    sorter,
                                    columns
                                }
                            }).then(response => {
                                return Utils.handleSuccessResponse(response, () => {
                                    return response.data.payload
                                })
                            })
                            .catch(error => {
                                Utils.handleException(error);
                            })
                        }}
                        dateFormatter="string"
                        search={false}
                        rowKey="id"
                        options={{
                            search: true,
                        }}
                        headerTitle={' '}
                    />
                </Card>
            </PageContainer>
        </React.Fragment>
    );
};

export default Products;