import React, { useEffect } from 'react';
import { Table, Input, Button, Space, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../Header';
import { GET } from '../../rest-client'

const { Option } = Select;
const testStatus = ['Failed', 'Passed', 'Skipped']
const testPriority = ['Config', 'P1', 'P2', 'P3']
const Dropdown = ({title, onIndustryChange, options}) => {
  return (
    <Select
        placeholder={title}
        onChange={onIndustryChange}
        allowClear
        style={{margin: '10px'}}
      >{
        options?.map(opt => 
          <Option value={opt}>{opt}</Option>
          )
      }
      </Select>
  )
}


const ApiResults = ({onIndustryChange}) => {
  const [searchText, setSearchText] = React.useState('');
  const [searchColumn, setSearchColumn] = React.useState('name');
  const [data, setData] = React.useState([]);
  const [metaData, setMetaData] = React.useState([]);

  const refresh = async () => {
    const results = await GET('APITest/getResults', {});
    setData([...results.responseData]);
  };

  useEffect(() => {
    refresh();
    (async () => {
      const metadata = await GET('APITest/getMetadata');
      setMetaData(metadata.responseData);
    })()
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

  const columns = [
    {
      title: 'insightName',
      dataIndex: 'insightName',
      key: 'insightName',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'testFailureReason',
      dataIndex: 'testFailureReason',
      key: 'testFailureReason',
      width: '18%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'buildInfo',
      dataIndex: 'buildInfo',
      key: 'buildInfo',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'executionDate',
      dataIndex: 'executionDate',
      key: 'executionDate',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'testStatus',
      dataIndex: 'testStatus',
      key: 'testStatus',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'executionSource',
      dataIndex: 'executionSource',
      key: 'executionSource',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'executionEnvironment',
      dataIndex: 'executionEnvironment',
      key: 'executionEnvironment',
      ...getColumnSearchProps('name'),
    }
  ];


  return <div>
    <Header />
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <Dropdown
      title="Select insightName"
      options={metaData.insightNamesList}
      onIndustryChange={onIndustryChange}
      />
      <Dropdown
      title="Select buildInfoList"
      options={metaData.buildInfoList}
      onIndustryChange={onIndustryChange}
      />
      <Dropdown
      title="Select testStatus"
      options={testStatus}
      onIndustryChange={onIndustryChange}
      />
      <Dropdown
      title="Select testPriority"
      options={testPriority}
      onIndustryChange={onIndustryChange}
      />
      <Input style={{width: '10%', margin: '10px'}} type="text" placeholder='Enter testCaseId' />
      <DatePicker style={{margin: '10px'}} placeholder='fromDate' />
      <DatePicker style={{margin: '10px'}} placeholder='toDate' />
    </div>
    <Table columns={columns} dataSource={data} />;
  </div>
}

export default ApiResults;