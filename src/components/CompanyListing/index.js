import React, { useEffect } from 'react';
import { Table, Input, Button, Space, Modal, notification } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Header from '../Header';
import AddEdit from '../AddEditCompany';
import {DELETE, GET, PATCH, POST} from '../../rest-client'
import { useNavigate } from 'react-router-dom';

const {confirm} = Modal;

export const Listing = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchColumn, setSearchColumn] = React.useState('name');
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const router = useNavigate()

  const refresh = async() => {
    const results = await GET('APITest/users', {});
    console.log(results);
    setData(results?.data?.responseData);
  };

  useEffect(() => {
    if(!sessionStorage.getItem('isAdmin') || sessionStorage.getItem('isAdmin') === "false")  router('/analytics')
   refresh();
  }, [])

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchText = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchText.select(), 100);
      }
    },
    render: text =>
        text
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
              setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
   const showConfirm = (value) => {
    confirm({
      title: `Do you Want to ${value.isActive === 'true' ? 'disable': 'enable'} this User?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Once done can"t be reverted',
      onOk() {
        (async () => {
          await DELETE('APITest/user/'+value.userName, {id: value.id})
          refresh();
        })()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      ...getColumnSearchProps('name'),
      render: (value) => (<p>{value ? "Yes" : "No"}</p>)
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      ...getColumnSearchProps('name'),
      render: (value) => (<p>{value ? "Active" : "In-Active"}</p>)
    },
    {
      title: 'Create At',
      dataIndex: 'createdDate',
      key: 'createdDate',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Create By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (row) => <>
      <EditOutlined onClick={() => setVisible(row)} style={{marginRight: '15px', cursor: 'pointer'}} />
      <DeleteOutlined onClick={() =>showConfirm(row)} style={{cursor: 'pointer'}}/>
      </>,
    },
  ];

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      if(values.id){
        await PATCH('APITest/user/'+values.userName, values)
      } else
      await POST({url: 'APITest/user', requestBody: values})
      notification.success({message: 'Company added successfully'})
      setVisible(false);
      refresh();
    } catch (error) {
      console.error(error);
  notification.error({message: 'Error adding company'});      
    }
  }
  
  return <div>
        <AddEdit isModalVisible={visible} handleOk={(values) => handleSubmit(values)} handleCancel={() =>  setVisible(false)} />
        <Header />
        <Button onClick={() => setVisible({})} type='primary' style={{float: 'right', marginRight: '20px'}}>Add New +</Button>
        <Table columns={columns} dataSource={data} />;
        </div>
}

export default Listing;