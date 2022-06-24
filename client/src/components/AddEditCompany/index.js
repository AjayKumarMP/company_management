import React, { useEffect } from "react";
import {Modal, Form, Input, Button, Select} from 'antd';

const { Option } = Select;

const AddEdit = ({isModalVisible = false, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(isModalVisible)
    if(isModalVisible && Object.keys(isModalVisible).length > 0) form.setFieldsValue(isModalVisible)
    else form.resetFields()
  }, [isModalVisible]);

    const onFinish = (values) => {
        console.log('Success:', values);
        handleOk({id: isModalVisible?.id, ...values})
        form.resetFields()
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const onIndustryChange = (value) => {
        form.setFieldsValue({ industry: value });
      };
    return (
        <Modal title="Basic Modal" visible={!!isModalVisible} closable onCancel={handleCancel} footer={null}>
        <Form
        form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, ...isModalVisible || {} }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="User Name"
        name="userName"
        rules={[{ required: true, message: 'Please input username!' }]}
      >
        <Input disabled={isModalVisible.userName} />
      </Form.Item>

      <Form.Item
        label="User Role"
        name="isAdmin"
        rules={[{ required: true, message: 'Please input Role!' }]}
      >
        <Select
          placeholder="Select User Role"
          onChange={onIndustryChange}
          allowClear
        >
          <Option value="true">Admin </Option>
          <Option value="false">User</Option>
        </Select>
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{marginLeft: '30%'}} onClick={() => handleCancel()} type="default" htmlType="reset">
          Cancel
        </Button>
      </Form.Item>
    </Form>
      </Modal>
    );
}

export default AddEdit;