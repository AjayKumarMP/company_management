import { Form, Input, Button, notification } from 'antd';
import {useNavigate} from 'react-router-dom'
import {POST} from '../../rest-client'

const Signup = () => {
  const [form] = Form.useForm()
    let navigate = useNavigate();
  const onFinish = async(values) => {
    console.log('Success:', values);
    const result =await POST({url: '/user/create', requestBody: {username: values.username, password: values.password}})
    console.log(result);
    form.resetFields();
    notification.success({message: 'Success', description: 'Signup Successful'})
    navigate('/')

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{height: '700px', marginTop: '15%'}}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="re-enter-password"
        name="repassword"
        rules={[{ required: true, message: 'Please input your password!', }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;