import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.destroy();
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  return <Pie ref={chartRef} data={data} />;
};

export default MyChart;
