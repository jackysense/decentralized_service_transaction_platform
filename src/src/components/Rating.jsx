
import React, { useState, useEffect } from 'react';
import { 
  Button,
  Form,
  Input,
  Rate,
} from 'antd';
const { TextArea } = Input;


const Rating = ({receiver,onPay}) => {

  const [data, setData] = useState([]);


  useEffect(() => {
    
  }, []);



  const onFinishFailed = () => {
    console.log('onFinishFailed:');
  };

  return (
    <>
     
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onPay}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Rate"
            name="rating"
            rules={[{ required: true, message: 'Please give your Rate!' }]}
          >
           <Rate   />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: 'Please input your Deadline!' }]}
          >
              <TextArea rows={4} placeholder="Please input your Comment" maxLength={50} />
          </Form.Item>
       

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Rate and Pay
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default Rating;
