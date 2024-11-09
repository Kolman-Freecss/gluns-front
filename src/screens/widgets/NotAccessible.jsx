import { FaRocketchat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotAccessible() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-base-content">
      <div className="flex flex-col items-center">
        <FaRocketchat className="text-6xl text-primary animate-bounce" />
        <h1 className="text-4xl font-bold mt-4">Hold Up, Chat First!</h1>
        <p className="text-lg mt-2 text-center max-w-md">
          <span className='animate-bounce'>👋 </span>Hey there! Before you dive into the tips, we need a little chit-chat!
        </p>
        <p className="text-lg mt-2 text-center max-w-md">
        <span className='animate-bounce'>👋</span> Think of it like a password... but more fun. Head over to our chat first and say hello! The tips are just a quick convo away. <span className='animate-bounce'>😄</span>
        </p>
      </div>
      <Link to="/chat" className="btn btn-primary mt-8">
        Go Chat
      </Link>
    </div>
  );
}
