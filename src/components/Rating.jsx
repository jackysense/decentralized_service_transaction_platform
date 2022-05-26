
import React, { useState, useEffect } from 'react';
import {
 
  Button,
  Form,
  Input,
  Rate,
  message
} from 'antd';
import moment from 'moment'
const { TextArea } = Input;

// export default function Messages({ tasks }) {
//   return (
//     <>
//       <h2>Messages</h2>
//       {tasks.map((message, i) =>
//         // TODO: format as cards, add timestamp
//         <p key={i} className={message.premium ? 'is-premium' : ''}>
//           <strong>{message.sender}</strong>:<br/>
//           {message.text}
//         </p>
//       )}
//     </>
//   );
// }

// Messages.propTypes = {
//   tasks: PropTypes.array
// };

const Rating = ({receiver,onPay}) => {

  const [data, setData] = useState([]);


  useEffect(() => {
    // setData([
    //   {
    //     key: '1',
    //     name: '翻译文章',
    //     deadline: '2022-05-21',
    //     payment: 100011,
    //   },
    //   {
    //     key: '2',
    //     name: '室内清洁',
    //     deadline: '2022-05-21',
    //     payment: 10001,
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     deadline: '2022-05-21',
    //     payment: 1000,
    //   },
    // ]);
  }, []);



  const onFinish = (values) => {
    message.info(JSON.stringify(values))
    // setData([{...values,key:values.name,deadline:moment(values.deadline).format('YYYY-MM-DD')}, ...data]);
  };

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
          onFinish={onFinish}
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
