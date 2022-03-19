import React, { useEffect } from 'react';
import { Table, Input, Button, Space, Modal, notification } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Header from '../Header';
import AddEdit from '../AddEditCompany';
import {DELETE, GET, POST} from '../../rest-client'

const {confirm} = Modal;

export const Listing = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchColumn, setSearchColumn] = React.useState('name');
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);

  const refresh = async() => {
    const results = await GET('/fetch', {});
    setData(results.data.data);
  };

  useEffect(() => {
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
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Once done can"t be reverted',
      onOk() {
        (async () => {
          await DELETE('/delete', {id: value.id})
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
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Company Website',
      dataIndex: 'website',
      key: 'website',
      ...getColumnSearchProps('website'),
    },
    {
      title: 'Company Phone Number',
      dataIndex: 'pno',
      key: 'pno',
      ...getColumnSearchProps('pno'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Company Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Company City',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'Company State',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'Company Country',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      ...getColumnSearchProps('industry'),
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
      await POST({url: '/create', requestBody: values})
      notification.success({message: 'Company added successfully'})
      setVisible(false);
      refresh();
    } catch (error) {
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