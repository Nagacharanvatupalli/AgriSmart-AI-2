import React from 'react';
import { MessageSquare, Loader2, ChevronRight } from 'lucide-react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AssistantPageProps {
    chatMessages: { role: 'user' | 'ai'; content: string }[];
    userInput: string;
    onUserInputChange: (val: string) => void;
    onSendMessage: () => void;
    isTyping: boolean;
    chatEndRef: React.RefObject<HTMLDivElement>;
}

export default function AssistantPage({
    chatMessages,
    userInput,
    onUserInputChange,
    onSendMessage,
    isTyping,
    chatEndRef
}: AssistantPageProps) {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/50 flex flex-col">
            <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
                <header className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900">AI Advice</h2>
                    <p className="text-gray-400 mt-2 font-medium italic">Your personalized agricultural consultant.</p>
                </header>

                <div className="flex-1 bg-white rounded-[40px] shadow-xl border border-gray-100 flex flex-col overflow-hidden mb-6">
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {chatMessages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10">
                                <div className="w-20 h-20 bg-[#00ab55]/10 rounded-3xl flex items-center justify-center mb-6">
                                    <MessageSquare className="text-[#00ab55]" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
                                <p className="text-gray-400 max-w-sm font-medium italic mb-10">Ask me anything about soil health, pest control, or irrigation.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                                    <QuickQuery text="Best time to plant Paddy?" onClick={() => onUserInputChange("Best time to plant Paddy in Andhra Pradesh?")} />
                                    <QuickQuery text="Organic nitrogen sources?" onClick={() => onUserInputChange("How to improve soil nitrogen naturally?")} />
                                    <QuickQuery text="Tomato blight management?" onClick={() => onUserInputChange("Early signs of tomato blight and organic control?")} />
                                    <QuickQuery text="Weather impact on harvest?" onClick={() => onUserInputChange("How does high humidity affect harvest quality?")} />
                                </div>
                            </div>
                        )}

                        {chatMessages.map((msg, i) => (
                            <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                                <div className={cn(
                                    "p-6 rounded-[28px] text-sm leading-relaxed max-w-[85%]",
                                    msg.role === 'user'
                                        ? "bg-[#00ab55] text-white rounded-tr-none shadow-lg shadow-[#00ab55]/20"
                                        : "bg-gray-50 text-gray-700 border border-gray-100 rounded-tl-none"
                                )}>
                                    {msg.role === 'ai' ? <Markdown>{msg.content}</Markdown> : msg.content}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                    {msg.role === 'user' ? 'Farmer' : 'AgriSmart AI'}
                                </span>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-3 text-[#00ab55]/60">
                                <Loader2 size={20} className="animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Assistant is thinking...</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <form onSubmit={(e) => { e.preventDefault(); onSendMessage(); }} className="flex gap-3">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => onUserInputChange(e.target.value)}
                                placeholder="Type your query here..."
                                className="flex-1 bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 transition-all font-medium text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!userInput.trim() || isTyping}
                                className="bg-[#00ab55] text-white p-4 rounded-2xl hover:bg-[#00964a] disabled:opacity-50 transition-all shadow-xl shadow-[#00ab55]/20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickQuery({ text, onClick }: { text: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-left px-5 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm text-xs font-bold text-gray-500 hover:border-[#00ab55]/30 hover:text-[#00ab55] transition-all"
        >
            {text}
        </button>
    );
}
