import ChatRepository from '../api_requests/Chat';
import { useEffect, useState } from 'react';
import NotAccessible from './widgets/NotAccessible';
import TipsRepository from '../api_requests/Tips';

export default function Tips() {
  const [chatList, setChatList] = useState([]);
  const [tips, setTips] = useState([]);

  const fetchChatList = async () => {
    try {
      const response = await ChatRepository.chat();
      const newChatList = response.data.body.map((chat) => ({ id: chat.chatHistoryId, name: chat.message }));
      setChatList(newChatList);
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };
  
  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await TipsRepository.tips();  
        const formattedTipsList = Array.isArray(response.data.body)
          ? response.data.body.map((tip, index) => ({ id: index + 1, title: tip.title, content: tip.output }))
          : [];
  
        setTips(formattedTipsList);
      } catch (error) {
        console.error('Error fetching tips list:', error);
        setTips([]);
      }
    };
  
    fetchTips();
  }, []);

  return (
    chatList.length !== 0 ? (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div
            key={tip.id}
            className={`card card-bordered bg-neutral text-neutral-content p-5 flex flex-col justify-between ${
              index % 3 === 2 ? 'col-span-2' : 'col-span-1'
            } animate-fall`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="card-title text-xl mb-2">{tip.title}</h2>
            <p className="text-base">{tip.content}</p>
          </div>
        ))}
      </div>
    </div> ) : (
      <NotAccessible />)
  );
}
