import StackedBars from '../test/StackedBars';

export default function Dashboard() {
  return (
    <div className="flex h-full w-full justify-center place-items-center">
      <div className='flex flex-row justify-center w-full p-5'>
        <div className='flex flex-col'>
          <StackedBars />
          <p>Any text that will come from the back to put under the graphic.</p>
        </div>
      </div>
    </div>
  );
}