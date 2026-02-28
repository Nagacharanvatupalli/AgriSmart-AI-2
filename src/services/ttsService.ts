/**
 * Utility Service for Text-to-Speech using Web Speech API
 */

const langMap: { [key: string]: string } = {
    en: 'en-US',
    te: 'te-IN',
    hi: 'hi-IN',
};

export const ttsService = {
    /**
     * Speaks the provided text in the specified language.
     * Cancels any ongoing speech before starting.
     */
    speak: (text: string, lang: string = 'en') => {
        console.log('[TTS] speak called:', { text, lang });

        if (!window.speechSynthesis) {
            console.error('[TTS] Speech synthesis not supported');
            return;
        }

        // Cancel any current speech
        window.speechSynthesis.cancel();

        // Some browsers require a short delay after cancel
        setTimeout(() => {
            const cleanText = text.replace(/[*_#]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);

            const targetLang = langMap[lang] || lang;
            utterance.lang = targetLang;
            utterance.rate = 0.9;
            utterance.pitch = 1.0;

            utterance.onstart = () => console.log('[TTS] Started speaking');
            utterance.onend = () => console.log('[TTS] Finished speaking');
            utterance.onerror = (event) => console.error('[TTS] Error:', event);

            console.log('[TTS] Triggering speech for:', targetLang);
            window.speechSynthesis.speak(utterance);

            // Force resume if it's stuck (common Chrome bug)
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
        }, 50);
    },

    /**
     * Stops any ongoing speech.
     */
    stop: () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
};

// Log available voices for debugging
if (typeof window !== 'undefined' && window.speechSynthesis) {
    const logVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('[TTS] Available voices:', voices.length);
        if (voices.length > 0) {
            const hasHindi = voices.some(v => v.lang.startsWith('hi'));
            const hasTelugu = voices.some(v => v.lang.startsWith('te'));
            console.log('[TTS] Voice support - Hindi:', hasHindi, 'Telugu:', hasTelugu);
        }
    };
    logVoices();
    window.speechSynthesis.onvoiceschanged = logVoices;
}
