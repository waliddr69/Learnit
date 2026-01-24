
import React from 'react';
import ReactApexChart from 'react-apexcharts';

 const ApexChart = () => {
        const [state, _setState] = React.useState({
          
            series: [{
              name: 'series1',
              data: [31, 40, 28, 51, 42, 109, 100]
            }, {
              name: 'series2',
              data: [11, 32, 45, 32, 34, 52, 41]
            }],
            options: {
              chart: {
                width: '100%',
                height: 350,
                type: 'area' as const
              },
              dataLabels: {
                enabled: true
              },
              stroke: {
                curve: 'smooth' as const
              },
              xaxis: {
                type: 'datetime' as const,
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                },
              },
            },
          
          
        });

        

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
      }

      export default ApexChart;
    