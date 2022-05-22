import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Space, Avatar, Input, message, List, Comment } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const ApplyList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const [expandable, setExpandable] = useState(defaultExpandable);
  const columns = [
    {
      title: 'Account ID',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },


    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button>Accept</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setData([
      {
        name: 'test.near',
        commentList: ['aaaa', 'goood'],
        description: (
          <p>
            {['good', 'not bad'].map((item ,index)=> (<>Comment {index+1}: {item} <br /></>))}
          </p>
        ),
      },
      {
        name: 'test1.near',
        commentList: ['good', 'not bad'],
        // description: 'My name is John Brown,\n I am',
        description: (
          <p>
          {['good', 'well done'].map((item ,index)=> (<>Comment {index+1}: {item} <br /></>))}
          </p>
        ),
      },
    ]);
  }, []);

  const getDiv = (list) => {
    let div = <></>;
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      div += <p>Comment {i + 1}:{element}</p>

    }
    return <p>Comment 1</p>
  }

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
      {/* <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        // renderItem={(item) => (
        //   <List.Item actions={[<a key="list-loadmore-edit" onClick={()=>{message.info('call contract')}}>Accept</a>]}>
        //     <List.Item.Meta
        //       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        //       title={<a >{item.name}</a>}
        //       description="Avg point:4.5"
        //     />
           
        //      {getDiv(item.commentList)}
        //   </List.Item>
        // )}
        renderItem={(item) => (
          <li>
            <Comment
              actions={[<span key="comment-list-reply-to-0" onClick={()=>{message.info('aa')}}>Reply to</span>]}
              author={item.name}
              content={item.content}
            
            />
          </li>
        )}
      /> */}

      <Table
        expandable={expandable}
        pagination={false}
        columns={columns}
        dataSource={data}
      // scroll={scroll}
      />
    </>
  );
};

export default ApplyList;
