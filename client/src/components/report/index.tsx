import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import LinearIndeterminate from 'components/loader';



export default function Report () {

  const [report, setReport] = useState([]);

  useEffect (() => {

    const followersReport = async () => {
      const {data} = await mainAxios.post('/followersReport');
      console.log(data)
      setReport(data) 
    } 
    followersReport();

  },[])
  

  if (!Array.isArray(report)) return <LinearIndeterminate/>;
  return (
    <Paper>
      <Chart data={report}>
        <ArgumentAxis/>
        <ValueAxis/>

        <BarSeries
          valueField="sum_of_followers"
          argumentField="destination"    
        />
        <Title text="Holidays followers report" />
        <Animation />
      </Chart>
    </Paper>
  );
}

