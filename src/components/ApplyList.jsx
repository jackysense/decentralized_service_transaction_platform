import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Space, Avatar, Input, List, Skeleton } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const ApplyList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Apply</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setData([
      {
        name: 'near',
        commentList: ['aaaa', 'goood'],
      },
      {
        name: 'near1',
        commentList: ['aaaa', 'goood'],
      },
    ]);
  }, []);

  const handleAdd = () => {
    setData([]);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setData([
      { ...values, key: values.name, deadline: moment(values.deadline).format('YYYY-MM-DD') },
      ...data,
    ]);
    handleCancel(false);
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed:');
  };

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<a key="list-loadmore-edit">Accept</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a >{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
             {item.commentList.map(item=>(`${item}\r\n`))}
          </List.Item>
        )}
      />
    </>
  );
};

export default ApplyList;
