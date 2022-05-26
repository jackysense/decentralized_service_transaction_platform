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
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },


    {
      title: 'Action',
      key: 'action',
      render: (text, record,index) => (
        <Space size="middle">
          <Button onClick={()=>onAccept(record.name,record.index)}>Accept</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    
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
