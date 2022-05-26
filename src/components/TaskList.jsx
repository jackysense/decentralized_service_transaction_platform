import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Modal,
  Button,
  Space,
  Form,
  Input,
  DatePicker,
  InputNumber,
} from 'antd';
import moment from 'moment'
import { number } from 'prop-types';
const { TextArea } = Input;



const TaskList = ({ onAddTask,onApply,tasks, currentUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Publisher',
      dataIndex: 'sender',
      key: 'sender',
    },
    

    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render:(text)=>{
        return moment(parseInt(text) ).format('YYYY-MM-DD');
      }
    },
    {
      title: 'Payment(Ⓝ)',
      dataIndex: 'balance',
      key: 'balance',
      render:(text)=>{
        return text/10**24;
      }
    },
    {
      title: 'Applicants',
      dataIndex: 'applicants',
      key: 'applicants',
      render:(text)=>{
        return text.length;
      }
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text, record,index) => (
        <>
          {!record.finalApplicant?<a onClick={()=>onApply(index)}>Apply</a>:''}  
        </>
      ),
    },
  ];
  useEffect(() => {
      
  }, []);

  const handleAdd = () => {
    setData([]);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setLoading(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    const item = {...values,key:values.name,deadline:moment(values.deadline).format('YYYY-MM-DD')};
    setData([item, ...data]);
    setLoading(true);
    onAddTask(item);
   // handleCancel(false);
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed:');
  };
  return (
    <>
      <div>
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }} >
          Add Task
        </Button>
        <Table columns={columns} pagination={false} dataSource={tasks} />
      </div>
      <Modal
        title=" Add Task"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >     
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: 'Please input your Task!' }]}
          >
            <TextArea rows={4} placeholder="Please input your Task" maxLength={6} />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: 'Please input your Deadline!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Payment"
            name="payment"
            initialValue={1}
            rules={[{ required: true, message: 'Please input your Payment!' }]}
          >
            <InputNumber
              addonAfter="Ⓝ"
              defaultValue="1"
              min="1"
              max="1000000"
              step="1"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
