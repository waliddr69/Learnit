

import ReactApexChart from 'react-apexcharts';

type params = {
  data:number[],
  date : string[],
  name:string
}

 const ApexChart = ({data,date,name}:params) => {
  console.log(date,data)
         const series = [
    {
      name,
      data: data,
    },
  ];

  const options = {
    chart: {
      type: 'area' as const,
      height: 350,
      width: '100%',
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth' as const,
    },
    xaxis: {
      type: 'datetime' as const,
      categories: date,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy',
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default ApexChart;
