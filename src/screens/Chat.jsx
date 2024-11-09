import { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import ChatRepository from '../api_requests/Chat';
import MessageOut from '../screens/widgets/MessageOut';
import MessageIn from '../screens/widgets/MessageIn';

function Chat() {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState({ id: '', name: '' });
  const [selectedChat, setSelectedChat] = useState(null);
  const [contextList, setContextList] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      in: true,
      text: `Hello! How can I help you?`,
    },
  ]);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

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
    setSelectedChat({ id: chatList.length + 1, name: 'New Chat' });
  }, []);
  
  
  

  useEffect(() => {
    const fetchContextList = async () => {
      try {
        const response = await ChatRepository.contexts();  
        const formattedContextList = Array.isArray(response.data.body)
          ? response.data.body.map((name) => ({ id: name, name: name.replace(/_/g, ' ').toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }))
          : [];
  
        setContextList(formattedContextList);
      } catch (error) {
        console.error('Error fetching context list:', error);
        setContextList([]);
      }
    };
  
    fetchContextList();
  }, []);

  const handleInput = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.25);
    textarea.style.height = `${newHeight}px`;
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, in: false, text: message },
    ]);

    setLoading(true);

    try {
      const response = await ChatRepository.request(selectedChat != null ? selectedChat.id : 0, context.id, message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, in: true, text: response.body.next.message },
      ]);

      await fetchChatList();

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }

    setMessage('');
    textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && context.name !== '') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex h-full w-screen overflow-hidden transition-all duration-300">
      <div className={`w-full flex flex-col place-items-center`}>
        <div className='m-5'>
          <button className='btn rounded-2xl' onClick={() => document.getElementById('history').showModal()}>History</button>
        </div>
        <div className={`h-full w-1/2 overflow-auto scrollbar-hide ${context.name === '' ? "hidden" : ''}`}>
          {messages.map((message) => (
            message.in ? (
              <div key={message.id} className='chat chat-start'>
                <MessageIn> {message.text} </MessageIn>
              </div>
            ) : (
              <div key={message.id} className='chat chat-end'>
                <MessageOut > {message.text} </MessageOut>
              </div>
            )
          ))}
          {loading && (
            <div className="chat chat-start">
              <span className="loading loading-dots loading-xl"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className={`flex place-items-center px-40 w-full bg-transparent flex-col-reverse h-10* z-10 gap-2 ${context.name !== '' ? "mb-15" : "justify-center h-full"}`}>
          <p className="font-thin text-xs place-self-center mt-1 mb-1">There may be mistakes in the answers.</p>
          <div className={`w-full p-4 flex gap-3 justify-center place-items-center`}>
            <div className={`dropdown dropdown-top ${context.name === '' ? "hidden" : ''}`}>
              <div tabIndex={0} role="button" className="btn m-1">{context.name}</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                {contextList.map((item) => (
                  <li key={item.id} className="btn btn-sm btn-block btn-ghost" onClick={() => setContext(item)}>{item.name}</li>
                ))}
              </ul>
            </div>
            <textarea
              ref={textareaRef}
              value={message}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              className="w-1/5 p-4 rounded-3xl focus:outline-none bg-base-300 resize-none overflow-y scrollbar-hide focus:w-1/2 transition-all duration-300"
              rows={1}
            />
            <button
              className={`btn btn-square border border-current rounded-2xl ${context.name === '' ? 'disabled' : ''}`}
              onClick={handleSendMessage}
              disabled={context.name === ''}
            >
              <IoSend size={20} />
            </button>
          </div>
          <p className={`text-accent opacity-90 font-bold ${context.name !== '' ? "hidden" : ""}`} >It is necessary to select a context.name in order to formulate the question.</p>
          <div className={`flex gap-4 ${context.name !== '' ? "hidden" : ""}`}>
            {contextList.map((item) => (
              <button key={item.id} className='rounded-3xl btn btn-secondary p-4' onClick={() => setContext(item)}> {item.name} </button>
            ))}
          </div>
        </div>
      </div>
      <dialog id="history" className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog" className='flex justify-between w-full'>
              <h1 className="text-2xl font-bold">Chat History</h1>
              <button><RxCross2 size={25} /></button>
            </form>
          </div>
          <ul className="menu rounded-box flex gap-2">
            {Array.isArray(chatList) && chatList.map((chat) => (
              <li key={chat.id} className='bg-base-300 rounded-xl'><a>{chat.name}</a></li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}

export default Chat;
