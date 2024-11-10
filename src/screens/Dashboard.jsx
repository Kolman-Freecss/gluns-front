import { useEffect, useState } from 'react';
import DashboardService from '../api_requests/Dashboard';
import Graph from './widgets/Graph';

export default function Dashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardService.dashboard();

        console.log('Dashboard data:', response.body);
        
        const currentYear = new Date().getFullYear();
        const filteredData = response.body.filter(entry => {
          const entryYear = new Date(entry.month).getFullYear();
          return entryYear >= currentYear;
        });

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full justify-center place-items-center">
      <div className='flex flex-row justify-center w-full p-5'>
        <div className='flex flex-col'>
          <Graph data={data} />
        </div>
      </div>
    </div>
  );
}