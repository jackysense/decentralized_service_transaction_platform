
import React, { useState, useEffect } from 'react';
import { 
  Button,
  Form,
  Input,
  Rate,
} from 'antd';
const { TextArea } = Input;


const Rating = (props) => {
  const  {receiver,onPay,form} =props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const onFinish = (e) => {
    debugger
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(err) return;
      if (!err) {      
        setLoading(true);
        onPay(values);
      }
    });
  };

  return (
    <>     
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onSubmit={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Rate"
            name="rating"            
            rules={[{ required: true, message: 'Please give your Rate!' }]}
          >
          
           {getFieldDecorator('rating', {
              rules: [{ required: true, message: 'Please give your Rate!' }],
            })( <Rate   />)}
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
          >
             {getFieldDecorator('comment', {
              rules: [{ required: true, message: 'Please input your Comment' }],
            })(<TextArea rows={4} placeholder="Please input your Comment" maxLength={50} />)}
              
          </Form.Item>
       

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Rate and Pay
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default Form.create()(Rating); 
