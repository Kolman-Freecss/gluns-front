import { useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import hljs from "highlight.js";

function MessageIn({ children }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const detectLanguage = (code) => {
        const result = hljs.highlightAuto(code);
        return result.language || "plaintext";
    };

    // Verifica y convierte children a string si es necesario
    const markdownContent = Array.isArray(children) ? children.join('') : String(children);

    return (
        <div className="px-10 py-2 w-full">
            <ReactMarkdown
                className="markdown"
                components={{
                    h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-2xl font-medium mb-2" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                    code({  inline, className, children, ...props }) {
                        const codeString = String(children).replace(/\n$/, "");
                        const languageFromClass = className && className.startsWith('language-')
                            ? className.replace('language-', '')
                            : detectLanguage(codeString);
                        if (!inline) {
                            return (
                                <div className="relative my-4 border rounded-md">
                                    <div className="flex justify-between items-center bg-gray-900 text-gray-200 p-2 rounded-t-md">
                                        <span className="font-bold">{languageFromClass.toUpperCase()}</span>
                                        <button
                                            className="text-xs bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded"
                                            onClick={() => handleCopy(codeString)}
                                        >
                                            {copied ? "¡Copiado!" : "Copiar código"}
                                        </button>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-b-md">
                                        <SyntaxHighlighter
                                            style={coldarkDark}
                                            language={languageFromClass}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {codeString}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <code className="bg-gray-200 text-red-600 p-1 rounded" {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {markdownContent}
            </ReactMarkdown>
        </div>
    );
}

MessageIn.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MessageIn;
