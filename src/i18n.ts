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
                "verified": "VERIFIED FARMER",
                "location_details": "LOCATION DETAILS",
                "not_set": "Location Not Set",
                "details_not_set": "Details Not Set",
                "primary_crop": "Primary Crop",
                "not_selected": "Not Selected",
                "edit_profile": "EDIT PROFILE",
                "active_crop": "ACTIVE CROP",
                "cycle_progress": "CYCLE PROGRESS",
                "market_trend": "MARKET TREND",
                "irrigation": "IRRIGATION",
                "irrigation_normal": "Normal",
                "weather_feed": "Daily Weather Feed",
                "weather": {
                    "temp": "Temperature",
                    "humidity": "Humidity",
                    "rain_today": "Rain Today",
                    "none": "None",
                    "wind_speed": "Wind Speed",
                    "tomorrow_rain": "Tomorrow Rain",
                    "chance": "{{percent}}% chance",
                    "set_location": "Set your location to see weather"
                },
                "ai_recommendation": {
                    "title": "Suggestions",
                    "desc": "Localized analysis for {{district}} shows stable soil conditions. Continue with the current {{crop}} management plan for optimal growth.",
                    "access_lab": "ACCESS FULL AI LAB"
                },
                "market": {
                    "title": "Market Price",
                    "view_all": "VIEW ALL",
                    "commodity": "Commodity",
                    "modal_price": "Modal Price",
                    "was": "Was ₹{{price}}",
                    "min": "Min",
                    "max": "Max",
                    "market": "Market",
                    "nearby": "Nearby Markets"
                },
                "modals": {
                    "edit_profile": "Edit Profile",
                    "first_name": "First Name",
                    "last_name": "Last Name",
                    "state": "State",
                    "district": "District",
                    "mandal": "Mandal / Town",
                    "primary_crop": "Primary Crop",
                    "sowing_date": "Sowing Date",
                    "harvest_date": "Harvest Date",
                    "cancel": "CANCEL",
                    "save": "SAVE CHANGES",
                    "my_crops": "My Crops",
                    "select": "SELECT",
                    "add_another": "ADD ANOTHER CROP",
                    "add_new_crop": "Add New Crop",
                    "crop_name": "Crop Name",
                    "crop_name_placeholder": "e.g. Paddy, Cotton, Maize",
                    "add_crop": "ADD CROP"
                },
                "loading": {
                    "gathering": "Gathering your farm data...",
                    "thinking": "..."
                },
                "locations": {
                    "andhra_pradesh": "Andhra Pradesh",
                    "telangana": "Telangana",
                    "guntur": "Guntur",
                    "chittoor": "Chittoor",
                    "kurnool": "Kurnool",
                    "warangal": "Warangal",
                    "hyderabad": "Hyderabad",
                    "farmer": "Farmer"
                }
            },
            "home": {
                "hero_quote": "\"The discovery of agriculture was the first big step toward a civilized life.\"",
                "hero_sub": "Empowering farmers with AI-driven insights for smarter, more sustainable agriculture.",
                "crops_btn": "Crops",
                "get_started": "Get Started",
                "info_title": "Project Information",
                "info_desc": "AgriSmartAI is a cutting-edge platform designed to empower farmers with the latest advancements in Artificial Intelligence and Machine Learning. Our system provides real-time insights, precise crop diagnosis, and personalized agricultural advice to optimize yields and promote sustainable farming practices globally.",
                "motivation_title": "Our Motivation",
                "motivation_desc": "The motivation behind AgriSmartAI stems from the urgent need to address global food security challenges. By bridging the gap between traditional farming wisdom and modern technology, we aim to reduce crop loss, minimize chemical usage, and increase the economic stability of farming communities worldwide.",
                "motivation_quote": "\"Empowering the hands that feed the world through intelligent, accessible technology.\"",
                "footer_tagline": "Revolutionizing agriculture through smart technology and data-driven insights. We believe in a future where every farmer has an expert in their pocket.",
                "ai_diagnosis": "AI Diagnosis",
                "ai_diagnosis_desc": "Instant disease detection using computer vision",
                "market_data": "Market Data",
                "market_data_desc": "Real-time global commodity price tracking",
                "quick_links": "Quick Links",
                "contact": "Contact",
                "about_us": "About Us",
                "services": "Services",
                "privacy_policy": "Privacy Policy",
                "contact_link": "Contact"
            },
            "assistant": {
                "title": "AI Advice",
                "subtitle": "Your personalized agricultural consultant.",
                "welcome_title": "How can I help you today?",
                "welcome_desc": "Ask me anything about soil health, pest control, or irrigation.",
                "input_placeholder": "Type your query here...",
                "quick_queries": {
                    "q1": "Best time to plant Paddy in Andhra Pradesh?",
                    "q2": "How to improve soil nitrogen naturally?",
                    "q3": "Early signs of tomato blight and organic control?",
                    "q4": "How does high humidity affect harvest quality?"
                },
                "loading": "Assistant is thinking...",
                "user_label": "Farmer",
                "ai_label": "AgriSmart AI"
            },
            "diagnosis": {
                "title": "CROP DOCTOR",
                "subtitle": "AI Diagnostics",
                "scan_crop": "Scan Crop",
                "tap_to_select": "Tap to select sample",
                "rescan": "RESCAN SAMPLE",
                "diagnostics_console": "Diagnostics Console",
                "analyzing": "Analyzing...",
                "scan_complete": "Scan Complete",
                "saved": "✓ SAVED",
                "waiting": "Waiting for input...",
                "diagnosis_report": "Diagnosis Report",
                "history_records": "History Records",
                "no_report": "No report yet",
                "select_to_view": "Select a scan to view diagnosis",
                "loading_history": "Loading history...",
                "case_id": "Case ID",
                "date": "Date",
                "delete": "Delete",
                "no_history": "No diagnosis history yet"
            },
            "market": {
                "title": "Market Analysis",
                "subtitle": "Real-time wholesale prices across Indian APMCs.",
                "badge": "Live Market Intelligence",
                "search_placeholder": "Search APMC / Market Name (e.g. Guntur, Warangal)",
                "analyze": "ANALYZE",
                "select_commodity": "Select Commodity",
                "search_commodity": "Search commodity...",
                "no_matching_crops": "No matching crops",
                "querying": "Querying Market Node...",
                "no_location_error": "Please log in to see market prices",
                "no_data_error": "NO APMS are available at that location",
                "modal_price": "Modal Price",
                "min_price": "Min Price",
                "max_price": "Max Price",
                "was_price": "Was ₹{{price}} on {{date}}",
                "lowest_today": "Lowest recorded today",
                "highest_today": "Highest recorded today",
                "selected_market": "Selected Market",
                "location": "Location",
                "last_update": "Last Update",
                "live_data": "LIVE DATA",
                "quick_suggestions": "Quick Suggestions",
                "nearby_markets": "Nearby Markets",
                "download_report": "DOWNLOAD FULL MARKET REPORT",
                "price_gap": "Price gap between Min/Max is ₹{{gap}}. Quality grade matters.",
                "trend_up": "{{crop}} prices are on an upward trend. Good time to liquidate.",
                "trend_stable": "Market shows stability in {{crop}} prices. Monitor for next 48 hours.",
                "avg_price": "Avg. price for {{crop}}",
                "no_markets_found": "No markets found",
                "no_data_title": "No Price Data Available",
                "no_data_desc_1": "Price predictions for",
                "no_data_desc_2": "are currently not available at",
                "this_location": "this location",
                "try_another_search": "Try searching for a different commodity or another market location.",
                "try_again_btn": "TRY AGAIN",
                "begin_search_title": "Begin Your Market Search",
                "begin_search_desc": "Select a commodity from the sidebar to view live wholesale prices and historical trends across Indian markets."
            },
            "crops_page": {
                "title": "Crop Encyclopedia",
                "subtitle": "Expert guidelines for better yields & sustainable farming.",
                "search": "Search crops...",
                "filter_all": "ALL CROPS",
                "filter_kharif": "KHARIF",
                "filter_rabi": "RABI",
                "filter_perennial": "PERENNIAL",
                "view_details": "View Details",
                "copy_guidelines": "Copy Guidelines",
                "copied": "Copied!",
                "data": {
                    "paddy": {
                        "name": "Paddy",
                        "season": "KHARIF",
                        "desc": "Paddy prefers clayey to silty loam soils with good water retention.",
                        "guidelines": "Cultivation Guidelines for Paddy:\n1. Soil: Requires clayey or loamy soil that can retain water.\n2. Sowing: Typically from June to July (Kharif).\n3. Water: Flooding of fields is necessary during growth.\n4. Harvest: Usually between November and December."
                    },
                    "wheat": {
                        "name": "Wheat",
                        "season": "RABI",
                        "desc": "Wheat grows best in well-drained loamy soils with neutral pH.",
                        "guidelines": "Cultivation Guidelines for Wheat:\n1. Climate: Requires cool weather during growth and sunny weather for ripening.\n2. Sowing: October to December.\n3. Soil: Well-drained loamy to clayey soils are ideal.\n4. Fertilizer: Balanced NPK application is critical."
                    },
                    "cotton": {
                        "name": "Cotton",
                        "season": "KHARIF",
                        "desc": "Cotton needs deep, fertile soils and warm temperatures.",
                        "guidelines": "Cultivation Guidelines for Cotton:\n1. Soil: Black cotton soil (Regur) is best for moisture retention.\n2. Spacing: Maintain 60-90cm between rows.\n3. Pest Control: Monitor closely for Bollworm.\n4. Picking: Hand picking is done after bolls burst open."
                    },
                    "maize": {
                        "name": "Corn (Maize)",
                        "season": "KHARIF/RABI",
                        "desc": "Versatile crop suitable for many Indian climates.",
                        "guidelines": "Cultivation Guidelines for Corn:\n1. Climate: Needs warm temperatures and good sunlight.\n2. Soil: Fertile alluvial soil is best.\n3. Weeding: Keep field clean during the first 30 days.\n4. Storage: Dry well to prevent fungal growth."
                    },
                    "chilli": {
                        "name": "Chilli",
                        "season": "RABI/KHARIF",
                        "desc": "Chilli prefers well-drained loams with high organic matter.",
                        "guidelines": "Guidelines: Raise seedlings for 45 days. Needs frequent light irrigation. Harvest when fully grown."
                    },
                    "turmeric": {
                        "name": "Turmeric",
                        "season": "KHARIF",
                        "desc": "High yield spice with excellent medicinal value.",
                        "guidelines": "Guidelines: Well-drained sandy loam. Plant rhizomes on ridges. 7-9 months cycle."
                    },
                    "tomato": {
                        "name": "Tomato",
                        "season": "RABI",
                        "desc": "High-value fruit suitable for well-drained sandy loams.",
                        "guidelines": "Guidelines: Use staking. Avoid overhead watering. Prune suckers."
                    },
                    "sugarcane": {
                        "name": "Sugarcane",
                        "season": "PERENNIAL",
                        "desc": "Heavy water consumer, suitable for fertile alluvial soil.",
                        "guidelines": "Guidelines: Propagate via sets. Needs deep clayey loam. Harvest at peak sugar."
                    },
                    "groundnut": {
                        "name": "Groundnut",
                        "season": "KHARIF/RABI",
                        "desc": "Oilseed crop that fixes nitrogen in the soil.",
                        "guidelines": "Guidelines: Light sandy-loam soil. Dig out pods when leaves turn yellow."
                    },
                    "mustard": {
                        "name": "Mustard",
                        "season": "RABI",
                        "desc": "Main oilseed crop of Northern India.",
                        "guidelines": "Guidelines: Cool climate preferred. Harvest when siliquae turn golden."
                    },
                    "onion": {
                        "name": "Onion",
                        "season": "RABI/KHARIF",
                        "desc": "Essential bulb crop used in almost every kitchen.",
                        "guidelines": "Guidelines: Transplant 8-week seedlings. Well-pulverized soil required."
                    },
                    "potato": {
                        "name": "Potato",
                        "season": "RABI",
                        "desc": "The most important vegetable crop worldwide.",
                        "guidelines": "Guidelines: Use disease-free seed tubers. Earthing up is essential."
                    },
                    "guava": {
                        "name": "Guava",
                        "season": "PERENNIAL",
                        "desc": "Resilient fruit crop rich in vitamin C.",
                        "guidelines": "Guidelines: Prune annually. Drought tolerant once established."
                    },
                    "mango": {
                        "name": "Mango",
                        "season": "PERENNIAL",
                        "desc": "King of fruits, major export crop for India.",
                        "guidelines": "Guidelines: Grafted varieties preferred. Irrigage during fruit development."
                    },
                    "banana": {
                        "name": "Banana",
                        "season": "PERENNIAL",
                        "desc": "Fast-growing fruit crop with high nutrition.",
                        "guidelines": "Guidelines: High water requirement. Desuckering is necessary."
                    },
                    "grapes": {
                        "name": "Grapes",
                        "season": "PERENNIAL",
                        "desc": "Vineyard crop used for table and wine.",
                        "guidelines": "Guidelines: Trellis system required. Pruning is specialized (Oct/Jan)."
                    },
                    "ginger": {
                        "name": "Ginger",
                        "season": "KHARIF",
                        "desc": "Valuable spice with underground rhizomes.",
                        "guidelines": "Guidelines: Partial shade preferred. Needs organic-rich soil."
                    },
                    "garlic": {
                        "name": "Garlic",
                        "season": "RABI",
                        "desc": "Hardy bulb crop known for strong aroma.",
                        "guidelines": "Guidelines: Plant individual cloves. Cold promotes bulb formation."
                    },
                    "soybean": {
                        "name": "Soybean",
                        "season": "KHARIF",
                        "desc": "High protein legume and oilseed.",
                        "guidelines": "Guidelines: Susceptible to weeds. Use pre-emergence herbicides."
                    },
                    "chickpea": {
                        "name": "Chickpea (Chana)",
                        "season": "RABI",
                        "desc": "Major pulse crop, critical for protein.",
                        "guidelines": "Guidelines: Grow on residual moisture. Frost sensitive at flowering."
                    },
                    "black_gram": {
                        "name": "Black Gram (Urad)",
                        "season": "KHARIF/RABI",
                        "desc": "Nutritious pulse used in fermented foods.",
                        "guidelines": "Guidelines: Short duration (60-90 days). Fits in rotations."
                    },
                    "green_gram": {
                        "name": "Green Gram (Moong)",
                        "season": "KHARIF/RABI",
                        "desc": "Versatile leguminous crop, easy to digest.",
                        "guidelines": "Guidelines: Improves soil fertility. Short duration crop."
                    },
                    "tea": {
                        "name": "Tea",
                        "season": "PERENNIAL",
                        "desc": "The world's most popular beverage crop.",
                        "guidelines": "Guidelines: Thrives in high rainfall well-drained slopes. Plucking of two leaves and a bud is standard."
                    }
                }
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
                "verified": "ధృవీకరించబడిన రైతు",
                "location_details": "స్థాన వివరాలు",
                "not_set": "స్థానం సెట్ చేయబడలేదు",
                "details_not_set": "వివరాలు సెట్ చేయబడలేదు",
                "primary_crop": "ప్రాథమిక పంట",
                "not_selected": "ఎంచుకోబడలేదు",
                "edit_profile": "ప్రొఫైల్ సవరించండి",
                "active_crop": "ప్రస్తుత పంట",
                "cycle_progress": "పంట కాలం పురోగతి",
                "market_trend": "మార్కెట్ ధోరణి",
                "irrigation": "నీటి పారుదల",
                "irrigation_normal": "సాధారణం",
                "weather_feed": "రోజువారీ వాతావరణ సమాచారం",
                "weather": {
                    "temp": "ఉష్ణోగ్రత",
                    "humidity": "తేమ",
                    "rain_today": "నేడు వర్షం",
                    "none": "లేదు",
                    "wind_speed": "గాలి వేగం",
                    "tomorrow_rain": "రేపు వర్షం",
                    "chance": "{{percent}}% అవకాశం",
                    "set_location": "వాతావరణం చూడటానికి మీ స్థానాన్ని సెట్ చేయండి"
                },
                "ai_recommendation": {
                    "title": "సూచనలు",
                    "desc": "{{district}} కోసం స్థానిక విశ్లేషణ నేల పరిస్థితులు స్థిరంగా ఉన్నాయని చూపుతుంది. సరైన ఎదుగుదల కోసం ప్రస్తుత {{crop}} నిర్వహణ ప్రణాళికను కొనసాగించండి.",
                    "access_lab": "పూర్తి AI ల్యాబ్‌ని యాక్సెస్ చేయండి"
                },
                "market": {
                    "title": "మార్కెట్ ధర",
                    "view_all": "అన్నీ చూడండి",
                    "commodity": "కమోడిటీ",
                    "modal_price": "మోడల్ ధర",
                    "was": "గతంలో ₹{{price}}",
                    "min": "కనిష్ట",
                    "max": "గరిష్ట",
                    "market": "మార్కెట్",
                    "nearby": "సమీప మార్కెట్లు"
                },
                "modals": {
                    "edit_profile": "ప్రొఫైల్ సవరించండి",
                    "first_name": "మొదటి పేరు",
                    "last_name": "ఇంటి పేరు",
                    "state": "రాష్ట్రం",
                    "district": "జిల్లా",
                    "mandal": "మండలం / పట్టణం",
                    "primary_crop": "ప్రాథమిక పంట",
                    "sowing_date": "విత్తిన తేదీ",
                    "harvest_date": "కోత తేదీ",
                    "cancel": "రద్దు చేయండి",
                    "save": "మార్పులను సేవ్ చేయండి",
                    "my_crops": "నా పంటలు",
                    "select": "ఎంచుకోండి",
                    "add_another": "మరో పంటను జోడించండి",
                    "add_new_crop": "కొత్త పంటను జోడించండి",
                    "crop_name": "పంట పేరు",
                    "crop_name_placeholder": "ఉదా. వరి, పత్తి, మొక్కజొన్న",
                    "add_crop": "పంటను జోడించండి"
                },
                "loading": {
                    "gathering": "మీ వ్యవసాయ డేటాను సేకరిస్తోంది...",
                    "thinking": "..."
                },
                "locations": {
                    "andhra_pradesh": "ఆంధ్రప్రదేశ్",
                    "telangana": "తెలంగాణ",
                    "guntur": "గుంటూరు",
                    "chittoor": "చిత్తూరు",
                    "kurnool": "కర్నూలు",
                    "warangal": "వరంగల్",
                    "hyderabad": "హైదరాబాద్",
                    "farmer": "రైతు"
                }
            },
            "home": {
                "hero_quote": "\"వ్యవసాయం కనుగొనడం నాగరిక జీవితం వైపు మొదటి పెద్ద అడుగు.\"",
                "hero_sub": "తెలివైన, మరింత స్థిరమైన వ్యవసాయం కోసం AI ఆధారిత అంతర్దృష్టులతో రైతులను శాక్తివంతం చేయడం.",
                "crops_btn": "పంటలు",
                "get_started": "ప్రారంభించండి",
                "info_title": "ప్రాజెక్ట్ సమాచారం",
                "info_desc": "AgriSmartAI అనేది AI మరియు ML లో తాజా పురోగతులతో రైతులను శాక్తివంతం చేయడానికి రూపొందించిన అత్యాధునిక వేదిక. మా వ్యవస్థ నిజ-సమయ అంతర్దృష్టులు, ఖచ్చితమైన పంట నిర్ధారణ మరియు వ్యక్తిగతీకరించిన వ్యవసాయ సలహా అందిస్తుంది.",
                "motivation_title": "మా లక్ష్యం",
                "motivation_desc": "AgriSmartAI వెనుక ప్రేరణ ప్రపంచ ఆహార భద్రత సవాళ్లను పరిష్కరించాల్సిన అత్యవసర అవసరం నుండి వస్తుంది. సాంప్రదాయ వ్యవసాయ జ్ఞానం మరియు ఆధునిక సాంకేతికత మధ్య అంతరాన్ని తగ్గించడం ద్వారా, మేము పంట నష్టాన్ని తగ్గించడం, రసాయన వినియోగాన్ని తగ్గించడం మరియు రైతు సమాజాల ఆర్థిక స్థిరత్వాన్ని పెంచడం లక్ష్యంగా పెట్టుకున్నాము.",
                "motivation_quote": "\"తెలివైన, అందుబాటులో ఉండే సాంకేతికత ద్వారా ప్రపంచాన్ని పోషించే చేతులను శాక్తివంతం చేయడం.\"",
                "footer_tagline": "స్మార్ట్ సాంకేతికత మరియు డేటా ఆధారిత అంతర్దృష్టుల ద్వారా వ్యవసాయాన్ని విప్లవాత్మకంగా మార్చడం.",
                "ai_diagnosis": "AI నిర్ధారణ",
                "ai_diagnosis_desc": "కంప్యూటర్ విజన్ ఉపయోగించి తక్షణ వ్యాధి గుర్తింపు",
                "market_data": "మార్కెట్ డేటా",
                "market_data_desc": "నిజ-సమయ గ్లోబల్ కమోడిటీ ధర ట్రాకింగ్",
                "quick_links": "త్వరిత లింక్‌లు",
                "contact": "సంప్రదింపు",
                "about_us": "మా గురించి",
                "services": "సేవలు",
                "privacy_policy": "గోప్యతా విధానం",
                "contact_link": "సంప్రదించండి"
            },
            "assistant": {
                "title": "AI సలహా",
                "subtitle": "మీ వ్యక్తిగత వ్యవసాయ కన్సల్టెంట్.",
                "welcome_title": "నేను మీకు ఎలా సహాయపడగలను?",
                "welcome_desc": "మట్టి ఆరోగ్యం, పంట రక్షణ లేదా అలవాటు నీటి పారుదల గురించి ఎలాంటి ప్రశ్నలు అడగండి.",
                "input_placeholder": "మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
                "quick_queries": {
                    "q1": "ఆంధ్రప్రదేశ్‌లో వరి వేసే ఉత్తమ సమయం ఎప్పుడు?",
                    "q2": "భూ నైట్రోజన్ ను సహజంగా ఎలా పెంచుకోవాలి?",
                    "q3": "టమోటా బ్లైట్ యొక్క ప్రారంభ చేరికలు మరియు సేంద్రీయ నియంత్రణ?",
                    "q4": "అధిక తేమ వలనే పొందుబడి ప్రభావం ఎలా ఉంటుంది?"
                },
                "loading": "సహాయకుడు ఆలోచిస్తోంది...",
                "user_label": "రైతు",
                "ai_label": "AgriSmart AI"
            },
            "diagnosis": {
                "title": "పంట డాక్టర్",
                "subtitle": "AI నిర్ధారణ",
                "scan_crop": "పంటను స్కాన్ చేయండి",
                "tap_to_select": "నమూనాను ఎంచుకోవడానికి నొక్కండి",
                "rescan": "నమూనాను మళ్ళీ స్కాన్ చేయండి",
                "diagnostics_console": "నిర్ధారణ కన్సోల్",
                "analyzing": "విశ్లేషణ చేస్తోంది...",
                "scan_complete": "స్కాన్ పూర్తి",
                "saved": "✓ సేవ్ చేయబడింది",
                "waiting": "ఇనపుట్ కోసం వేచి ఉన్నాము...",
                "diagnosis_report": "నిర్ధారణ నివేదిక",
                "history_records": "చరిత్ర రికార్డులు",
                "no_report": "ఇంకా నివేదిక లేదు",
                "select_to_view": "నిర్ధారణ చూడటానికి స్కాన్ ఎంచుకోండి",
                "loading_history": "చరిత్ర లోడ్ చేస్తోంది...",
                "case_id": "కేస్ ID",
                "date": "తేదీ",
                "delete": "తొలగించండి",
                "no_history": "ఇంకా నిర్ధారణ చరిత్ర లేదు"
            },
            "market": {
                "title": "మార్కెట్ విశ్లేషణ",
                "subtitle": "భారతీయ APMCలలో నిజ-సమయ లోకస్తర ధరలు.",
                "badge": "లైవ్ మార్కెట్ ఇంటెలిజెన్స్",
                "search_placeholder": "APMC / మార్కెట్ పేరు కోసం వెతకండి (ఉదా గుంటూరు, వారంగల్)",
                "analyze": "విశ్లేషణ చేయండి",
                "select_commodity": "కమోడిటీ ఎంచుకోండి",
                "search_commodity": "కమోడిటీ కోసం వెతకండి...",
                "no_matching_crops": "సరిపోయే పంటలు లేవు",
                "querying": "మార్కెట్ నోడ్‌ను ప్రశ్నించుకుంటోంది...",
                "no_location_error": "మార్కెట్ ధరలను చూడటానికి దయచేసి లాగిన్ చేయండి",
                "no_data_error": "ఆ స్థానంలో APMSలు అందుబాటులో లేవు",
                "modal_price": "మోడల్ ధర",
                "min_price": "కనిష్ట ధర",
                "max_price": "గరిష్ట ధర",
                "was_price": "{{date}}న ₹{{price}} ఉంది",
                "lowest_today": "ఈ రోజు కనిష్ట రికార్డు",
                "highest_today": "ఈ రోజు గరిష్ట రికార్డు",
                "selected_market": "ఎంచుకున్న మార్కెట్",
                "location": "ప్రదేశం",
                "last_update": "చివరి నవీకరణ",
                "live_data": "లైవ్ డేటా",
                "quick_suggestions": "త్వరిత సూచనలు",
                "nearby_markets": "సమీప మార్కెట్లు",
                "download_report": "పూర్తి మార్కెట్ నివేదికను డౌన్లోడ్ చేయండి",
                "price_gap": "కనిష్ట/గరిష్ట మధ్య ధర వ్యత్యాసం ₹{{gap}}. నాణ్యత గ్రేడ్ ముఖ్యం.",
                "trend_up": "{{crop}} ధరలు పెరుగుదల ధోరణిలో ఉన్నాయి. అమ్మకానికి ఇది మంచి సమయం.",
                "trend_stable": "{{crop}} ధరలలో స్థిరత్వం కనిపిస్తోంది. తదుపరి 48 గంటల పాటు పర్యవేక్షించండి.",
                "avg_price": "{{crop}}కు సగటు ధర",
                "no_markets_found": "మార్కెట్లు కనుగొనబడలేదు",
                "no_data_title": "ధరల సమాచారం అందుబాటులో లేదు",
                "no_data_desc_1": "మీరు ఎంచుకున్న",
                "no_data_desc_2": "కోసం ధర అంచనాలు ప్రస్తుతం",
                "this_location": "ఈ స్థానంలో",
                "try_another_search": "వేరే పంట లేదా మరో మార్కెట్ ప్రదేశం కోసం ముదికి శోధించండి.",
                "try_again_btn": "మళ్ళీ ప్రయత్నించండి",
                "begin_search_title": "మీ మార్కెట్ శోధనను ప్రారంభించండి",
                "begin_search_desc": "భారతదేశ మార్కెట్లలో సజీవ హోల్‌సేల్ ధరలు మరియు చారిత్రక ధోరణులను చూడటానికి సైడ్‌బార్ నుండి ఒక పంటను ఎంచుకోండి."
            },
            "crops_page": {
                "title": "పంటల ఎన్సైక్లోపీడియా",
                "subtitle": "మెరుగైన దిగుబడి మరియు స్థిరమైన వ్యవసాయం కోసం నిపుణుల మార్గదర్శకాలు.",
                "search": "పంటల కోసం వెతకండి...",
                "filter_all": "అన్ని పంటలు",
                "filter_kharif": "ఖరీఫ్",
                "filter_rabi": "రబీ",
                "filter_perennial": "బహువార్షిక",
                "view_details": "వివరాలు చూడండి",
                "copy_guidelines": "మార్గదర్శకాలను కాపీ చేయండి",
                "copied": "కాపీ చేయబడింది!",
                "data": {
                    "paddy": {
                        "name": "వరి",
                        "season": "ఖరీఫ్",
                        "desc": "వరికి నీటిని నిలుపుకునే జిగురు మరియు ఒండ్రు నేలలు అనుకూలం.",
                        "guidelines": "వరి సాగు మార్గదర్శకాలు:\n1. నేల: నీటిని నిలుపుకోగలిగే జిగురు లేదా ఒండ్రు నేలలు అవసరం.\n2. విత్తడం: సాధారణంగా జూన్ నుండి జూలై వరకు (ఖరీఫ్).\n3. నీరు: పెరుగుదల సమయంలో పొలాలలో నీరు నిలిచి ఉండటం అవసరం.\n4. కోత: సాధారణంగా నవంబర్ మరియు డిసెంబర్ మధ్య."
                    },
                    "wheat": {
                        "name": "గోధుమ",
                        "season": "రబీ",
                        "desc": "తటస్థ pH ఉన్న, నీరు త్వరగా ఇంకిపోయే ఒండ్రు నేలల్లో గోధుమ బాగా పెరుగుతుంది.",
                        "guidelines": "గోధుమ సాగు మార్గదర్శకాలు:\n1. వాతావరణం: పెరుగుదల సమయంలో చల్లని వాతావరణం మరియు కోతకు ఎండ అవసరం.\n2. విత్తడం: అక్టోబర్ నుండి డిసెంబర్ వరకు.\n3. నేల: నీరు త్వరగా ఇంకిపోయే ఒండ్రు లేదా జిగురు నేలలు అనువైనవి.\n4. ఎరువులు: సమతుల్య NPK ఎరువుల వాడకం ముఖ్యం."
                    },
                    "cotton": {
                        "name": "పత్తి",
                        "season": "ఖరీఫ్",
                        "desc": "పత్తికి లోతైన, సారవంతమైన నేలలు మరియు వెచ్చని వాతావరణం అవసరం.",
                        "guidelines": "పత్తి సాగు మార్గదర్శకాలు:\n1. నేల: నల్ల రేగడి నేల తేమను నిలుపుకోవడానికి ఉత్తమం.\n2. దూరం: వరుసల మధ్య 60-90 సెం.మీ దూరం పాటించండి.\n3. తెగుళ్ల నియంత్రణ: కాయతొలుచు పురుగు కోసం నిశితంగా గమనించండి.\n4. కోత: కాయలు పగిలిన తర్వాత చేతితో ఏరాలి."
                    },
                    "maize": {
                        "name": "మక్కజొన్న",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "అనేక భారతీయ వాతావరణాలకు సరిపోయే బహుముఖ పంట.",
                        "guidelines": "మక్కజొన్న సాగు మార్గదర్శకాలు:\n1. వాతావరణం: వెచ్చని ఉష్ణోగ్రతలు మరియు మంచి సూర్యకాంతి అవసరం.\n2. నేల: సారవంతమైన ఒండ్రు నేల ఉత్తమం.\n3. కలుపు తీయడం: మొదటి 30 రోజులు పొలాన్ని శుభ్రంగా ఉంచండి.\n4. నిల్వ: శిలీంధ్రాల పెరుగుదలను నిరోధించడానికి బాగా ఎండబెట్టాలి."
                    },
                    "chilli": {
                        "name": "మిరప",
                        "season": "రబీ/ఖరీఫ్",
                        "desc": "సేంద్రీయ పదార్థం ఎక్కువగా ఉండే నేలలు మిరపకు అనుకూలం.",
                        "guidelines": "మార్గదర్శకాలు: 45 రోజుల నారు పెంచాలి. తక్కువ మరియు తరచుగా నీటి పారుదల అవసరం."
                    },
                    "turmeric": {
                        "name": "పసుపు",
                        "season": "ఖరీఫ్",
                        "desc": "అద్భుతమైన ఔషధ గుణాలు కలిగిన సాంబార పంట.",
                        "guidelines": "మార్గదర్శకాలు: నీరు త్వరగా ఇంకిపోయే ఇసుక లోమ్ నేలలు. 7-9 నెలల పంట కాలం."
                    },
                    "tomato": {
                        "name": "టమోటా",
                        "season": "రబీ",
                        "desc": "ఇసుకలోమ్ నేలలకు సరిపడే అధిక విలువ కలిగిన పంట.",
                        "guidelines": "మార్గదర్శకాలు: మొక్కలకు మద్దతు ఇవ్వండి. పై నుండి నీరు పోయడం నివారించండి."
                    },
                    "sugarcane": {
                        "name": "చెరకు",
                        "season": "బహువార్షిక",
                        "desc": "అధిక నీటి వినియోగం కలిగి సావంతమైన నేలల్లో పెరుగుతుంది.",
                        "guidelines": "మార్గదర్శకాలు: కాండం ముక్కల ద్వారా ప్రచారం చేయబడుతుంది. గరిష్ట చక్కెర సమయంలో కోయాలి."
                    },
                    "groundnut": {
                        "name": "వేరుశనగ",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "నేలలో నైట్రోజన్‌ను స్థిరీకరించే నూనెగింజ పంట.",
                        "guidelines": "మార్గదర్శకాలు: లేత ఇసుక-లోమ్ నేల. ఆకులు పసుపు రంగులోకి మారినప్పుడు కాయలను తీయాలి."
                    },
                    "mustard": {
                        "name": "ఆవాలు",
                        "season": "రబీ",
                        "desc": "ఉత్తర భారతదేశపు ప్రధాన నూనెగింజ పంట.",
                        "guidelines": "మార్గదర్శకాలు: చల్లని వాతావరణం ప్రాధాన్యత. కాయలు బంగారు రంగులోకి మారినప్పుడు కోయాలి."
                    },
                    "onion": {
                        "name": "ఉల్లిపాయ",
                        "season": "రబీ/ఖరీఫ్",
                        "desc": "దాదాపు ప్రతి వంటగదిలో ఉపయోగించే ముఖ్యమైన పంట.",
                        "guidelines": "మార్గదర్శకాలు: 8 వారాల నారు నాటండి. బాగా చదును చేసిన నేల అవసరం."
                    },
                    "potato": {
                        "name": "బంగాళదుంప",
                        "season": "రబీ",
                        "desc": "ప్రపంచవ్యాప్తంగా అత్యంత ముఖ్యమైన కూరగాయల పంట.",
                        "guidelines": "మార్గదర్శకాలు: వ్యాధి లేని విత్తన దుంపలను వాడండి. మట్టిని ఎగదోయడం ముఖ్యం."
                    },
                    "guava": {
                        "name": "జామ",
                        "season": "బహువార్షిక",
                        "desc": "విటమిన్ సి సమృద్ధిగా ఉండే పండ్ల పంట.",
                        "guidelines": "మార్గదర్శకాలు: ఏటా కత్తిరింపులు చేయాలి. ఒకసారి స్థిరపడిన తర్వాత కరువును తట్టుకుంటుంది."
                    },
                    "mango": {
                        "name": "మామిడి",
                        "season": "బహువార్షిక",
                        "desc": "పండ్లలో రాజు, భారతదేశం నుండి ప్రధాన ఎగుమతి పంట.",
                        "guidelines": "మార్గదర్శకాలు: అంటు రకాలు ఉత్తమం. పండ్లు పెరుగుతున్నప్పుడు నీటి సరఫరా అవసరం."
                    },
                    "banana": {
                        "name": "అరటి",
                        "season": "బహువార్షిక",
                        "desc": "అధిక పోషకాహారంతో వేగంగా పెరుగుతున్న పండ్ల పంట.",
                        "guidelines": "మార్గదర్శకాలు: అధిక నీటి అవసరం. పిలకలను తొలగించడం దిగుబడికి ముఖ్యం."
                    },
                    "grapes": {
                        "name": "ద్రాక్ష",
                        "season": "బహువార్షిక",
                        "desc": "టేబుల్ మరియు వైన్ కోసం ఉపయోగించే ద్రాక్షతోట పంట.",
                        "guidelines": "మార్గదర్శకాలు: పందిరి వ్యవస్థ అవసరం. అక్టోబర్/జనవరిలో కత్తిరింపులు చేయాలి."
                    },
                    "ginger": {
                        "name": "అల్లం",
                        "season": "ఖరీఫ్",
                        "desc": "భూగర్భ కొమ్ములతో కూడిన విలువైన సాంబార పంట.",
                        "guidelines": "మార్గదర్శకాలు: పాక్షిక నీడ ప్రాధాన్యత. సేంద్రీయ నేలలు అవసరం."
                    },
                    "garlic": {
                        "name": "వెల్లుల్లి",
                        "season": "రబీ",
                        "desc": "ఘాటైన వాసన కలిగిన గడ్డ పంట.",
                        "guidelines": "మార్గదర్శకాలు: వెల్లుల్లి రెబ్బలను నాటండి. చల్లని వాతావరణం గడ్డలు పట్టడానికి అవసరం."
                    },
                    "soybean": {
                        "name": "సోయాబీన్",
                        "season": "ఖరీఫ్",
                        "desc": "అధిక ప్రోటీన్ కలిగిన పప్పుధాన్యము మరియు నూనెగింజ.",
                        "guidelines": "మార్గదర్శకాలు: కలుపు మొక్కల పట్ల జాగ్రత్త వహించండి. కలుపు సంహారకాలను వాడండి."
                    },
                    "chickpea": {
                        "name": "శనగలు",
                        "season": "రబీ",
                        "desc": "ప్రధాన పప్పుధాన్య పంట, ప్రోటీన్ కోసం కీలకం.",
                        "guidelines": "మార్గదర్శకాలు: మంచును తట్టుకోలేదు. పువ్వులు పూచే సమయంలో జాగ్రత్త వహించాలి."
                    },
                    "black_gram": {
                        "name": "మినములు",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "పులియబెట్టిన ఆహారాలలో ఉపయోగించే బలమైన పప్పుధాన్యం.",
                        "guidelines": "మార్గదర్శకాలు: స్వల్ప కాలిక పంట (60-90 రోజులు). మార్పిడి పంటగా బాగుంటుంది."
                    },
                    "green_gram": {
                        "name": "పెసలు",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "తేలికగా జీర్ణమయ్యే బహుముఖ పప్పుధాన్య పంట.",
                        "guidelines": "మార్గదర్శకాలు: నేల సాంద్రీకరణను పెంచుతుంది. తక్కువ కాలం పంట."
                    },
                    "tea": {
                        "name": "టీ",
                        "season": "బహువార్షిక",
                        "desc": "ప్రపంచంలో అత్యంత ప్రజాదరణ పొందిన పానీయపు పంట.",
                        "guidelines": "మార్గదర్శకాలు: అధిక వర్షపాతం, బాగా నీరు నిలిచిపోని వాలు ప్రాంతాలలో బాగా పెరుగుతుంది. రెండు ఆకులు మరియు ఒక మొగ్గను కోయడం ప్రామాణికం."
                    }
                }
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
                "verified": "सत्यापित किसान",
                "location_details": "स्थान विवरण",
                "not_set": "स्थान निर्धारित नहीं",
                "details_not_set": "विवरण निर्धारित नहीं",
                "primary_crop": "प्राथमिक फसल",
                "not_selected": "चयनित नहीं",
                "edit_profile": "प्रोफ़ाइल संपादित करें",
                "active_crop": "सक्रिय फसल",
                "cycle_progress": "चक्र प्रगति",
                "market_trend": "बाजार भाव",
                "irrigation": "सिंचाई",
                "irrigation_normal": "सामान्य",
                "weather_feed": "दैनिक मौसम फ़ीड",
                "weather": {
                    "temp": "तापमान",
                    "humidity": "आर्द्रता",
                    "rain_today": "आज बारिश",
                    "none": "कोई नहीं",
                    "wind_speed": "हवा की गति",
                    "tomorrow_rain": "कल बारिश",
                    "chance": "{{percent}}% संभावना",
                    "set_location": "मौसम देखने के लिए अपना स्थान निर्धारित करें"
                },
                "ai_recommendation": {
                    "title": "सुझाव",
                    "desc": "{{district}} के लिए स्थानीय विश्लेषण मिट्टी की स्थिति स्थिर दिखाता है। इष्टतम विकास के लिए वर्तमान {{crop}} प्रबंधन योजना जारी रखें।",
                    "access_lab": "पूर्ण एआई लैब एक्सेस करें"
                },
                "market": {
                    "title": "बाजार मूल्य",
                    "view_all": "सभी देखें",
                    "commodity": "वस्तु",
                    "modal_price": "मॉडल मूल्य",
                    "was": "पहले ₹{{price}} था",
                    "min": "न्यूनतम",
                    "max": "अधिकतम",
                    "market": "बाजार",
                    "nearby": "आस-पास के बाजार"
                },
                "modals": {
                    "edit_profile": "प्रोफ़ाइल संपादित करें",
                    "first_name": "पहला नाम",
                    "last_name": "अंतिम नाम",
                    "state": "राज्य",
                    "district": "जिला",
                    "mandal": "मंडल / शहर",
                    "primary_crop": "प्राथमिक फसल",
                    "sowing_date": "बुवाई की तारीख",
                    "harvest_date": "कटाई की तारीख",
                    "cancel": "रद्द करें",
                    "save": "परिवर्तन सहेजें",
                    "my_crops": "मेरी फसलें",
                    "select": "चुनें",
                    "add_another": "एक और फसल जोड़ें",
                    "add_new_crop": "नई फसल जोड़ें",
                    "crop_name": "फसल का नाम",
                    "crop_name_placeholder": "जैसे धान, कपास, मक्का",
                    "add_crop": "फसल जोड़ें"
                },
                "loading": {
                    "gathering": "आपका कृषि डेटा एकत्र किया जा रहा है...",
                    "thinking": "..."
                },
                "locations": {
                    "andhra_pradesh": "आंध्र प्रदेश",
                    "telangana": "तेलंगाना",
                    "guntur": "गुंटूर",
                    "chittoor": "चित्तूर",
                    "kurnool": "कुरनूल",
                    "warangal": "वारंगल",
                    "hyderabad": "हैदराबाद",
                    "farmer": "किसान"
                }
            },
            "home": {
                "hero_quote": "\"कृषि की खोज एक सभ्य जीवन की ओर पहला बड़ा कदम था।\"",
                "hero_sub": "AI-संचालित अंतर्दृष्टि के साथ किसानों को सशक्त बनाना।",
                "crops_btn": "फसलें",
                "get_started": "शुरू करें",
                "info_title": "परियोजना जानकारी",
                "info_desc": "AgriSmartAI एक अत्याधुनिक मंच है जो AI और ML में नवीनतम प्रगति के साथ किसानों को सशक्त बनाने के लिए डिज़ाइन किया गया है। हमारी प्रणाली वास्तविक समय की अंतर्दृष्टि, सटीक फसल निदान और व्यक्तिगत कृषि सलाह प्रदान करती है।",
                "motivation_title": "हमारी प्रेरणा",
                "motivation_desc": "AgriSmartAI के पीछे की प्रेरणा वैश्विक खाद्य सुरक्षा चुनौतियों को हल करने की तत्काल आवश्यकता से आती है। पारंपरिक कृषि ज्ञान और आधुनिक तकनीक के बीच की खाई को पाटकर, हम फसल के नुकसान को कम करने, रासायनिक उपयोग को कम करने और किसान समुदायों की आर्थिक स्थिरता बढ़ाने का लक्ष्य रखते हैं।",
                "motivation_quote": "\"बुद्धिमान, सुलभ तकनीक के माध्यम से दुनिया को खिलाने वाले हाथों को सशक्त बनाना।\"",
                "footer_tagline": "स्मार्ट तकनीक और डेटा-संचालित अंतर्दृष्टि के माध्यम से कृषि में क्रांति लाना।",
                "ai_diagnosis": "AI निदान",
                "ai_diagnosis_desc": "कंप्यूटर विजन का उपयोग करके तत्काल रोग पहचान",
                "market_data": "बाज़ार डेटा",
                "market_data_desc": "वास्तविक समय वैश्विक कमोडिटी मूल्य ट्रैकिंग",
                "quick_links": "त्वरित लिंक",
                "contact": "संपर्क",
                "about_us": "हमारे बारे में",
                "services": "सेवाएँ",
                "privacy_policy": "गोपनीयता नीति",
                "contact_link": "संपर्क करें"
            },
            "assistant": {
                "title": "AI सलाह",
                "subtitle": "आपका व्यक्तिगत कृषि सलाहकार।",
                "welcome_title": "मैं आज आपकी कैसे मदद कर सकता हूँ?",
                "welcome_desc": "मृदा स्वास्थ्य, कीट नियंत्रण, या सिंचाई के बारे में मुझसे कुछ भी पूछें।",
                "input_placeholder": "अपना प्रश्न यहाँ टाइप करें...",
                "quick_queries": {
                    "q1": "आंध्र प्रदेश में धान बोने का सर्वोत्तम समय कब है?",
                    "q2": "मिट्टी में नाइट्रोजन को प्राकृतिक रूप से कैसे बढ़ाएं?",
                    "q3": "टमाटर ब्लाइट के शुरुआती संकेत और सेंद्रीय नियंत्रण?",
                    "q4": "अत्यधिक आर्द्रता फसल की गुणवत्ता को कैसे प्रभावित करती है?"
                },
                "loading": "सहायक सोच रहा है...",
                "user_label": "किसान",
                "ai_label": "AgriSmart AI"
            },
            "diagnosis": {
                "title": "पंत डॉक्टर",
                "subtitle": "AI निदान",
                "scan_crop": "फसल स्कैन करें",
                "tap_to_select": "नमूना चुनने के लिए टैप करें",
                "rescan": "नमूना फिर से स्कैन करें",
                "diagnostics_console": "निदान कंसोल",
                "analyzing": "विश्लेषण कर रहा है...",
                "scan_complete": "स्कैन पूर्ण",
                "saved": "✓ सहेजा गया",
                "waiting": "इनपुट की प्रतीक्षा...",
                "diagnosis_report": "निदान रिपोर्ट",
                "history_records": "इतिहास रिकॉर्ड",
                "no_report": "अभी कोई रिपोर्ट नहीं",
                "select_to_view": "निदान देखने के लिए स्कैन चुनें",
                "loading_history": "इतिहास लोड हो रहा है...",
                "case_id": "केस ID",
                "date": "तारीख",
                "delete": "हटाएं",
                "no_history": "अभी कोई निदान इतिहास नहीं"
            },
            "market": {
                "title": "बाजार विश्लेषण",
                "subtitle": "भारतीय APMCs में वास्तविक समय थोक कीमतें।",
                "badge": "लाइव बाजार बुद्धिमत्ता",
                "search_placeholder": "APMC / बाजार का नाम खोजें (जैसे गुंटूर, वारंगल)",
                "analyze": "विश्लेषण करें",
                "select_commodity": "कमोडिटी चुनें",
                "search_commodity": "कमोडिटी खोजें...",
                "no_matching_crops": "कोई मिलती-जुलती फसल नहीं",
                "querying": "मार्केट नोड की पूछताछ की जा रही है...",
                "no_location_error": "बाजार की कीमतें देखने के लिए कृपया लॉगिन करें",
                "no_data_error": "उस स्थान पर कोई APMS उपलब्ध नहीं है",
                "modal_price": "मोडल मूल्य",
                "min_price": "न्यूनतम मूल्य",
                "max_price": "अधिकतम मूल्य",
                "was_price": "{{date}} को ₹{{price}} था",
                "lowest_today": "आज का न्यूनतम रिकॉर्ड",
                "highest_today": "आज का अधिकतम रिकॉर्ड",
                "selected_market": "चयनित बाजार",
                "location": "स्थान",
                "last_update": "अंतिम अपडेट",
                "live_data": "लाइव डेटा",
                "quick_suggestions": "त्वरित सुझाव",
                "nearby_markets": "निकटवर्ती बाजार",
                "download_report": "पूर्ण बाजार रिपोर्ट डाउनलोड करें",
                "price_gap": "न्यूनतम/अधिकतम के बीच मूल्य अंतर ₹{{gap}} है। गुणवत्ता ग्रेड मायने रखता है।",
                "trend_up": "{{crop}} की कीमतें बढ़ रही हैं। बेचने का अच्छा समय है।",
                "trend_stable": "{{crop}} की कीमतों में स्थिरता दिख रही है। अगले 48 घंटों तक निगरानी रखें।",
                "avg_price": "{{crop}} के लिए औसत मूल्य"
            },
            "crops_page": {
                "title": "फसल विश्वकोश",
                "subtitle": "बेहतर पैदावार और टिकाऊ खेती के लिए विशेषज्ञ दिशानिर्देश।",
                "search": "फसलें खोजें...",
                "filter_all": "सभी फसलें",
                "filter_kharif": "खरीफ",
                "filter_rabi": "रबी",
                "filter_perennial": "बारहमासी",
                "view_details": "विवरण देखें",
                "copy_guidelines": "दिशानिर्देश कॉपी करें",
                "copied": "कॉपी किया गया!",
                "data": {
                    "paddy": {
                        "name": "धान",
                        "season": "खरीफ",
                        "desc": "धान अच्छी जल धारण क्षमता वाली मिट्टी पसंद करता है।",
                        "guidelines": "धान की खेती के लिए दिशानिर्देश:\n1. मिट्टी: जल धारण करने वाली चिकनी या दोमट मिट्टी की आवश्यकता होती है।\n2. बुवाई: आमतौर पर जून से जुलाई तक (खरीफ)।\n3. पानी: विकास के दौरान खेतों में पानी भरना आवश्यक है।\n4. कटाई: आमतौर पर नवंबर और दिसंबर के बीच।"
                    },
                    "wheat": {
                        "name": "गेहूं",
                        "season": "रबी",
                        "desc": "गेहूं तटस्थ पीएच वाली अच्छी जल निकासी वाली दोमट मिट्टी में सबसे अच्छा बढ़ता है।",
                        "guidelines": "गेहूं की खेती के लिए दिशानिर्देश:\n1. जलवायु: विकास के दौरान ठंडे मौसम और पकने के लिए धूप वाले मौसम की आवश्यकता होती है।\n2. बुवाई: अक्टूबर से दिसंबर।\n3. मिट्टी: अच्छी जल निकासी वाली दोमट से चिकनी मिट्टी आदर्श है।\n4. उर्वरक: संतुलित एनपीके का प्रयोग महत्वपूर्ण है।"
                    },
                    "cotton": {
                        "name": "कपास",
                        "season": "खरीफ",
                        "desc": "कपास को गहरी, उपजाऊ मिट्टी और गर्म तापमान की आवश्यकता होती है।",
                        "guidelines": "कपास की खेती के लिए दिशानिर्देश:\n1. मिट्टी: नमी बनाए रखने के लिए काली कपास मिट्टी (रेगुर) सबसे अच्छी है।\n2. रिक्ति: पंक्तियों के बीच 60-90 सेमी बनाए रखें।\n3. कीट नियंत्रण: बॉलवर्म की बारीकी से निगरानी करें।\n4. तुड़ाई: हाथ से तुड़ाई तब की जाती है जब टिंडे फूट जाते हैं।"
                    },
                    "maize": {
                        "name": "मक्का",
                        "season": "खरीफ/रबी",
                        "desc": "भारत की कई जलवायु परिस्थितियों के लिए उपयुक्त बहुमुखी फसल।",
                        "guidelines": "मक्का की खेती के लिए दिशानिर्देश:\n1. जलवायु: गर्म तापमान और अच्छी धूप की आवश्यकता होती है।\n2. मिट्टी: उपजाऊ जलोढ़ मिट्टी सबसे अच्छी है।\n3. निराई: पहले 30 दिनों के दौरान खेत को साफ रखें।\n4. भंडारण: कवक वृद्धि को रोकने के लिए अच्छी तरह सुखाएं।"
                    },
                    "chilli": {
                        "name": "मिर्च",
                        "season": "रबी/खरीफ",
                        "desc": "मिर्च अच्छी जल निकासी वाली दोमट मिट्टी पसंद करती है।",
                        "guidelines": "दिशानिर्देश: 45 दिनों की नर्सरी। हल्की सिंचाई की आवश्यकता।"
                    },
                    "turmeric": {
                        "name": "हल्दी",
                        "season": "खरीफ",
                        "desc": "उत्कृष्ट औषधीय गुणों वाला मसाला।",
                        "guidelines": "दिशानिर्देश: अच्छी जल निकासी वाली मिट्टी। 7-9 महीने का चक्र।"
                    },
                    "tomato": {
                        "name": "टमाटर",
                        "season": "रबी",
                        "desc": "दोमट मिट्टी के लिए उपयुक्त उच्च मूल्य वाली फसल।",
                        "guidelines": "दिशानिर्देश: सहारा दें। ऊपर से पानी न डालें।"
                    },
                    "sugarcane": {
                        "name": "गन्ना",
                        "season": "बारहमासी",
                        "desc": "उपजाऊ जलोढ़ मिट्टी के लिए उपयुक्त भारी जल उपभोक्ता।",
                        "guidelines": "दिशानिर्देश: तने की कटिंग का उपयोग करें। चीनी की मात्रा अधिक होने पर काटें।"
                    },
                    "groundnut": {
                        "name": "मूंगफली",
                        "season": "खरीफ/रबी",
                        "desc": "तेलहन फसल जो मिट्टी में नाइट्रोजन स्थिर करती है।",
                        "guidelines": "दिशानिर्देश: हल्की दोमट मिट्टी। पत्तियां पीली होने पर खोदें।"
                    },
                    "mustard": {
                        "name": "सरसों",
                        "season": "रबी",
                        "desc": "उत्तर भारत की मुख्य तिलहन फसल।",
                        "guidelines": "दिशानिर्देश: ठंडी जलवायु पसंद। फलियां सुनहरी होने पर काटें।"
                    },
                    "onion": {
                        "name": "प्याज",
                        "season": "रबी/खरीफ",
                        "desc": "रसोई में उपयोग की जाने वाली आवश्यक कंद फसल।",
                        "guidelines": "दिशानिर्देश: 8 सप्ताह की पौध लगाएं।"
                    },
                    "potato": {
                        "name": "आलू",
                        "season": "रबी",
                        "desc": "दुनिया भर में सबसे महत्वपूर्ण सब्जी की फसल।",
                        "guidelines": "दिशानिर्देश: रोग मुक्त बीज का उपयोग करें। मिट्टी चढ़ाना आवश्यक है।"
                    },
                    "guava": {
                        "name": "अमरूद",
                        "season": "बारहमासी",
                        "desc": "विटामिन सी से भरपूर फल की फसल।",
                        "guidelines": "दिशानिर्देश: वार्षिक छंटाई करें। सूखा सहिष्णु।"
                    },
                    "mango": {
                        "name": "आम",
                        "season": "बारहमासी",
                        "desc": "फलों का राजा, भारत के लिए प्रमुख निर्यात फसल।",
                        "guidelines": "दिशानिर्देश: फल विकास के दौरान नियमित सिंचाई महत्वपूर्ण है।"
                    },
                    "banana": {
                        "name": "केला",
                        "season": "बारहमासी",
                        "desc": "उच्च पोषण वाला तेजी से बढ़ने वाला फल का पौधा।",
                        "guidelines": "दिशानिर्देश: उच्च जल आवश्यकता। बेहतर उपज के लिए छंटाई जरूरी।"
                    },
                    "grapes": {
                        "name": "अंगूर",
                        "season": "बारहमासी",
                        "desc": "खाने और शराब के लिए उपयोग की जाने वाली फसल।",
                        "guidelines": "दिशानिर्देश: ट्रेलिस सिस्टम की आवश्यकता। अक्टूबर/जनवरी में छंटाई।"
                    },
                    "ginger": {
                        "name": "अदरक",
                        "season": "खरीफ",
                        "desc": "भूमिगत प्रकंदों वाला मूल्यवान मसाला।",
                        "guidelines": "दिशानिर्देश: आंशिक छाया पसंद। जैविक मिट्टी की आवश्यकता।"
                    },
                    "garlic": {
                        "name": "लहसुन",
                        "season": "रबी",
                        "desc": "तेज गंध वाली कंद फसल।",
                        "guidelines": "दिशानिर्देश: अलग-अलग कलियां लगाएं। ठंड कंद बनने में मदद करती है।"
                    },
                    "soybean": {
                        "name": "सोयाबीन",
                        "season": "खरीफ",
                        "desc": "उच्च प्रोटीन फलियां और तिलहन।",
                        "guidelines": "दिशानिर्देश: खरपतवारों के प्रति संवेदनशील।"
                    },
                    "chickpea": {
                        "name": "चना",
                        "season": "रबी",
                        "desc": "प्रमुख दलहन फसल, प्रोटीन के लिए महत्वपूर्ण।",
                        "guidelines": "दिशानिर्देश: पाले के प्रति संवेदनशील।"
                    },
                    "black_gram": {
                        "name": "उड़द",
                        "season": "खरीफ/रबी",
                        "desc": "पौष्टिक दाल, किण्वित खाद्य पदार्थों में उपयोग की जाती है।",
                        "guidelines": "दिशानिर्देश: लघु अवधि की फसल (60-90 दिन)।"
                    },
                    "green_gram": {
                        "name": "मूंग",
                        "season": "खरीफ/रबी",
                        "desc": "सुपाच्य बहुमुखी दलहन फसल।",
                        "guidelines": "दिशानिर्देश: मिट्टी की उर्वरता में सुधार करती है।"
                    },
                    "tea": {
                        "name": "चाय",
                        "season": "बारहमासी",
                        "desc": "दुनिया की सबसे लोकप्रिय पेय फसल।",
                        "guidelines": "दिशानिर्देश: अधिक वर्षा वाली अच्छी जल निकासी वाली ढलानों पर पनपती है। दो पत्तियों और एक कली को तोड़ना मानक है।"
                    }
                }
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
                "verified": "சரிபார்க்கப்பட்ட விவசாயி",
                "location_details": "இருப்பிட விவரங்கள்",
                "not_set": "இருப்பிடம் அமைக்கப்படவில்லை",
                "details_not_set": "விవరங்கள் அமைக்கப்படவில்லை",
                "primary_crop": "முதன்மை பயிர்",
                "not_selected": "தேர்ந்தெடுக்கப்படவில்லை",
                "edit_profile": "சுயவிவரத்தை மாற்றவும்",
                "active_crop": "தற்போதைய பயிர்",
                "cycle_progress": "பயிர் சுழற்சி முன்னேற்றம்",
                "market_trend": "சந்தை போக்கு",
                "irrigation": "நீர்ப்பாசனம்",
                "irrigation_normal": "சாதாரணமானது",
                "weather_feed": "தினசரி வானிலை தகவல்",
                "weather": {
                    "temp": "வெப்பநிலை",
                    "humidity": "ஈரப்பదం",
                    "rain_today": "இன்று மழை",
                    "none": "இல்லை",
                    "wind_speed": "காற்றின் వేగం",
                    "tomorrow_rain": "நாளை மழை",
                    "chance": "{{percent}}% வாய்ப்பு",
                    "set_location": "வானிலை பார்க்க உங்கள் இருப்பிடத்தை அமைக்கவும்"
                },
                "ai_recommendation": {
                    "title": "பரிந்துரைகள்",
                    "desc": "{{district}} க்கான உள்ளூர் பகுப்பாய்வு மண் நிலைமைகள் நிலையாக இருப்பதைக் காட்டுகிறது. సరైన வளர்ச்சிக்கு தற்போதைய {{crop}} மேலாண்மை திட்டத்தைத் தொடரவும்.",
                    "access_lab": "முழு AI ஆய்வகத்தை அணுகவும்"
                },
                "market": {
                    "title": "சந்தை விலை",
                    "view_all": "அனைத்தையும் காண்க",
                    "commodity": "சரக்கு",
                    "modal_price": "மாதிரி விலை",
                    "was": "முன்பு ₹{{price}}",
                    "min": "குறைந்தபட்சம்",
                    "max": "அதிகபட்சம்",
                    "market": "சந்தை",
                    "nearby": "அருகிலுள்ள சந்தைகள்"
                },
                "modals": {
                    "edit_profile": "சுயவிவரத்தைத் திருத்தவும்",
                    "first_name": "முதல் பெயர்",
                    "last_name": "கடைசி பெயர்",
                    "state": "மாநிலம்",
                    "district": "மாவட்டம்",
                    "mandal": "மண்டலம் / நகரம்",
                    "primary_crop": "முதன்மை பயிர்",
                    "sowing_date": "விதைத்த தேதி",
                    "harvest_date": "அறுவடை தேதி",
                    "cancel": "ரத்துசெய்",
                    "save": "மாற்றங்களைச் சேமி",
                    "my_crops": "எனது பயிர்கள்",
                    "select": "தேர்ந்தெடு",
                    "add_another": "மற்றொரு பயிரைச் சேர்க்கவும்",
                    "add_new_crop": "புதிய பயிரைச் சேர்க்கவும்",
                    "crop_name": "பயிர் பெயர்",
                    "crop_name_placeholder": "உதாரணமாக: நெல், பருத்தி, சோளம்",
                    "add_crop": "பயிரைச் சேர்க்கவும்"
                },
                "loading": {
                    "gathering": "உங்கள் பண்ணை தரவைச் சேகரிக்கிறது...",
                    "thinking": "..."
                },
                "locations": {
                    "andhra_pradesh": "ஆந்திரப் பிரதேசம்",
                    "telangana": "தெலுங்கானா",
                    "guntur": "குண்டூர்",
                    "chittoor": "சித்தூர்",
                    "kurnool": "கர்ணூல்",
                    "warangal": "வரங்கல்",
                    "hyderabad": "ஹైదరాబాద్",
                    "farmer": "விவசாயி"
                }
            },
            "home": {
                "hero_quote": "\"விவசாயத்தின் கண்டுபிடிப்பு நாகரிக வாழ்க்கையை நோக்கிய முதல் பெரிய அடி.\"",
                "hero_sub": "AI-இயக்கப்படும் நுண்ணறிவுகளுடன் விவசாயிகளை மேம்படுத்துதல்.",
                "crops_btn": "பயிர்கள்",
                "get_started": "தொடங்குங்கள்",
                "info_title": "திட்ட தகவல்",
                "info_desc": "AgriSmartAI என்பது AI மற்றும் ML இல் சமீபத்திய முன்னேற்றங்களுடன் விவசாயிகளை மேம்படுத்த வடிவமைக்கப்பட்ட அத்யாdhuna தளம். எங்கள் அமைப்பு நிகழ்நேர நுண்ணறிவுகள், துல்லியமான பயிர் நோய் கண்டறிதல் மற்றும் தனிப்பயனாக்கப்பட்ட விவசாய ஆலோசனை வழங்குகிறது.",
                "motivation_title": "எங்கள் உந்துதல்",
                "motivation_desc": "AgriSmartAI பின்னால் உள்ள உந்துதல் உலகளாவிய உணவுப் பாதுகாப்பு சவால்களை நிவர்த்தி செய்ய வேண்டிய அவசர தேவையிலிருந்து வருகிறது.",
                "motivation_quote": "\"புத்திசாலித்தனமான, அணுகக்கூடிய தொழில்நுட்பத்தின் மூலம் உலகை ஊட்டும் கைகளை மேம்படுத்துதல்.\"",
                "footer_tagline": "திறமையான தொழில்நுட்பம் மற்றும் தரவு சார்ந்த நுண்ணறிவுகள் மூலம் விவசாயத்தில் புரட்சி.",
                "ai_diagnosis": "AI நோய் கண்டறிதல்",
                "ai_diagnosis_desc": "கணினி பார்வை மூலம் உடனடி நோய் கண்டறிதல்",
                "market_data": "சந்தை தரவு",
                "market_data_desc": "நிகழ்நேர உலகளாவிய சரக்கு விலை கண்காணிப்பு",
                "quick_links": "விரைவு இணைப்புகள்",
                "contact": "தொடர்பு",
                "about_us": "எங்களைப் பற்றி",
                "services": "சேவைகள்",
                "privacy_policy": "தனியுரிமை கொள்கை",
                "contact_link": "தொடர்பு கொள்ளுங்கள்"
            },
            "assistant": {
                "title": "AI ஆலோசனை",
                "subtitle": "உங்கள் தனிப்பயன் வேளாண் ஆலோசகர்.",
                "welcome_title": "இன்று நான் உங்களுக்கு எப்படி உதவலாம்?",
                "welcome_desc": "மண் ஆரோக்கியம், பூச்சி கட்டுப்பாடு அல்லது நீர்ப்பாசனம் பற்றியவற்றைக் கேளுங்கள்.",
                "input_placeholder": "உங்கள் கேள்வியை இங்கே டைப் செய்யவும்...",
                "quick_queries": {
                    "q1": "ஆந்திர பிரதேசத்தில் நெல் விதை பயிரிட சிறந்த காலம் எது?",
                    "q2": "மண்ணின் நைட்ரஜனை இயல்பாக எவ்வாறு அதிகரிக்கலாம்?",
                    "q3": "தக்காளி பிளைட் ஆரம்ப அறிகுறிகள் மற்றும் இயற்கை கட்டுப்பாடு?",
                    "q4": "அதிக ஈரம் உற்பத்தி தரத்தை எப்படி பாதிக்கிறது?"
                },
                "loading": "உதவியாளர் சிந்திக்கிறான்...",
                "user_label": "விவசாயி",
                "ai_label": "AgriSmart AI"
            },
            "diagnosis": {
                "title": "பயிர் வைத்திய மன்னன்",
                "subtitle": "AI நோய் கண்டறிதல்",
                "scan_crop": "பயிரை ஸ்கேன் செய்யவும்",
                "tap_to_select": "மாதிரியைத் தேர்ந்தெடுக்க தட்டவும்",
                "rescan": "மாதிரியை மீண்டும் ஸ்கேன் செய்யவும்",
                "diagnostics_console": "நோய் கண்டறிதல் கன்சோல்",
                "analyzing": "பகுப்பாய்வு செய்கிறது...",
                "scan_complete": "ஸ்கேன் முடிந்துவிட்டது",
                "saved": "✓ சேமிக்கப்பட்டது",
                "waiting": "உள்ளீட்டுக்கு காத்திருக்கிறது...",
                "diagnosis_report": "நோய் கண்டறிதல் அறிக்கை",
                "history_records": "வரலாற்று பதிவுகள்",
                "no_report": "இன்னும் அறிக்கை இல்லை",
                "select_to_view": "நோய் கண்டறிதல் பார்க்க ஸ்கேன் தேர்ந்தெடுக்கவும்",
                "loading_history": "வரலாறு ஏற்றுகிறது...",
                "case_id": "வழக்கு ID",
                "date": "தேதி",
                "delete": "நீக்கு",
                "no_history": "இன்னும் நோய் கண்டறிதல் வரலாறு இல்லை"
            },
            "market": {
                "title": "சந்தை பகுப்பாய்வு",
                "subtitle": "இந்திய APMCகளில் நிகழ்நேர மொத்த விலை.",
                "badge": "நிகழ் பொழுது சந்தை புத்திசாலி",
                "search_placeholder": "APMC / சந்தை பெயரைத் தேடுங்கள் (எ.கா. கங்கய், வரங்கல்)",
                "analyze": "பகுப்பாய்வு செய்",
                "select_commodity": "பொருளைத் தேர்ந்தெடுக்கவும்",
                "search_commodity": "பொருளைத் தேடுங்கள்...",
                "no_matching_crops": "பொருத்தமான பயிர்கள் இல்லை",
                "querying": "சந்தை முனை கேட்கப்படுகிறது...",
                "no_location_error": "சந்தை விலைகளைக் கண்டுபிடிக்க தயவு செய்து உள்நுழையவும்",
                "no_data_error": "அந்த இடத்தில் APMSகள் கிடைக்கவில்லை",
                "modal_price": "மாதிரி விலை",
                "min_price": "குறைந்தபட்ச விலை",
                "max_price": "அதிகபட்ச விலை",
                "was_price": "{{date}}ல் ₹{{price}} ஆக இருந்தது",
                "lowest_today": "இன்று பதிவுசெய்யப்பட்ட குறைந்தபட்சம்",
                "highest_today": "இன்று பதிவுசெய்யப்பட்ட அதிகபட்சம்",
                "selected_market": "தேர்ந்தெடுக்கப்பட்ட சந்தை",
                "location": "இடம்",
                "last_update": "கடைசி புதுப்பிப்பு",
                "live_data": "நேரடி தரவு",
                "quick_suggestions": "விரைவான பரிந்துரைகள்",
                "nearby_markets": "அருகில் உள்ள சந்தைகள்",
                "download_report": "முழு சந்தை அறிக்கையை பதிவிறக்கவும்",
                "price_gap": "குறைந்தபட்சம்/அதிகபட்சத்திற்கு இடையேயான விலை வேறுபாடு ₹{{gap}}. தர தரம் முக்கியமானது.",
                "trend_up": "{{crop}} விலைகள் மேல்நோக்கிய போக்கில் உள்ளன. கலைப்பதற்கு நல்ல நேரம்.",
                "trend_stable": "{{crop}} விலைகளில் நிலைത്തன்மை காணப்படுகிறது. அடுத்த 48 மணிநேரத்திற்கு கண்காணிக்கவும்.",
                "avg_price": "{{crop}}க்கான சராசரி விலை"
            },
            "crops_page": {
                "title": "பயிர் கலைக்களஞ்சியம்",
                "subtitle": "சிறந்த விளைச்சல் மற்றும் நிலையான விவசாயத்திற்கான நிபுணர் வழிகாட்டுதல்கள்.",
                "search": "பயிர்களைத் தேடுங்கள்...",
                "filter_all": "அனைத்து பயிர்கள்",
                "filter_kharif": "காரிஃப்",
                "filter_rabi": "ரபி",
                "filter_perennial": "பல்லாண்டு",
                "view_details": "விவரங்களைக் காண்க",
                "copy_guidelines": "வழிகாட்டுதல்களை நகலெடுக்கவும்",
                "copied": "நகலெடுக்கப்பட்டது!",
                "data": {
                    "paddy": {
                        "name": "நெல்",
                        "season": "காரிஃப்",
                        "desc": "நெல் பயிர் நீர் தேங்கும் களிமண் அல்லது வண்டல் மண்ணை விரும்புகிறது.",
                        "guidelines": "நெல் சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நீரைத் தக்கவைத்துக்கொள்ளும் களிமண் அல்லது வண்டல் மண் தேவை.\n2. விதைப்பு: பொதுவாக ஜூன் முதல் ஜூலை வரை (காரிஃப்).\n3. நீர்: வளர்ச்சியின் போது வயல்களில் நீர் தேங்குவது அவசியம்.\n4. அறுவடை: பொதுவாக நவம்பர் மற்றும் டிசம்பர் மாதங்களுக்கு இடையில்."
                    },
                    "wheat": {
                        "name": "கோதுமை",
                        "season": "ரபி",
                        "desc": "கோதுமை நடுநிலை pH கொண்ட நன்கு வடிகட்டிய வண்டல் மண்ணில் சிறப்பாக வளரும்.",
                        "guidelines": "கோதுமை சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: வளர்ச்சியின் போது குளிர்ந்த காலநிலையும் அறுவடைக்கு வெயில் காலமும் தேவை.\n2. விதைப்பு: அக்டோபர் முதல் டிசம்பர் வரை.\n3. மண்: நன்கு வடிகட்டிய வண்டல் மண் சிறந்தது.\n4. உரம்: சமச்சீர் NPK பயன்பாடு முக்கியமானது."
                    },
                    "cotton": {
                        "name": "பருத்தி",
                        "season": "காரிஃப்",
                        "desc": "பருத்திக்கு ஆழமான, வளமான மண் மற்றும் வெப்பமான வெப்பநிலை தேவை.",
                        "guidelines": "பருத்தி சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: ஈரப்பதத்தைத் தக்கவைக்க கருப்பு பருத்தி மண் (ரேகர்) சிறந்தது.\n2. இடைவெளி: வரிசைகளுக்கு இடையே 60-90 செ.மீ இடைவெளியைப் பராமரிக்கவும்.\n3. பூச்சி கட்டுப்பாடு: காய்ப்புழுவை உன்னிப்பாகக் கண்காணிக்கவும்.\n4. அறுவடை: காய் வெடித்த பிறகு கையால் பறிக்கப்படுகிறது."
                    },
                    "maize": {
                        "name": "சோளம்",
                        "season": "காரிஃப்/ரபி",
                        "desc": "பல இந்திய காலநிலைகளுக்கு ஏற்ற பல்துறை பயிர்.",
                        "guidelines": "சோளம் சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: வெப்பமான வெப்பநிலை மற்றும் நல்ல சூரிய ஒளி தேவை.\n2. மண்: வளமான வண்டல் மண் சிறந்தது.\n3. களை எடுத்தல்: முதல் 30 நாட்களுக்கு வயலை சுத்தமாக வைத்திருக்கவும்.\n4. சேமிப்பு: பூஞ்சை வளர்ச்சியைத் தடுக்க நன்கு உலர வைக்கவும்."
                    },
                    "chilli": {
                        "name": "மிளகாய்",
                        "season": "ரபி/காரிஃப்",
                        "desc": "மிளகாய் நன்கு வடிகட்டிய செம்மண் நிலத்தை விரும்புகிறது.",
                        "guidelines": "வழிகாட்டுதல்கள்: 45 நாட்கள் நாற்றங்கால். அடிக்கடி லேசான நீர் பாய்ச்சல் தேவை."
                    },
                    "turmeric": {
                        "name": "மஞ்சள்",
                        "season": "காரிஃப்",
                        "desc": "சிறந்த மருத்துவ குணங்களைக் கொண்ட வாசனைப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: வண்டல் மண் சிறந்தது. 7-9 மாதங்கள் பயிர் சுழற்சி."
                    },
                    "tomato": {
                        "name": "தக்காளி",
                        "season": "ரபி",
                        "desc": "நன்கு வடிகட்டிய மணல் கலந்த வண்டல் நிலத்திற்கு ஏற்றது.",
                        "guidelines": "வழிகாட்டுதல்கள்: செடிகளுக்கு முட்டுக்கொடுக்கவும். செடியின் மேல் நீர் விழுவதைத் தவிர்க்கவும்."
                    },
                    "sugarcane": {
                        "name": "கரும்பு",
                        "season": "பல்லாண்டு",
                        "desc": "அதிக நீர் தேவைப்படும் பயிர், வளமான வண்டல் மண்ணுக்கு ஏற்றது.",
                        "guidelines": "வழிகாட்டுதல்கள்: கரும்புத் துண்டுகள் மூலம் பயிரிடப்படுகிறது. சர்க்கரை அளவு அதிகரிக்கும் போது அறுவடை செய்யவும்."
                    },
                    "groundnut": {
                        "name": "நிலக்கடலை",
                        "season": "காரிஃப்/ரபி",
                        "desc": "மண்ணில் தழைச்சத்தை நிலைப்படுத்தும் எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: மணல் கலந்த வண்டல் மண். இலைகள் மஞ்சள் நிறமாக மாறும் போது அறுவடை செய்யவும்."
                    },
                    "mustard": {
                        "name": "கடுகு",
                        "season": "ரபி",
                        "desc": "வட இந்தியாவின் முக்கிய எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: குளிர்ந்த காலநிலை சிறந்தது. காய்கள் பொன்னிறமாக மாறும் போது அறுவடை செய்யவும்."
                    },
                    "onion": {
                        "name": "வெங்காயம்",
                        "season": "ரபி/காரிஃப்",
                        "desc": "அனைத்து சமையலறைகளிலும் பயன்படுத்தப்படும் அத்தியாவசியப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: 8 வார நாற்றுகளை நடவு செய்யவும்."
                    },
                    "potato": {
                        "name": "உருளைக்கிழங்கு",
                        "season": "ரபி",
                        "desc": "உலகளவில் மிக முக்கியமான காய்கறிப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: நோய் இல்லாத விதைகள் பயன்படுத்தவும். மண் அணைப்பது அவசியம்."
                    },
                    "guava": {
                        "name": "கொய்யா",
                        "season": "பல்லாண்டு",
                        "desc": "வைட்டமின் சி நிறைந்த பழப்பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: ஆண்டுதோறும் கவாத்து செய்யவும். வறட்சியைத் தாங்கி வளரும்."
                    },
                    "mango": {
                        "name": "மாம்பழம்",
                        "season": "பல்லாண்டு",
                        "desc": "பழங்களின் ராஜா, இந்தியாவின் முக்கிய ஏற்றுமதிப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: பழம் வளரும் போது வழக்கமான நீர் பாய்ச்சல் முக்கியம்."
                    },
                    "banana": {
                        "name": "வாழை",
                        "season": "பல்லாண்டு",
                        "desc": "அதிக சத்துக்கள் கொண்ட வேகமாக வளரும் பழப்பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: அதிக நீர் தேவை. பக்கக் கன்றுகளை நீக்குவது அவசியம்."
                    },
                    "grapes": {
                        "name": "திராட்சை",
                        "season": "பல்லாண்டு",
                        "desc": "உணவு மற்றும் ஒயின் தயாரிக்கப் பயிரிடப்படும் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: பந்தல் முறை அவசியம். அக்டோபர்/ஜனவரியில் கவாத்து செய்யவும்."
                    },
                    "ginger": {
                        "name": "இஞ்சி",
                        "season": "காரிஃப்",
                        "desc": "மண்ணிற்கு அடியில் வளரும் வாசனைப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: நிழலான பகுதி சிறந்தது. ஊட்டச்சத்து நிறைந்த மண் தேவை."
                    },
                    "garlic": {
                        "name": "பூண்டு",
                        "season": "ரபி",
                        "desc": "சிறந்த மணம் கொண்ட பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: தனித்தனிப் பூண்டுகளை நடவும். குளிர் காலநிலை சிறந்தது."
                    },
                    "soybean": {
                        "name": "சோயாபீன்",
                        "season": "காரிஃப்",
                        "desc": "அதிக புரதம் கொண்ட எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: களைகளைக் கட்டுப்படுத்துவது அவசியம்."
                    },
                    "chickpea": {
                        "name": "கொண்டைக்கடலை",
                        "season": "ரபி",
                        "desc": "புரதச் சத்து நிறைந்த முக்கிய பருப்பு வகை.",
                        "guidelines": "வழிகாட்டுதல்கள்: பனியைத் தாங்காது."
                    },
                    "black_gram": {
                        "name": "உளுந்து",
                        "season": "காரிஃப்/ரபி",
                        "desc": "ஊட்டச்சத்து நிறைந்த பயறு வகை.",
                        "guidelines": "வழிகாட்டுதல்கள்: குறுகிய காலப் பயிர் (60-90 நாட்கள்)."
                    },
                    "green_gram": {
                        "name": "பாசிப்பயறு",
                        "season": "காரிஃப்/ரபி",
                        "desc": "எளிதில் செரிமானம் ஆகக்கூடிய பயறு வகை.",
                        "guidelines": "வழிகாட்டுதல்கள்: மண்ணின் வளத்தை மேம்படுத்தும்."
                    },
                    "tea": {
                        "name": "தேயிலை",
                        "season": "பல்லாண்டு",
                        "desc": "உலகின் மிகவும் பிரபலமான பானப் பயிர்.",
                        "guidelines": "வழிகாட்டுதல்கள்: அதிக மழைப்பொழிவு மற்றும் வடிகால் வசதியுள்ள சரிவுகளில் செழித்து வளரும். இரண்டு இலைகள் மற்றும் ஒரு மொட்டு பறிப்பது வழக்கம்."
                    }
                }
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
