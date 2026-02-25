import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "home": "HOME",
                "crops": "CROPS",
                "weather": "WEATHER",
                "ai_advice": "AI ADVICE",
                "market": "MARKET PRICES",
                "dashboard": "DASHBOARD",
                "crop_doctor": "CROP DOCTOR",
                "login": "LOGIN",
                "register": "REGISTER",
                "logout": "LOGOUT"
            },
            "weather": {
                "title": "Today's Weather",
                "subtitle": "How the weather looks for {{location}} today.",
                "temp": "How hot or cold it is",
                "humidity": "Air wetness (Humidity)",
                "wind": "Wind Speed",
                "rain": "Rain Chances",
                "forecast_title": "Next 5 Days Plan",
                "rain_chance": "Rain Chance",
                "fetching": "Getting latest weather info...",
                "error_title": "Could not get weather info",
                "try_again": "TRY AGAIN",
                "no_location": "Please enter your village name in your profile settings.",
                "search_placeholder": "Search for village or city...",
                "search_button": "Search"
            },
            "dashboard": {
                "title": "Farm Management",
                "subtitle": "Real-time overview of your agricultural assets.",
                "add_crop": "ADD NEW CROP",
                "my_crops": "MY CROPS",
                "verified": "VERIFIED FARMER"
            }
        }
    },
    te: {
        translation: {
            "nav": {
                "home": "హోమ్",
                "crops": "పంటలు",
                "weather": "వాతావరణం",
                "ai_advice": "AI సలహా",
                "market": "మార్కెట్ ధరలు",
                "dashboard": "డ్యాష్‌బోర్డ్",
                "crop_doctor": "క్రాప్ డాక్టర్",
                "login": "లాగిన్",
                "register": "రిజిస్టర్",
                "logout": "లాగ్ అవుట్"
            },
            "weather": {
                "title": "నేటి వాతావరణం",
                "subtitle": "నేడు {{location}} లో వాతావరణం ఎలా ఉందో చూడండి.",
                "temp": "ఎండ లేదా చలి ఎలా ఉంది (ఉష్ణోగ్రత)",
                "humidity": "గాలిలో తేమ",
                "wind": "గాలి వేగం",
                "rain": "వర్షం పడే అవకాశం",
                "forecast_title": "వచ్చే 5 రోజుల ప్రణాళిక",
                "rain_chance": "వర్షం అవకాశం",
                "fetching": "వాతావరణ సమాచారాన్ని పొందుతోంది...",
                "error_title": "వాతావరణ సమాచారం అందలేదు",
                "try_again": "మళ్ళీ ప్రయత్నించండి",
                "no_location": "దయచేసి మీ ప్రొఫైల్ సెట్టింగ్‌లలో మీ గ్రామం పేరును నమోదు చేయండి.",
                "search_placeholder": "గ్రామం లేదా నగరం కోసం వెతకండి...",
                "search_button": "వెతకండి"
            },
            "dashboard": {
                "title": "వ్యవసాయ నిర్వహణ",
                "subtitle": "మీ వ్యవసాయ ఆస్తుల నిజ-సమయ అవలోకనం.",
                "add_crop": "కొత్త పంటను జోడించండి",
                "my_crops": "నా పంటలు",
                "verified": "ధృవీకరించబడిన రైతు"
            }
        }
    },
    hi: {
        translation: {
            "nav": {
                "home": "होम",
                "crops": "फसलें",
                "weather": "मौसम",
                "ai_advice": "AI सलाह",
                "market": "बाजार भाव",
                "dashboard": "डैशबोर्ड",
                "crop_doctor": "क्रॉप डॉक्टर",
                "login": "लॉगिन",
                "register": "पंजीकरण",
                "logout": "लॉग आउट"
            },
            "weather": {
                "title": "आज का मौसम",
                "subtitle": "आज {{location}} में मौसम कैसा है।",
                "temp": "तापमान (गर्मी या ठंड)",
                "humidity": "हवा में नमी",
                "wind": "हवा की गति",
                "rain": "बारिश की संभावना",
                "forecast_title": "अगले 5 दिनों की योजना",
                "rain_chance": "बारिश की संभावना",
                "fetching": "मौसम की जानकारी मिल रही है...",
                "error_title": "मौसम की जानकारी नहीं मिल सकी",
                "try_again": "पुनः प्रयास करें",
                "no_location": "कृपया अपनी प्रोफाइल सेटिंग्स में अपने गांव का नाम दर्ज करें।",
                "search_placeholder": "गांव या शहर खोजें...",
                "search_button": "खोजें"
            },
            "dashboard": {
                "title": "कृषि प्रबंधन",
                "subtitle": "आपकी कृषि संपत्ति का वास्तविक समय अवलोकन।",
                "add_crop": "नई फसल जोड़ें",
                "my_crops": "मेरी फसलें",
                "verified": "सत्यापित किसान"
            }
        }
    },
    ta: {
        translation: {
            "nav": {
                "home": "முகப்பு",
                "crops": "பயிர்கள்",
                "weather": "வானிலை",
                "ai_advice": "AI ஆலோசனை",
                "market": "சந்தை விலை",
                "dashboard": "டாஷ்போர்டு",
                "crop_doctor": "கிராப் டாக்டர்",
                "login": "உள்நுழை",
                "register": "பதிவு செய்",
                "logout": "வெளியேறு"
            },
            "weather": {
                "title": "இன்றைய வானிலை",
                "subtitle": "இன்று {{location}} வானிலை எப்படி இருக்கிறது.",
                "temp": "வெப்பநிலை (வெப்பம் அல்லது குளிர்)",
                "humidity": "காற்றில் ஈரம்",
                "wind": "காற்றின் வேகம்",
                "rain": "மழை வாய்ப்பு",
                "forecast_title": "அடுத்த 5 நாட்கள் திட்டம்",
                "rain_chance": "மழை வாய்ப்பு",
                "fetching": "வானிலை தகவல்களைப் பெறுகிறது...",
                "error_title": "வானிலை தகவல்களைப் பெற முடியவில்லை",
                "try_again": "மீண்டும் முயற்சி செய்",
                "no_location": "தயவுசெய்து உங்கள் சுயவிவர அமைப்புகளில் உங்கள் கிராமத்தின் பெயரை உள்ளிடவும்.",
                "search_placeholder": "கிராமம் அல்லது நகரத்தைத் தேடுங்கள்...",
                "search_button": "தேடு"
            },
            "dashboard": {
                "title": "பண்ணை மேலாண்மை",
                "subtitle": "உங்கள் விவசாயச் சொத்துக்களின் நிகழ்நேர மேலோட்டம்.",
                "add_crop": "புதிய பயிரைச் சேர்",
                "my_crops": "எனது பயிர்கள்",
                "verified": "சரிபார்க்கப்பட்ட விவசாயி"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
