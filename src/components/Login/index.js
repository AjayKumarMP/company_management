import { Form, Input, Button, notification } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import {POST} from '../../rest-client'

const Login = () => {
    let navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const result = await POST({url: 'authenticate', requestBody: {username: values.username, password: values.password}});
      console.log(result);
      if(result?.data?.jwtToken){
      sessionStorage.setItem('token', result?.data?.jwtToken)
      sessionStorage.setItem('userName', result?.data?.userName)
      sessionStorage.setItem('isAdmin', result?.data?.isAdmin)
      navigate('/analytics')
      }
      notification.success({message:  "Login Successful"})
    } catch (error) {
      console.log(error)
      notification.error({message: 'Login Failed', description: "Check UserName/Password"})
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <br />
        <br />       
      </Form.Item>
    </Form>
  );
};

export default Login;