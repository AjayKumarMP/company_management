import React from "react";
import {PageHeader, Button} from 'antd'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const router = useNavigate();
    return <PageHeader
    style={{background: 'lightblue'}}
    className="site-page-header"
    title="Company Management"
    subTitle=""
    extra={[
        <Button onClick={() => router('/')} key="1" type="dashed">
          Logout
        </Button>,
      ]}
  />
}

export default Header;