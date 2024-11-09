// StackedBarChart.js
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const StackedBars = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Revenues',
            data: [50, 30, 70, 20, 60, 10, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'expenses',
            data: [-100, -50, -20, -60, -40, -30, -50],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'difference',
            data: [-50, -10, 50, -40, 20, -20, -10],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenues, expenses y difference'
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <div style={{ width: '40vw', height: '40vh' }}><canvas ref={chartRef}></canvas></div>;
};

export default StackedBars;
