import { FaHammer } from 'react-icons/fa';

export default function WorkingOn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content">
      <div className="flex flex-col items-center">
        <FaHammer className="text-6xl text-primary animate-bounce" />
        <h1 className="text-4xl font-bold mt-4">We are Working On It</h1>
        <p className="text-lg mt-2 text-center max-w-md">
          This page is currently under development. Please check back later to see the updates. We are working hard to bring you the best experience!
        </p>
      </div>
      <button className="btn btn-primary mt-8" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
}
