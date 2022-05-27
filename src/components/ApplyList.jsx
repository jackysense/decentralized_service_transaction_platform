import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { Table,  Button } from 'antd';

const defaultExpandable = {
  expandedRowRender: (record) => <>{record.description}</>,
};

const ApplyList = ({applicants,onAccept}) => {

  const [expandable, setExpandable] = useState(defaultExpandable);
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
      render: (text, record) => (
          <Button onClick={()=>onAccept(record.name,record.index)}>Accept</Button>
      ),
    },
  ];
  
  const expandKeys=applicants.map(item=>item.key);

  return (
    <>
    
      <Table
        expandable={expandable}
        expandedRowKeys={expandKeys}
        pagination={false}
        columns={columns}
        dataSource={applicants}
      />
    </>
  );
};

export default ApplyList;
