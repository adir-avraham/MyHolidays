import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import LinearIndeterminate from 'components/loader';




export default function Report() {
  
  const [report, setReport] = useState([]);
  
  useEffect (() => {   
    const followersReport = async () => {
      const result = await mainAxios.post('/followersReport');
      const { report } = result.data 
      setReport(report) 
    } 
    followersReport();
  },[])
  
  
  const data = {
    labels: report.map((item: any) => item.destination),
    datasets: [
      {
        label: 'Followers',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: report.map((item: any) => item.sum_of_followers)
      }
    ]
  };
     
  const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
  }
 
  if (!Array.isArray(report)) return <LinearIndeterminate/>;
    return (
      <div>
        <h2>Followers Report</h2>
        <Bar data={data}
        options={options}
        />
      </div>
    )  
}
  
  

// const data = {
//   labels: report.map((item: any) => item.destination),
//   datasets: [
//     {
//       label: 'Followers',
//       backgroundColor: 'rgb(227,51,113)',
//       borderColor: 'rgba(255,99,132,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgb(220,0,78)',
//       hoverBorderColor: 'rgba(255,99,132,1)',
//       data: report.map((item: any) => item.sum_of_followers)
//     }
//   ]
// };