import React, { useRef, useState } from 'react';
import { Button, Space, ConfigProvider, Modal, Dropdown, Menu, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import enUSIntl from 'antd/lib/locale/en_US';
import { DownOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Routes from '../../helpers/Routes';
import { useSelector } from 'react-redux';
import Utils from '../../helpers/Utils';
import HTTP from './../HTTP';
import { PageContainer } from '@ant-design/pro-layout';

const { confirm } = Modal;

/**
 * Product component
 */
const Product = () => {
    const token = useSelector(state => state.token.value);
    const [loading, setLoading] = useState(false);
    const actionRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    const showConfirm = (rows) => {
        let ids = [];
        rows.forEach(row => {
            ids.push(row.id);
        });
        confirm({
            confirmLoading: loading,
            title: `Do you want to delete ${ids.length == 1 ? 'this' : 'these'} ${ids.length == 1 ? 'item' : 'items'}?`,
            icon: <ExclamationCircleOutlined />,
            mask: true,
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
                        message.success(response.data.message);
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
                    setItemToEdit(row);
                    setModalVisible(true);
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
            width: 170,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            sorter: false,
            search: false,
            width: 170,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            search: true,
            ellipsis:true,
            hideInTable: true
        },
        {
            title: 'Option',
            valueType: 'option',
            align: 'center',
            width: 170,
            render: (text, row, _, action) => [
                <Dropdown key="0" overlay={menu(row)} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Option <DownOutlined />
                    </a>
                </Dropdown>,
            ],
        }
    ];

    return (
        <React.Fragment>
            <ConfigProvider locale={enUSIntl}>
                <PageContainer 
                    ghost
                    content="List of all products"
                >
                    <ProTable
                        columns={columns}
                        className="z-shadow"
                        showSorterTooltip={false}
                        pagination={{
                            showQuickJumper: true,
                            pageSize: 10
                        }}
                        tableLayout={'fixed'}
                        rowSelection={{
                            // onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                        }}
                        expandable={{
                            expandedRowRender: record => <p style={{ margin: '0 17px' }}>Details: {record.details}</p>,
                        }}
                        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                            <Space size={24}>
                                <span>
                                    Selected {selectedRowKeys.length} items
                                    <a
                                        style={{
                                        marginLeft: 8,
                                        }}
                                        onClick={onCleanSelected}
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
                        toolBarRender={() => [
                        <Button key={"add"} type="primary" onClick={() => setModalVisible(true)}>
                            New Product
                        </Button>,
                        ]}
                        search={false}
                        rowKey="id"
                        options={{
                            search: true,
                        }}
                        headerTitle={' '}
                    />
                </PageContainer>
            </ConfigProvider>
        </React.Fragment>
    );
};

export default Product;