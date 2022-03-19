import React, { useEffect } from "react";
import {Modal, Form, Input, Button, Select} from 'antd';

const { Option } = Select;


const AddEdit = ({isModalVisible = false, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(isModalVisible)
    if(isModalVisible && Object.keys(isModalVisible).length > 0) form.setFieldsValue(isModalVisible)
    else form.resetFields()
  }, [isModalVisible])
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
        label="Company Name"
        name="name"
        rules={[{ required: true, message: 'Please input company!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company Website"
        name="website"
        rules={[{ required: true, message: 'Please input website!' }, {
          validator: (_, value) => {
            let url;
            try {
              url = new URL(value);
            } catch (_) {
              return Promise.reject('Please enter a valid url');  
            }
          
            if(url.protocol === "http:" || url.protocol === "https:") return Promise.resolve();
            return Promise.reject('Please enter a valid url');
          }
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="pno"
        rules={[{ required: true, message: 'Please input Phone Number!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Company Address"
        name="address"
        rules={[{ required: true, message: 'Please input your company address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company City"
        name="city"
        rules={[{ required: true, message: 'Please input company city!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company State"
        name="state"
        rules={[{ required: true, message: 'Please input company state!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company Country"
        name="country"
        rules={[{ required: true, message: 'Please input company country!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Industry"
        name="industry"
        rules={[{ required: true, message: 'Please input Industry!' }]}
      >
        <Select
          placeholder="Select an Industry"
          onChange={onIndustryChange}
          allowClear
        >
          <Option value="ACCOUNT">Account </Option>
          <Option value="IT">IT</Option>
          <Option value="SALES">Sales</Option>
          <Option value="HEALTH CARE">Health Care</Option>
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