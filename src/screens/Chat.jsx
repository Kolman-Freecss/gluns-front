import { useState, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


function Chat() {


  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
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

  const textareaRef = useRef(null);

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

  const chatList = [
    { id: 1, selected: true, name: "Primer Chat" },
    { id: 2, selected: false, name: "Segundo Chat" },
    { id: 3, selected: false, name: "Tercer Chat" },
    { id: 4, selected: false, name: "Cuarto Chat" },
    { id: 5, selected: false, name: "Quinto Chat" },
    { id: 6, selected: false, name: "Sexto Chat" },
    { id: 7, selected: false, name: "Séptimo Chat" },
    { id: 8, selected: false, name: "Octavo Chat" },
    { id: 9, selected: false, name: "Noveno Chat" },
    { id: 10, selected: false, name: "Décimo Chat" },
    { id: 11, selected: false, name: "Undécimo Chat" },
    { id: 12, selected: false, name: "Duodécimo Chat" },
    { id: 13, selected: false, name: "Decimotercer Chat" },
    { id: 14, selected: false, name: "Decimocuarto Chat" },
    { id: 15, selected: false, name: "Decimoquinto Chat" },
    { id: 16, selected: false, name: "Decimosexto Chat" },
    { id: 17, selected: false, name: "Decimoséptimo Chat" },
    { id: 18, selected: false, name: "Decimoctavo Chat" },
    { id: 19, selected: false, name: "Decimonoveno Chat" },
    { id: 20, selected: false, name: "Vigésimo Chat" },
    { id: 21, selected: false, name: "Vigésimo Primer Chat" },
    { id: 22, selected: false, name: "Vigésimo Segundo Chat" },
    { id: 23, selected: false, name: "Vigésimo Tercer Chat" },
    { id: 24, selected: false, name: "Vigésimo Cuarto Chat" },
    { id: 25, selected: false, name: "Vigésimo Quinto Chat" },
    { id: 26, selected: false, name: "Vigésimo Sexto Chat" },
    { id: 27, selected: false, name: "Vigésimo Séptimo Chat" },
    { id: 28, selected: false, name: "Vigésimo Octavo Chat" },
    { id: 29, selected: false, name: "Vigésimo Noveno Chat" },
    { id: 30, selected: false, name: "Trigésimo Chat" },
    { id: 31, selected: false, name: "Trigésimo Primer Chat" },
    { id: 32, selected: false, name: "Trigésimo Segundo Chat" },
    { id: 33, selected: false, name: "Trigésimo Tercer Chat" },
    { id: 34, selected: false, name: "Trigésimo Cuarto Chat" },
    { id: 35, selected: false, name: "Trigésimo Quinto Chat" },
    { id: 36, selected: false, name: "Trigésimo Sexto Chat" },
    { id: 37, selected: false, name: "Trigésimo Séptimo Chat" },
    { id: 38, selected: false, name: "Trigésimo Octavo Chat" },
    { id: 39, selected: false, name: "Trigésimo Noveno Chat" },
    { id: 40, selected: false, name: "Cuadragésimo Chat" },
    { id: 41, selected: false, name: "Cuadragésimo Primer Chat" },
    { id: 42, selected: false, name: "Cuadragésimo Segundo Chat" },
    { id: 43, selected: false, name: "Cuadragésimo Tercer Chat" },
    { id: 44, selected: false, name: "Cuadragésimo Cuarto Chat" },
    { id: 45, selected: false, name: "Cuadragésimo Quinto Chat" },
    { id: 46, selected: false, name: "Cuadragésimo Sexto Chat" },
    { id: 47, selected: false, name: "Cuadragésimo Séptimo Chat" },
    { id: 48, selected: false, name: "Cuadragésimo Octavo Chat" },
    { id: 49, selected: false, name: "Cuadragésimo Noveno Chat" },
    { id: 50, selected: false, name: "Quincuagésimo Chat" }
  ];


  const contextList = [
    { id: 1, name: "Context 1" },
    { id: 2, name: "Context 2" },
    { id: 3, name: "Context 3" },
    { id: 4, name: "Context 4" },
    { id: 5, name: "Context 5" },
  ];

  return (
    <div className="flex h-full w-screen overflow-hidden transition-all duration-300">
      <div className={`w-full flex flex-col place-items-center`}>
        <div className='m-5'>
          <button className='btn rounded-2xl' onClick={() => document.getElementById('history').showModal()}>History</button>
        </div>
        <div className={`flex h-full place-items-center px-40 w-full bg-transparent flex-col-reverse h-10* z-10 gap-2 ${context !== '' ? "mb-15" : "justify-center"}`}>
          <p className="font-thin text-xs place-self-center mt-1 mb-1">There may be mistakes in the answers.</p>
          <div className={`w-full p-4 flex gap-3 justify-center place-items-center`}>
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