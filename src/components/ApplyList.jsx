import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Space, Avatar, Input, message, List, Comment } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const defaultExpandable = {
  expandedRowRender: (record) => <>{record.description}</>,
};

const ApplyList = ({applicants,onAccept}) => {

  const [data, setData] = useState([]);
  const [expandable, setExpandable] = useState(defaultExpandable);
  // const [expandKeys, setExpandKeys] = useState([]);
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
      render: (text, record,index) => (
        <Space size="middle">
          <Button onClick={()=>onAccept(record.name)}>Accept</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    // setExpandKeys([1,2]);
    // setData([
    //   {
    //     key:1,
    //     name: 'test.near',
    //     description: (
    //       <p>
    //         {['good', 'not bad'].map((item ,index)=> (<>Comment {index+1}: {item} <br /></>))}
    //       </p>
    //     ),
    //   },
    //   {
    //     key:2,
    //     name: 'test1.near',
    //     description: (
    //       <p>
    //       {['good', 'well done'].map((item ,index)=> (<>Comment {index+1}: {item} <br /></>))}
    //       </p>
    //     ),
    //   },
    // ]);
  }, []);

  const expandKeys=applicants.map(item=>item.key);

  return (
    <>
    
      <Table
        expandable={expandable}
        expandedRowKeys={expandKeys}
        pagination={false}
        columns={columns}
        dataSource={applicants}
      // scroll={scroll}
      />
    </>
  );
};

export default ApplyList;
