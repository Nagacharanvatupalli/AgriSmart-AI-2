import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Loader2, ChevronRight, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
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
    const [isListening, setIsListening] = useState(false);
    const [speakingMsgId, setSpeakingMsgId] = useState<number | null>(null);
    const recognitionRef = useRef<any>(null);
    const { t, i18n } = useTranslation();

    const handleSpeak = (text: string, msgId: number) => {
        // If already speaking this message, stop it
        if (speakingMsgId === msgId) {
            window.speechSynthesis.cancel();
            setSpeakingMsgId(null);
            return;
        }

        // Cancel any existing speech
        window.speechSynthesis.cancel();

        // Strip Markdown for cleaner speech
        const cleanText = text
            .replace(/[#*`_\[\]()]/g, '') // Remove symbols
            .replace(/\n/g, ' ')           // Replace newlines with spaces
            .trim();

        const rawLang = i18n.language || 'en';
        const lang = rawLang.split('-')[0].split('_')[0].toLowerCase();

        console.log('TTS Debug - Request:', { lang, cleanText: cleanText.substring(0, 50) + '...' });

        const localeMap: Record<string, string> = {
            en: 'en-IN',
            te: 'te-IN',
            hi: 'hi-IN',
            ta: 'ta-IN'
        };

        const targetLocale = localeMap[lang] || 'en-IN';
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = targetLocale;

        const findNativeVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log('TTS Debug - Total Voices:', voices.length);

            if (voices.length === 0) return null;

            // Log all voices once to help identify system capabilities
            console.log('TTS Debug - System Voices:', voices.map(v => `${v.name} (${v.lang})`));

            // Priority 1: Exact locale match
            let match = voices.find(v => v.lang.replace('_', '-') === targetLocale);
            if (match) {
                console.log('TTS Debug - Match Found (Exact Locale):', match.name);
                return match;
            }

            // Priority 2: Matches the language name or code in the voice name
            const langNameMap: Record<string, string[]> = {
                te: ['telugu', 'తెలుగు', 'heera', 'ravi'],
                hi: ['hindi', 'हिन्दी', 'हिंदी', 'hemant', 'kalpana'],
                ta: ['tamil', 'தமிழ்', 'sabitha', 'valluvar'],
                en: ['english']
            };
            const targetNames = langNameMap[lang] || [lang];

            match = voices.find(v => {
                const nameLow = v.name.toLowerCase();
                const langLow = v.lang.toLowerCase().replace('_', '-');
                return targetNames.some(tn => nameLow.includes(tn)) ||
                    langLow.startsWith(lang) ||
                    (lang === 'hi' && nameLow.includes('india'));
            });

            if (match) {
                console.log('TTS Debug - Match Found (Name Search):', match.name);
                return match;
            }

            // Priority 3: Fallback to any voice that starts with the language code
            match = voices.find(v => v.lang.toLowerCase().startsWith(lang));
            if (match) {
                console.log('TTS Debug - Match Found (Language Fallback):', match.name);
            }

            return match;
        };

        const speakWithVoice = () => {
            const nativeVoice = findNativeVoice();
            if (nativeVoice) {
                utterance.voice = nativeVoice;
            } else {
                console.warn('TTS Debug - No specific voice found, using browser default for:', targetLocale);
                utterance.lang = targetLocale;
            }

            utterance.onstart = () => {
                console.log('TTS Debug - Speech started');
                setSpeakingMsgId(msgId);
            };
            utterance.onend = () => {
                console.log('TTS Debug - Speech ended');
                setSpeakingMsgId(null);
            };
            utterance.onerror = (e) => {
                console.error('TTS Debug - Speech error:', e.error, e);
                // Don't reset if it's just 'interrupted' unless we really stopped
                if (e.error !== 'interrupted') {
                    setSpeakingMsgId(null);
                }

                // If it failed with targetLocale and was NOT just interrupted by user
                if (utterance.lang !== 'en-IN' && e.error !== 'interrupted' && e.error !== 'canceled') {
                    console.log('TTS Debug - Retrying with en-IN fallback');
                    const retryUtterance = new SpeechSynthesisUtterance(cleanText);
                    retryUtterance.lang = 'en-IN';
                    retryUtterance.onstart = () => setSpeakingMsgId(msgId);
                    retryUtterance.onend = () => setSpeakingMsgId(null);
                    window.speechSynthesis.speak(retryUtterance);
                }
            };

            // Small delay to ensure cancel() has finished processing in the browser state
            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, 100);
        };

        // On some browsers, voices are loaded asynchronously
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                speakWithVoice();
                window.speechSynthesis.onvoiceschanged = null;
            };
        } else {
            speakWithVoice();
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        const lang = (i18n.language || 'en');
        const localeMap: Record<string, string> = {
            en: 'en-IN',
            te: 'te-IN',
            hi: 'hi-IN',
            ta: 'ta-IN'
        };
        recognition.lang = localeMap[lang] || 'en-IN';

        let finalTranscript = '';

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            onUserInputChange(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        onUserInputChange('');
        recognition.start();
        setIsListening(true);
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

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
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('assistant.welcome_title')}</h3>
                                <p className="text-gray-400 max-w-sm font-medium italic mb-10">{t('assistant.welcome_desc')}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                                    <QuickQuery text={t('assistant.quick_queries.q1')} onClick={() => onUserInputChange(t('assistant.quick_queries.q1'))} />
                                    <QuickQuery text={t('assistant.quick_queries.q2')} onClick={() => onUserInputChange(t('assistant.quick_queries.q2'))} />
                                    <QuickQuery text={t('assistant.quick_queries.q3')} onClick={() => onUserInputChange(t('assistant.quick_queries.q3'))} />
                                    <QuickQuery text={t('assistant.quick_queries.q4')} onClick={() => onUserInputChange(t('assistant.quick_queries.q4'))} />
                                </div>
                            </div>
                        )}

                        {chatMessages.map((msg, i) => (
                            <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                                <div className="flex items-start gap-2 max-w-[85%]">
                                    <div className={cn(
                                        "p-6 rounded-[28px] text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-[#00ab55] text-white rounded-tr-none shadow-lg shadow-[#00ab55]/20"
                                            : "bg-gray-50 text-gray-700 border border-gray-100 rounded-tl-none"
                                    )}>
                                        {msg.role === 'ai' ? <Markdown>{msg.content}</Markdown> : msg.content}
                                    </div>
                                    {msg.role === 'ai' && (
                                        <button
                                            onClick={() => handleSpeak(msg.content, i)}
                                            className={cn(
                                                "mt-2 p-2 rounded-full transition-all",
                                                speakingMsgId === i
                                                    ? "bg-[#00ab55]/10 text-[#00ab55] animate-pulse"
                                                    : "hover:bg-gray-100 text-gray-400 hover:text-[#00ab55]"
                                            )}
                                            title={speakingMsgId === i ? "Stop speaking" : "Listen to message"}
                                        >
                                            {speakingMsgId === i ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </button>
                                    )}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                    {msg.role === 'user' ? t('assistant.user_label') : t('assistant.ai_label')}
                                </span>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-3 text-[#00ab55]/60">
                                <Loader2 size={20} className="animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">{t('assistant.loading')}</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <form onSubmit={(e) => { e.preventDefault(); onSendMessage(); }} className="flex gap-3">
                            <button
                                type="button"
                                onPointerDown={startListening}
                                onPointerUp={stopListening}
                                onPointerLeave={stopListening}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{ touchAction: 'none' }}
                                className={cn(
                                    "p-4 rounded-2xl transition-all shadow-xl flex items-center justify-center shrink-0 select-none",
                                    isListening
                                        ? "bg-red-500 text-white shadow-red-500/20 scale-95"
                                        : "bg-white text-gray-500 border border-gray-200 hover:border-[#00ab55]/30 hover:text-[#00ab55]"
                                )}
                                title="Hold to speak"
                            >
                                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                            </button>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => onUserInputChange(e.target.value)}
                                placeholder={t('assistant.input_placeholder')}
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
