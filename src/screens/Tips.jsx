import ChatRepository from '../api_requests/Chat';
import { useEffect, useState } from 'react';
import NotAccessible from './widgets/NotAccessible';

export default function Tips() {
  const [chatList, setChatList] = useState([]);
  const tips = [
    {
      id: 1,
      title: "Tip 1: Monitor Your Spending",
      content: "Keep track of your expenses regularly to understand your spending habits and adjust your budget if needed.",
    },
    {
      id: 2,
      title: "Tip 2: Set Savings Goals",
      content: "Define clear savings goals. Whether it's for an emergency fund or a major purchase, having goals helps you save efficiently.",
    },
    {
      id: 3,
      title: "Tip 3: Avoid Unnecessary Fees",
      content: "Be aware of hidden fees in your accounts. Avoid overdrafts and check for fee-free options when using ATMs.",
    },
    {
      id: 4,
      title: "Tip 4: Build an Emergency Fund",
      content: "Set aside a portion of your income for unexpected expenses. Aim to have 3-6 months' worth of expenses saved.",
    },
    {
      id: 5,
      title: "Tip 5: Regularly Check Your Credit Report",
      content: "Review your credit report annually to ensure accuracy and detect any suspicious activities early.",
    },
    {
      id: 6,
      title: "Tip 6: Pay Off High-Interest Debt",
      content: "Focus on paying off debt with the highest interest rates first to save money on interest payments.",
    },
  ];

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
