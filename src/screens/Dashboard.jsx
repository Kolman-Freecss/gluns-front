import LineChart from '../test/LineChart';
import BarChart from '../test/BarChart';
import PieChart from '../test/PieChart';

export default function Dashboard() {
  return (
    <div className="flex h-full w-full justify-center place-items-center">
      <div className='flex flex-row justify-between w-full p-5'>
        <div className='flex flex-col'>
          <LineChart />
          <p>Any text that will come from the back to put under the graphic.</p>
        </div>
        <div className='flex flex-col'>
          <BarChart />
          <p>Any text that will come from the back to put under the graphic.</p>
        </div>
        <div className='flex flex-col'>
          <PieChart />
          <p>Any text that will come from the back to put under the graphic.</p>
        </div>
      </div>
    </div>
  );
}