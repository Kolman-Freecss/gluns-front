import ChatRepository from '../api_requests/Chat';
import { useEffect, useState } from 'react';
import NotAccessible from './widgets/NotAccessible';
import TipsRepository from '../api_requests/Tips';
import { marked } from 'marked';

export default function Tips() {
  const [chatList, setChatList] = useState([]);
  const [tips, setTips] = useState([]);
  const [openTipId, setOpenTipId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChatList = async () => {
    try {
      const response = await ChatRepository.chat();
      const newChatList = response.data.body.map((chat) => ({
        id: chat.chatHistoryId,
        name: chat.message,
      }));
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

        const formattedTipsList = Array.isArray(response.body)
          ? response.body.map((tip, index) => ({
              id: index + 1,
              title: tip.title,
              content: tip.output,
            }))
          : [];

        setTips(formattedTipsList);
      } catch (error) {
        console.error('Error fetching tips list:', error);
        setTips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleToggle = (tipId) => {
    setOpenTipId(openTipId === tipId ? null : tipId);
  };

  return chatList.length !== 0 ? (
    <div className="p-5">
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton h-32 w-full rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="collapse bg-base-200"
              onClick={() => handleToggle(tip.id)}
            >
              <input
                type="radio"
                name="my-accordion"
                checked={openTipId === tip.id}
                onChange={() => handleToggle(tip.id)}
              />
              <div className="collapse-title">
                <div className="text-xl font-medium">{tip.title}</div>
                <div className={`${openTipId === tip.id ? "hidden" : ""}`}>
                  {tip.content.slice(0, 50)}...
                </div>
              </div>
              <div
                className="collapse-content"
                dangerouslySetInnerHTML={{
                  __html: openTipId === tip.id ? marked(tip.content) : marked(`${tip.content.slice(0, 120)}...`)
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <NotAccessible />
  );
}
