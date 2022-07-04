import React, { useEffect, useState } from 'react';
import { Pie , Bar} from 'react-chartjs-2';
import './index.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {Table }from 'antd'
import Header from '../Header';
import { GET } from '../../rest-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const format = ({config,p1, p2, p3}, label) => ({
  labels: [label],
  datasets: [
    {
      label: 'Config',
      data: [config],
      backgroundColor: 'rgba(300,255, 255, 132, 0.5)',
    },
    {
      label: 'P1',
      data: [p1],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'P2',
      data: [p2],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'P3',
      data: [p3],
      backgroundColor: 'rgba(54, 162, 135, 0.5)',
    },
  ],
});



const Anaylytics = ()=> {
  const [barData, setBarData] = useState([]) 
  const [dataSource, setDataSource] = useState([]) 
  const [datasets, setDatasets] = useState({datasets: [{data: []}], labels: []});
  useEffect(() => {
    (async() =>{
      try {
        const {data: {responseData}} = await GET('APITest/getAnalysedResults', {})
        let temp = {
          labels: ['Passed', 'Failed', 'Skipped'],
          total: responseData.analysedResults.total,
          datasets: [
            {
              label: 'Test Results',
              data:[responseData.analysedResults.passed, responseData.analysedResults.failed, responseData.analysedResults.skipped],
              backgroundColor: [         
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [         
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        temp.datasets[0].data = [responseData.analysedResults.passed, responseData.analysedResults.failed, responseData.analysedResults.skipped]
        setDatasets({...temp});
        temp = [];
        responseData.analysedResults.resultsCategorization.forEach(record => {
          if(record.testResultType !== 'PASSED'){
            temp.push(format(record.testsPriorityDetail, record.category))
          }
        })
        setBarData(temp);
        setDataSource(Object.keys(responseData.analysedResults.insightsExecutionDetail).map(key => ({
          name: key,
          value: responseData.analysedResults.insightsExecutionDetail[key],
          key
        })))
        console.log( '-------', temp)
      } catch (error) {
        console.error(error.message)
      }

    })()
  }, []);
  
  const columns = [
    {
      title: 'InsightName',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Percentage',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  
  const resultColumns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Percentage',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return <>
  <Header />
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'row', marginBottom: '-8px'}}>
  <div style={{width: '25%', height: '25%'}}>
  <Pie data={datasets}
  width={40}
  height={50}
  options={{
    responsive: true,
    maintainAspectRatio: true,
  }}
  />
  </div>
  <Table pagination={false} dataSource={[{name: "Passed", value: ((datasets.datasets[0].data[0]/datasets.total)*100).toFixed(2)+"%"},
{name: "Failed", value: ((datasets.datasets[0].data[1]/datasets.total)*100).toFixed(2)+"%"},
{name: "Skipped", value: ((datasets.datasets[0].data[2]/datasets.total)*100).toFixed(2)+"%"},
]} columns={resultColumns} style={{flex: '0 0 10%'}} />
  <Table dataSource={dataSource} columns={columns} style={{flex: '0 0 10%', borderLeft: '1px solid lightgrey'}} />
  
  </div>
  <hr />
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '2%'}}>
  {barData.map(bar =>
  <div style={{width: '30%', height: '30%', flex: '0 0 30.33%', marginBottom: '3%', boxShadow: '0px 0px 7px 0px'}}>
    <Bar options={options} data={bar} />
  </div>
    )}

  </div>
  </>
}
export default Anaylytics;