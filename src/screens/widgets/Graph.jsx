// StackedBarChart.js
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import PropTypes from 'prop-types';

const Graph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = data.map(entry => entry.month);
    const monthlyIncome = data.map(entry => entry.monthly_income);
    const monthlyExpense = data.map(entry => entry.monthly_expense);
    const monthlyDifference = data.map(entry => entry.monthly_income + entry.monthly_expense);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Revenues',
            data: monthlyIncome,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Expenses',
            data: monthlyExpense,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Difference',
            data: monthlyDifference,
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
            text: 'Balance of monthly income and expenses'
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <div style={{ width: '80vw', height: '60vh' }}><canvas ref={chartRef}></canvas></div>;
};

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    monthly_income: PropTypes.number.isRequired,
    monthly_expense: PropTypes.number.isRequired,
  })).isRequired,
};

export default Graph;
