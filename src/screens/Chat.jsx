import { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import ChatRepository from '../api_requests/Chat';

function Chat() {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
  const [contextList, setContextList] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Java' },
    { id: 5, name: 'C#' },
    { id: 6, name: 'C++' },
    { id: 7, name: 'SQL' },
    { id: 8, name: 'HTML' },
    { id: 9, name: 'CSS' },
    { id: 10, name: 'React' },
    { id: 11, name: 'Angular' },
    { id: 12, name: 'Vue' },
    { id: 13, name: 'PHP' },
    { id: 14, name: 'Ruby' },
    { id: 15, name: 'Swift' },
    { id: 16, name: 'Kotlin' },
    { id: 17, name: 'Dart' },
    { id: 18, name: 'Rust' },
    { id: 19, name: 'Go' },
    { id: 20, name: 'TypeScript' },
  ]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      in: true,
      text: `# Hola, ¿cómo estás?\nSoy un **mensaje** con formato _Markdown_ y código:\n\n\`\`\`javascript\nconst saludo = '¡Hola!';\nconsole.log(saludo);\n\`\`\``,
    },
    {
      id: 2,
      in: false,
      text: `## Hola, bien gracias.\nAquí tienes una lista:\n- Elemento 1\n- Elemento 2\n- **Elemento importante**\n\nTambién tengo un bloque de código:\n\`\`\`python\nprint("Hola Mundo")\n\`\`\``,
    },
    {
      id: 3,
      in: true,
      text: `### ¿Qué has hecho hoy?\nHe aprendido a usar \`ReactMarkdown\` y este es otro bloque de código en **HTML**:\n\`\`\`html\n<h1>Hola desde HTML</h1>\n<p>Este es un párrafo en HTML</p>\n\`\`\``,
    },
  ]);
  const [chatList, setChatList] = useState([]);

  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await ChatRepository.chat(); // Añade await
        setChatList(response.data);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchContextList = async () => {
      try {
        const response = await ChatRepository.contexts(); // Añade await
        setContextList(response.data);
      } catch (error) {
        console.error('Error fetching context list:', error);
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

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, in: false, text: message },
    ]);
    setMessage('');
    textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full w-screen overflow-hidden transition-all duration-300">
      <div className={`w-full flex flex-col place-items-center`}>
        <div className='m-5'>
          <button className='btn rounded-2xl' onClick={() => document.getElementById('history').showModal()}>History</button>
        </div>
        <div className={`flex h-full place-items-center px-40 w-full bg-transparent flex-col-reverse h-10* z-10 gap-2 ${context !== '' ? "mb-15" : "justify-center"}`}>
          <p className="font-thin text-xs place-self-center mt-1 mb-1">There may be mistakes in the answers.</p>
          <div className={`w-full p-4 flex gap-3 justify-center place-items-center`}>
            <div className="dropdown dropdown-top">
              <div tabIndex={0} role="button" className="btn m-1">Context</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                {contextList.map((item) => (
                  <li key={item.id} className="btn btn-sm btn-block btn-ghost" onClick={() => setContext(item.id)}>{item.name}</li>
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
              className={`btn btn-square border border-current rounded-2xl ${context === '' ? 'disabled' : ''}`}
              onClick={handleSendMessage}
              disabled={context === ''}
            >
              <IoSend size={20} />
            </button>
          </div>
          <p className={`text-accent opacity-90 font-bold ${context !== '' ? "hidden" : ""}`} >It is necessary to select a context in order to formulate the question.</p>
          <div className={`flex gap-4 ${context !== '' ? "hidden" : ""}`}>
            {contextList.map((item) => (
              <button key={item.id} className='rounded-3xl btn btn-secondary p-4' onClick={() => setContext(item.id)}> {item.name} </button>
            ))}
          </div>
        </div>
      </div>
      <dialog id="history" className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <button><RxCross2 size={25} /></button>
            </form>
          </div>
          <ul className="menu rounded-box">
            {chatList.map((chat) => (
              <li key={chat.id}><a>{chat.name}</a></li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}

export default Chat;
