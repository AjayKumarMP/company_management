import React, { useState } from "react";
import {PageHeader, Button, Avatar, Dropdown, Menu, Modal, Input, notification} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons'
import { PATCH } from "../../rest-client";

const Header = () => {
    const router = useNavigate();
    const resetPassword =async () => {
      try {
        const userName = sessionStorage.getItem('userName')
        await PATCH('APITest/user/'+userName, {password})
        notification.success({message: 'password changes'});
        sessionStorage.clear();
        router('/')
      } catch (error) {
        notification.error({message: 'Error while updating password'})
      }
    }
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState(false)
    return <><PageHeader
    style={{background: 'lightblue'}}
    className="site-page-header"
    title="Insights API Test Dashboard"
    subTitle=""
    extra={[
      sessionStorage.getItem('isAdmin') && sessionStorage.getItem('isAdmin') === "true" ? <Link style={{marginRight: '15px', textDecoration: 'underline', color: 'black'}} title="User Management" key="dash" to="/dashboard">User Management</Link>: <></>,
      <Link key="results" style={{marginRight: '15px', textDecoration: 'underline', color: 'black'}} title="Test Results" to="/apiResults" >Test Results</Link>,
      <Link key="analytics" style={{marginRight: '15px', textDecoration: 'underline', color: 'black'}} title="Test Analysis" to="/analytics" >Test Analysis</Link>,
        <Button key="logout" onClick={() => {sessionStorage.clear();router('/')} } type="dashed">
          Logout
        </Button>,
        <Dropdown key="menu" overlay={() => <Menu items={[{key: 1, label: (<p onClick={() => setShow(true)}>Reset Password</p>)}]} />}>
          <Avatar  icon={<UserOutlined />} />

        </Dropdown>
      ]}
  />
  <Modal onCancel={() => setShow(false)} onOk={() => resetPassword()} visible={show}>
    <Input onChange={val => setPassword(val.target.value)} type="password" placeholder="enter your new password" />
  </Modal>
  </>
}

export default Header;