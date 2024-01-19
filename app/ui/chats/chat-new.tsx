'use client';
// import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from "react";
import useLLM from "usellm";

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const createPrompt = (paragraphs: string[], question: string) => `
You are Teacher, a Factual Research Assistant dedicated to providing accurate information. Your primary task is to assist me by providing me with reliable and clear responses to my questions, based on the information available in the knowledge base as your only source. You are reluctant of making any claims unless they are stated or supported by the knowledge base. Refrain from mentioning your source or file names during the conversation. In instances where a definitive answer is unavailable, acknowledge your inability and inform the user that you cannot respond.\nYour response must be in the same language as my request.
Read the following paragraphs from a longer document and answer the question below.

--DOCUMENT BEGINS--

${paragraphs.join("\n\n")}

--DOCUMENT ENDS--

Question: ${question}
`;

const ChatNew = ({ textContext }: { textContext: string }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

    const chatEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [chatHistory]);

    async function handleSubmit() {
        if (question.trim() === "") {
            setError("Por favor, introduce una pregunta.");
            return;
        }
        setError("");

        setChatHistory([...chatHistory, { role: 'user', content: question }]);
        setQuestion("");
        setAnswer("");
        setLoading(true);

        const paragraphs = textContext
            .split("\n")
            .map((p) => p.trim())
            .filter((p) => p.length > 0)
            .slice(0, 100)
            .map((p) => p.trim().substring(0, 1000));

        const { embeddings } = await llm.embed({ input: paragraphs });

        const { embeddings: queryEmbeddings } = await llm.embed({ input: question });

        const matchingParagraphs = llm
            .scoreEmbeddings({
                embeddings,
                query: queryEmbeddings[0],
                top: 3
            })
            .map(({ index }) => paragraphs[index])

        const initialMessage = {
            role: "user",
            content: createPrompt(matchingParagraphs, question),
        };

        const { message } = await llm.chat({
            messages: [initialMessage],
            stream: true,
            onStream: ({ message }) => setAnswer(message.content),
        });
        setAnswer(message.content);

        setChatHistory([
            ...chatHistory,
            { role: 'user', content: question },
            { role: 'assistant', content: message.content }
        ]);
        setLoading(false);
    }

    function handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuestion(event.target.value);
        setError("");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Chat con el Asistente</h1>
                <div className="overflow-auto h-80 mb-4 border-2 border-gray-200 rounded-md">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`p-2 mb-2 ${chat.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block p-2 ${chat.role === 'user' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}>
                                {chat.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="text-center">
                            <i className="fas fa-spinner fa-spin"></i> Obteniendo la respuesta...
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        className="flex-grow p-2 border-2 border-gray-200 rounded-md"
                        type="text"
                        value={question}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about the document"
                    />
                    <button className="px-4 py-2 ml-2 text-white bg-blue-400 rounded-md" onClick={handleSubmit}>
                        Ask
                        {/* <FontAwesomeIcon icon={faCommentDots} /> Ask */}
                    </button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
            </div >
        </div>
    );
}
export default ChatNew