'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Selamat Pagi';
  if (hour >= 12 && hour < 15) return 'Selamat Siang';
  if (hour >= 15 && hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      id: Date.now().toString()
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        messages: updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        id: (Date.now() + 1).toString()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        id: (Date.now() + 1).toString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(id);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="h-full p-8">
      <div className="h-full flex flex-col bg-slate-900">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 overflow-hidden">
            <div className="text-center text-slate-300 animate-fade-in mb-6">
              <h2 className="text-2xl font-semibold mb-2">{greeting}</h2>
              <p>Apa yang mau kamu pelajari hari ini?</p>
            </div>
            <div className="w-full max-w-2xl px-4">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex space-x-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pertanyaanmu..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 resize-none overflow-y-auto"
                    disabled={isLoading}
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 80)}px`;
                    }}
                    style={{
                      minHeight: '40px',
                      maxHeight: '80px'
                    }}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        const form = (e.target as HTMLElement).closest('form');
                        if (form) {
                          (form as HTMLFormElement).requestSubmit();
                        }
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`group relative max-w-[80%] rounded-lg p-4 opacity-0 animate-slide-in ${message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-100 shadow-lg'
                      }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="absolute top-full left-0 mt-2 p-1 rounded-md text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Copy"
                      >
                        {copiedMessageId === message.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0">
              <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex space-x-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pertanyaanmu..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 resize-none overflow-y-auto"
                    disabled={isLoading}
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 80)}px`;
                    }}
                    style={{
                      minHeight: '40px',
                      maxHeight: '80px'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {isLoading && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2">
            <div className="bg-slate-800 text-slate-100 rounded-lg px-6 py-3 shadow-lg animate-thinking">
              Sedang berpikir...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}