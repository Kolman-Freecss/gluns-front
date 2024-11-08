import PropTypes from 'prop-types';

import { useState, useRef } from 'react';
import { IoSend } from "react-icons/io5";

function Chat({ closed }) {


    const [openList, setOpenList] = useState(true);
    const [message, setMessage] = useState('');
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
    ];

    return (
        <div className="flex h-full w-screen overflow-hidden transition-all duration-300">
            <div className={`w-full flex flex-col`}>
                <div className={"flex h-full place-items-center justify-center px-40 w-full bg-transparent flex-col-reverse h-10* z-10"}>
                    <p className="font-thin text-xs place-self-center mt-1 mb-1">Puede haber equivocaciones en las respuestas.</p>
                    <div className="w-full p-4 flex gap-3 justify-center place-items-center">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe un mensaje..."
                            className="w-1/5 p-4 rounded-3xl focus:outline-none bg-base-300 resize-none overflow-y scrollbar-hide focus:w-1/2 transition-all duration-300"
                            rows={1}
                        />
                        <button className="btn btn-square border border-current rounded-2xl" onClick={handleSendMessage}>
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Chat.propTypes = {
    closed: PropTypes.bool,
};

Chat.defaultProps = {
    closed: false,
};

export default Chat;