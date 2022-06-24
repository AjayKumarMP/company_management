import React from 'react';
import Header from '../Header';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const Analytics = () => {
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
      ];
    
    const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      };
    return (
        <div>
            <Header />
            <Pie 
            width={50}
            height={50}
            // options={{ maintainAspectRatio: false }}
             data={data} />
        </div>
    )
}
export default Analytics;