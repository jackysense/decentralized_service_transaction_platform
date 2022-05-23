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
const { TextArea } = Input;



const TaskList = ({ onSubmit,tasks, currentUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
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
        key: '1',
        task: '翻译文章',
        deadline: '2022-05-21',
        payment: 100011,
      },
      {
        key: '2',
        task: '室内清洁',
        deadline: '2022-05-21',
        payment: 10001,
      },
      {
        key: '3',
        task: 'Joe Black',
        deadline: '2022-05-21',
        payment: 1000,
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
    const item = {...values,key:values.name,deadline:moment(values.deadline).format('YYYY-MM-DD')};
    setData([item, ...data]);
    onSubmit(item);
    handleCancel(false);
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed:');
  };
  return (
    <>
      <div>
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
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
              addonAfter="N"
              defaultValue="1"
              min="1"
              max="10000000000"
              step="1"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
