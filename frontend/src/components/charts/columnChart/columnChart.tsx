import React from "react";
import ReactApexChart from "react-apexcharts";

 const ColumnChart = () => {
        const [state, setState] = React.useState({
          
            series: [{
              data: [21, 22, 10, 28, 16, 21, 13, 30]
            }],
            options: {
              chart: {
                height: 350,
                type: 'bar' as const,
                
              },
              
              plotOptions: {
                bar: {
                  columnWidth: '45%',
                  distributed: false,
                }
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              xaxis: {
                categories: [
                  ["1"],
                    ["2"],
                    ["3"],
                    ["4"],
                    ["5"], 
                ],
                labels: {
                  style: {
                    
                    fontSize: '12px'
                  }
                }
              }
            },
          
          
        });

        

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
      }

      export default ColumnChart;

      
    