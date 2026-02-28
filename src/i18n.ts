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
                "search_button": "Search",
                "no_data_found": "Data Not Found"
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
            "crop_status": {
                "no_crops_title": "No Crops Selected",
                "no_crops_message": "You have selected no crops yet. Please select your crop.",
                "boost_yield": "Boost Yield",
                "prevention": "Prevention",
                "monitoring": "Monitoring your crop...",
                "heavy_rain_threat": "Heavy rain expected",
                "heavy_rain_suggestion": "Delay fertilizer application.",
                "high_temp_threat": "High temperature alert",
                "high_temp_suggestion": "Irrigate in the evening.",
                "paddy_suggestion": "Maintain 2-5cm standing water.",
                "cotton_suggestion": "Check for whitefly infestation.",
                "prod_tip_default": "Rotate crops to maintain soil fertility.",
                "prod_tip_paddy": "Use Azolla as bio-fertilizer to increase yield by 15-20%.",
                "prod_tip_cotton": "Implement high-density planting system for better yield.",
                "prod_tip_maize": "Intercrop with soybean to improve nitrogen levels.",
                "history_advice_default": "Check for pest signs regularly based on local trends.",
                "history_advice_fungal": "Past fungal issue detected. Avoid excessive nitrogen and keep field drained.",
                "history_advice_pest": "Previous pest attack noted. Set up pheromone traps early this season.",
                "history_advice_recurrence": "Preventing recurrence of: {{disease}}"
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
                "ai_label": "AgriSmart AI",
                "voice_unsupported": "Voice input is not supported in this browser.",
                "start_listening": "Start voice input",
                "stop_listening": "Stop listening"
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
                "market_contact": "Market Contact",
                "download_report": "DOWNLOAD FULL MARKET REPORT",
                "price_gap": "Price gap between Min/Max is ₹{{gap}}. Quality grade matters.",
                "trend_up": "{{crop}} prices are on an upward trend. Good time to liquidate.",
                "trend_stable": "Market shows stability in {{crop}} prices. Monitor for next 48 hours.",
                "avg_price": "Avg. price for {{crop}}",
                "no_data_found": "Data Not Found",
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
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Requires fertile clayey or silty loam that retains water effectively.\n2. pH Range: Ideal soil pH is 5.5 to 6.5 (slightly acidic).\n3. Land Preparation: Puddle the field twice; ensure it is level to maintain uniform water depth.\n4. Sowing Window: June-July (Kharif) and November-December (Rabi).\n5. Seed Rate: Use 30-40 kg/ha for transplanting.\n6. Nursery Management: Maintain a 21-25 day nursery period; use DAP for healthy seedlings.\n7. Spacing: Plant at 20x15cm or 15x15cm depending on the variety.\n8. Fertilizer: Apply NPK in 120:60:40 ratio; split Nitrogen into 3 applications.\n9. Water Management: Keep 2-5cm standing water from transplanting until grain hardening.\n10. Weed Control: Use pre-emergence herbicides within 3-5 days of transplanting.\n11. Pest Monitoring: Watch for Stem Borer, Gall Midge, and Leaf Folder.\n12. Disease Management: Preventive sprays for Blast and Brown Spot are recommended.\n13. Zinc Deficiency: Apply 25kg/ha Zinc Sulphate if leaves show brown spots.\n14. Harvesting: Harvest when grains are 80-85% straw-colored and moisture is ~20%.\n15. Post-Harvest: Dry grains to 12-14% moisture before long-term storage."
                    },
                    "wheat": {
                        "name": "Wheat",
                        "season": "RABI",
                        "desc": "Wheat grows best in well-drained loamy soils with neutral pH.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained loamy to clay-loam soils with neutral pH (6.5-7.5).\n2. Climate: Needs cool temperatures (15-20°C) during growth and bright sun for ripening.\n3. Land Preparation: 2-3 deep ploughings followed by levelling for a fine seedbed.\n4. Sowing Time: November is the peak season; late sowing reduces yield significantly.\n5. Seed Rate: 100-125 kg/ha; use higher rates for late sowing or saline soils.\n6. Sowing Depth: 4-5cm deep using a seed drill for uniform emergence.\n7. Fertilizer: 120kg N, 60kg P2O5, and 40kg K2O per hectare.\n8. Critical Irrigation: Must irrigate at Crown Root Initiation (CRI) stage (21 days after sowing).\n9. Additional Irrigation: Tillering, Jointing, Flowering, and Milk stages are also critical.\n10. Micro-nutrients: Apply Manganese and Zinc if deficiency symptoms appear.\n11. Weed Control: Use Isoproturon or Clodinafop-propargyl for grassy weeds.\n12. Rust Management: Monitor for Yellow (Stripe) and Brown Rust; use Tilt if needed.\n13. Karnal Bunt: Use resistant varieties and avoid excessive irrigation during flowering.\n14. Harvest: Harvest when moisture content is <15% and grains are hard.\n15. Storage: Keep in moisture-proof containers to prevent fungal growth."
                    },
                    "cotton": {
                        "name": "Cotton",
                        "season": "KHARIF",
                        "desc": "Cotton needs deep, fertile soils and warm temperatures.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep black cotton soil (Vertisols) or fertile alluvial soils are best.\n2. Drainage: Cotton is highly sensitive to waterlogging; Ensure excellent drainage.\n3. Sowing Period: May-June depending on the onset of monsoon.\n4. Prep: Plough 15-20cm deep; apply 10-15 tons of FYM (Farm Yard Manure).\n5. Spacing: 90x60cm for hybrids or 60x15cm for high-density planting.\n6. Seed Treatment: Treat with Imidacloprid to protect from sucking pests (30 days).\n7. Fertilizer: NPK in 150:75:75 ratio for Bt Cotton hybrids.\n8. Thinning: Remove weak seedlings 10-15 days after germination to maintain spacing.\n9. Inter-cultivation: Hand hoeing at 20, 40, and 60 days to remove weeds.\n10. Irrigation: Protect from moisture stress during squaring and boll development.\n11. Pest Management: Bollworms (Pink/American) are major threats; use pheromone traps.\n12. Sucking Pests: Monitor Jassids and Whiteflies throughout the vegetative stage.\n13. Growth Regulators: Apply Mepiquat Chloride to control excessive vegetative growth.\n14. Picking: Handpick mature bolls when 50-70% are fully opened.\n15. Post-Harvest: Sort clean cotton from stained bolls for better market price."
                    },
                    "maize": {
                        "name": "Corn (Maize)",
                        "season": "KHARIF/RABI",
                        "desc": "Versatile crop suitable for many Indian climates.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Thrives in well-drained, fertile, deep loamy soils with pH 5.5-7.5.\n2. Temp: 21°C to 27°C is ideal; sensitive to frost and extreme heat (>35°C).\n3. Land Prep: Deep ploughing followed by 2-3 harrowings for a perfect tilth.\n4. Sowing: June-July (Kharif) or Oct-Nov (Rabi) for high yield hybrids.\n5. Seed Rate: 20kg/ha for grain crops; 40-50 kg/ha for fodder maize.\n6. Depth: SOW at 3-5cm depth for uniform germination.\n7. Fertilizer: 120-150kg N, 60kg P, and 40kg K per hectare.\n8. Micronutrients: Maize is a 'Zinc-hungry' crop; apply 25kg Zinc Sulphate.\n9. Weed Control: Critical first 4-6 weeks; use Atrazine as pre-emergence.\n10. Irrigation: Maintain soil moisture during Knee-high, Tasseling, and Silking stages.\n11. Pests: Fall Armyworm (FAW) is a major threat; use Coragen if detected.\n12. Disease: Watch for Maydis Leaf Blight and Turcicum Leaf Blight.\n13. Harvesting: Harvest when husks turn dry (straw color) and grain moisture is <25%.\n14. Shelling: Dry the cobs in the sun before shelling to prevent grain damage.\n15. Storage: Ensure 12% moisture to prevent Aflatoxin contamination."
                    },
                    "chilli": {
                        "name": "Chilli",
                        "season": "RABI/KHARIF",
                        "desc": "Chilli prefers well-drained loams with high organic matter.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Sandy loam to clay loam with good drainage and rich organic matter.\n2. pH Range: 6.5 to 7.5; sensitive to salinity.\n3. Climate: Warm and humid weather; avoid cultivation during heavy rain/frost.\n4. Nursery: Raise seedlings in raised beds; treat seeds with Thiram (2g/kg).\n5. Transplanting: 6-week old seedlings; space them at 60x45cm or 45x45cm.\n6. Fertilizer: 150:75:75 NPK kg/ha; use split application of Nitrogen.\n7. Mulching: Organic or plastic mulching helps control weeds and retain moisture.\n8. Irrigation: Requires regular but light watering; avoid waterlogging at all costs.\n9. Pests: Thrips, Mites, and Aphids are common; use Neem oil or Acetamiprid.\n10. Disease: Dieback and Fruit Rot are problematic; spray Copper Oxychloride.\n11. Micronutrients: Apply Boron and Calcium to improve fruit quality.\n12. Weeding: 2-3 hand weedings are necessary to keep the field clean.\n13. Green Chilli Harvest: Pick at 60-70 days when fruits are firm and green.\n14. Red Chilli Harvest: Pick when fruits are fully ripe and bright red.\n15. Drying: Solar drying on clean platforms improves color and capsaicin content."
                    },
                    "turmeric": {
                        "name": "Turmeric",
                        "season": "KHARIF",
                        "desc": "High yield spice with excellent medicinal value.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy or clayey loam with rich humus; pH 5.0 to 7.5.\n2. Climate: Warm and humid climate with 1500-2500mm annual rainfall.\n3. Rhizome Selection: Use healthy, disease-free 'mother' rhizomes for planting.\n4. Seed Rate: 2,000 to 2,500 kg of rhizomes per hectare.\n5. Land Prep: Prepare 1 meter wide and 15-30 cm high beds for drainage.\n6. Planting Time: April-May for higher yields; avoid late planting.\n7. Spacing: 30x15cm or 30x30cm depending on soil type and variety.\n8. Mulching: Apply 15 tons of green leaf mulch immediately after planting.\n9. Second Mulching: Repeat mulching at 50 and 90 days after planting.\n10. Irrigation: Critical stages are emergence and rhizome development.\n11. Micronutrients: Turmeric responds well to Zinc and Iron applications.\n12. Pest Management: Shoot borer is common; use Malathion if infestation is high.\n13. Disease: Rhizome rot is a major issue; use Dithane M-45 for drenching.\n14. Harvesting: 7-9 months after planting when leaves dry up completely.\n15. Curing: Boil harvested rhizomes for 45-60 mins, then sun dry for 10-15 days."
                    },
                    "tomato": {
                        "name": "Tomato",
                        "season": "RABI",
                        "desc": "High-value fruit suitable for well-drained sandy loams.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy loam or clay loam with high organic matter.\n2. pH Range: 6.0 to 7.0; avoid highly acidic or alkaline soils.\n3. Climate: Day temp 20-25°C and night temp 15-20°C for best fruit set.\n4. Variety: Choose hybrids for higher yield and resistance to Wilting.\n5. Nursery: Raise seedlings in pro-trays using coco-peat for 25-30 days.\n6. Land Prep: Prepare 1.2m wide raised beds for better drainage and air flow.\n7. Transplanting: Space plants at 60x45cm; use plastic mulch to prevent weeds.\n8. Fertilizer: Basal dose of NPK (50:100:100) followed by fertigation.\n9. Staking: Provide strong staking using GI wire or bamboo within 15 days of planting.\n10. Pruning: Maintain a single stem or dual stems by removing all suckers.\n11. Irrigation: Critical stages are flowering and fruit sizing; avoid water stress.\n12. Pests: Fruit Borer and Leaf Miner are common; use pheromone and yellow sticky traps.\n13. Disease: Monitor for Early Blight and Bacterial Wilt; apply Streptocycline if needed.\n14. Nutrition: Apply Calcium Nitrate to prevent Blossom End Rot during fruit development.\n15. Harvesting: Harvest at 'breaker stage' for distant markets or fully ripe for local sales."
                    },
                    "sugarcane": {
                        "name": "Sugarcane",
                        "season": "PERENNIAL",
                        "desc": "Heavy water consumer, suitable for fertile alluvial soil.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep, well-drained, fertile soil with high water-holding capacity.\n2. Climate: Tropical/subtropical; needs 20-30°C temperature for growth.\n3. Land Prep: Sub-soil plowing followed by rotavator to create a fine tilth.\n4. Variety: Select high-sugar, early-maturing varieties like Co-86032.\n5. Planting Material: Use healthy 8-10 month old setts with 2-3 buds.\n6. Sowing Method: Trench or ring-pit method for uniform growth and higher yield.\n7. Fertilizer: High requirement—250kg N, 100kg P, 125kg K per hectare.\n8. Earthing Up: Essential at 60, 90, and 120 days to prevent lodging.\n9. Irrigation: Requires 2-3 meter-hectares of water; maintain soil moisture.\n10. Weed Control: Use Metribuzin as pre-emergence followed by manual weeding.\n11. Desuckering: Remove late shoots (water sprouts) to redirect sugar to main canes.\n12. Detrashing: Remove dry leaves to improve air circulation and reduce pest hiding spots.\n13. Pests: Watch for Early Shoot Borer and Whitefly; use Trichogramma cards.\n14. Maturity Test: Check Brix (18%+) and Purity (85%+) before harvest.\n15. Harvest: Cut at ground level; transport to the mill within 24 hours to prevent sugar loss."
                    },
                    "groundnut": {
                        "name": "Groundnut",
                        "season": "KHARIF/RABI",
                        "desc": "Oilseed crop that fixes nitrogen in the soil.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Sandy loam or red sandy-loam with loose texture for peg penetration.\n2. Drainage: Must ensure excellent drainage to prevent seed rot during germination.\n3. Land Prep: 2-3 harrowings followed by levelling to avoid water stagnation.\n4. Variety: Select Bold or Java types based on oil content or market demand.\n5. Seed Treatment: Treat with Mancozeb or Trichoderma to prevent root rot.\n6. Sowing Time: June-July (Kharif) or Oct-Nov (Rabi/Summer).\n7. Spacing: 30x10cm or 45x10cm depending on soil fertility.\n8. Fertilizer: 20kg N, 40kg P per ha; use Gypsum (500kg/ha) at pegging.\n9. Gypsum Role: Essential for Calcium and Sulphur to ensure high-quality pod filling.\n10. Weed Control: Use Fluchloralin as pre-plant incorporation for effective control.\n11. Irrigation: Critical stages are flowering, pegging, and pod development.\n12. Pests: Red Hairy Caterpillar and Tobacco Caterpillar are major threats.\n13. Disease: Watch for Tikka Leaf Spot and Rust; spray Carbendazim early.\n14. Harvesting: Harvest when leaves turn yellow and inner shell of pods becomes dark.\n15. Post-Harvest: Dry pods below 10% moisture to prevent Aflatoxin development."
                    },
                    "mustard": {
                        "name": "Mustard",
                        "season": "RABI",
                        "desc": "Main oilseed crop of Northern India.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained loamy to clayey soil with pH 6.0 to 7.5.\n2. Climate: Grows best in cool and dry climates; highly sensitive to frost.\n3. Prep: Plough 2-3 times to create a fine tilth; apply 10 tons of FYM.\n4. Variety: Choose high-yielding varieties like Pusa Bold or RH-30.\n5. Sowing Window: Oct 1st to Oct 20th is the golden period for sowing.\n6. Spacing: 30cm between rows and 10cm between plants after thinning.\n7. Fertilizer: Apply 80kg N, 40kg P, and 20kg S per hectare.\n8. Sulphur Importance: Crucial for increasing oil content in seeds.\n9. Thinning: Remove weak plants within 15-20 days of sowing to maintain density.\n10. Irrigation: Two critical stages: pre-flowering and siliqua formation.\n11. Pests: Mustard Aphids are very destructive; spray Oxydemeton-methyl.\n12. Disease: White Rust and Alternaria Blight are common; use Mancozeb.\n13. Weed Management: 1-2 hand weedings or use Pendimethalin as pre-emergence.\n14. Harvesting: Harvest when 75% of siliquae (pods) turn golden yellow.\n15. Storage: Dry logic moisture to 8-9% before storage to prevent rancidity."
                    },
                    "onion": {
                        "name": "Onion",
                        "season": "RABI/KHARIF",
                        "desc": "Essential bulb crop used in almost every kitchen.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Fertile sandy-loam with plenty of organic matter; pH 6.0-7.0.\n2. Climate: Temp of 15-25°C for growth and 25-30°C for bulb maturity.\n3. Variety: Choose based on season (Kharif/Rabi) and market (Red/White).\n4. Nursery: 7-8 weeks nursery period; treat seeds with Captan before sowing.\n5. Transplanting: Space at 15x10cm; transplant in late evening to reduce stress.\n6. Fertilizer: 100kg N, 50kg P, 100kg K per hectare; split Nitrogen application.\n7. Irrigation: Needs frequent light irrigation; avoid waterlogging.\n8. Water Management: Stop irrigation 10-15 days before harvest for skin drying.\n9. Weed Control: Onion is a poor competitor; use Oxyfluorfen for weed management.\n10. Micronutrients: Apply Zinc and Boron for better bulb quality and size.\n11. Pests: Onion Thrips are major; spray Acephate during early infestation.\n12. Disease: Purple Blotch and Downy Mildew are common; use Mancozeb.\n13. Harvesting: Harvest when 50-70% of tops fall over ('neck-fall' stage).\n14. Curing: Dry in field for 3 days, then in shade for 7-10 days for neck drying.\n15. Storage: Keep in well-ventilated cool dry rooms; avoid stacking too high."
                    },
                    "potato": {
                        "name": "Potato",
                        "season": "RABI",
                        "desc": "The most important vegetable crop worldwide.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Loose, well-drained sandy loam or silty loam with neutral pH.\n2. Climate: Day temps 20-25°C; night temps 15-20°C for tuber initiation.\n3. Variety: Select varieties based on duration (Kufri Jyoti, Kufri Bahar).\n4. Seed Selection: Use certified disease-free tubers with 2-3 sprouted eyes.\n5. Sowing Window: Oct-Nov for main Rabi crop in plains.\n6. Spacing: 60cm between rows and 20cm between tubers within the row.\n7. Fertilizer: High requirement—150kg N, 100kg P, 120kg K per ha.\n8. Earthing Up: First at 30 days and second at 50 days to cover emerging tubers.\n9. Irrigation: Frequent light irrigation; tubers shouldn't experience water stress.\n10. Weed Control: Use Metribuzin as pre-emergence; maintain ridge integrity.\n11. Pests: Aphids and Potato Tuber Moth; use neem-based sprays.\n12. Disease: Late Blight is the most serious threat; apply Copper-based sprays.\n13. Haulm Cutting: Cut foliage 10-12 days before harvest to harden the skin.\n14. Harvesting: Dig out carefully to avoid cuts; harvest during dry weather.\n15. Storage: Pre-conditioned at room temp for 7 days then cold store at 2-4°C."
                    },
                    "guava": {
                        "name": "Guava",
                        "season": "PERENNIAL",
                        "desc": "Resilient fruit crop rich in vitamin C.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Resilient to various soils but prefers well-drained deep loamy soils.\n2. Drainage: Highly sensitive to waterlogging; avoid low-lying areas.\n3. Climate: Thrives in both tropical and subtropical climates; tolerates drought.\n4. Propogation: Use air-layering (Gooti) or grafting for commercial orchards.\n5. Planting: Space at 5x5m or 6x6m; Ultra High Density (UHD) at 3x3m.\n6. Pit Prep: 60x60x60cm pits filled with 20kg FYM and 500g Single Super Phosphate.\n7. Pruning: Annual pruning in Feb/August; remove criss-cross and dead branches.\n8. Training: Train young plants to an open center system with 3-4 main scaffold limbs.\n9. Fertilizer: 600g N, 400g P, 600g K per fully grown tree per year.\n10. Irrigation: Drip irrigation is ideal; crucial during fruit set and development.\n11. Flower Regulation: Perform 'Bahar Treatment' to get fruit in desired season.\n12. Pests: Fruit Fly is the biggest threat; use Methyl Eugenol pheromone traps.\n13. Disease: Watch for Guava Wilt; avoid injuries to roots during cultivation.\n14. Micronutrients: Spray Zinc Sulphate (0.5%) if leaves show bronzing or small size.\n15. Harvesting: Harvest when skin color changes from dark green to light green or yellowish."
                    },
                    "mango": {
                        "name": "Mango",
                        "season": "PERENNIAL",
                        "desc": "King of fruits, major export crop for India.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep alluvial or loamy soil with pH 6.5-7.5 and good drainage.\n2. Variety: Choose region-specific varieties (Alphonso, Banganpalli, Dashehari).\n3. Land Prep: Level the land; dig 1x1x1m pits at least 1 month before monsoon.\n4. Pit Filling: Mix topsoil with 25kg FYM, 2kg Bone meal, and 1kg Neem cake.\n5. Spacing: 8x8m or 10x10m for traditional; 3x2m for High Density (HDP).\n6. Planting Time: July-August is best; avoid planting during peak summer or winter.\n7. Intercropping: Grow short-duration crops like pulses/vegetables for first 5 years.\n8. Fertilizer: Apply NPK based on age; 1kg N, 0.5kg P, 1kg K for trees >10 years.\n9. Irrigation: Frequent for young plants; for mature trees, irrigate twice a month during fruit dev.\n10. Pruning: Remove dead wood and water sprouts after harvest (August-Sept).\n11. Flower Induction: Apply Paclobutrazol (Cultar) for off-season/regular bearing.\n12. Pests: Mango Hopper and Mealy Bug are common; use yellow sticky traps.\n13. Disease: Powdery Mildew and Anthracnose are major; spray Wettable Sulphur.\n14. Micronutrients: Apply Borax (0.1%) to prevent 'Black Tip' and internal necrosis.\n15. Maturity: Harvest when fruits show a specific gravity of 1.01 to 1.02 (sink in water)."
                    },
                    "banana": {
                        "name": "Banana",
                        "season": "PERENNIAL",
                        "desc": "Fast-growing fruit crop with high nutrition.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Fertile, well-drained loamy soil with high organic matter; pH 6.5-7.5.\n2. Choice of Sucker: Use sword suckers (500-750g) or Tissue Culture (TC) plants.\n3. Land Prep: Deep plowing; prepare pits of 45x45x45cm for planting.\n4. Sowing: May-June (monsoon) or Sept-Oct; avoid very cold/hot months.\n5. Spacing: 1.8x1.8m for Robusta/Grand Naine; 1.5x1.5m for Dwarf Cavendish.\n6. Fertilizer: High requirement; 200g N, 60g P, 300g K per plant in 6-8 splits.\n7. Fertigation: Drip fertigation significantly increases yield and fruit quality.\n8. Desuckering: Remove all side suckers until the main plant flowers.\n9. Denavelling: Remove the male bud (navel) after all female hands have opened.\n10. Propping: Use bamboo poles to support plants with heavy bunches against wind.\n11. Mulching: Use dry leaves or plastic mulch to conserve moisture and control weeds.\n12. Pests: Stem Weevil and Rhizome Weevil are common; use Pheromone traps.\n13. Disease: Sigatoka Leaf Spot and Panama Wilt are serious; use Propiconazole.\n14. Bunch Management: Cover bunches with perforated polythene bags to improve color.\n15. Harvest: Harvest when 'angles' on fruit become rounded and fruit is 75-80% mature."
                    },
                    "grapes": {
                        "name": "Grapes",
                        "season": "PERENNIAL",
                        "desc": "Vineyard crop used for table and wine.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy loam to medium clayey soils with pH 6.5-7.5.\n2. Climate: Requires dry weather during flowering and fruit ripening.\n3. Training: Bower (Pandal) system is best for high yield and quality in India.\n4. Spacing: 3x3m or 3x4.5m depending on variety and training system.\n5. Pruning: Twice a year; 'Foundation Pruning' (April) and 'Fruit Pruning' (Oct).\n6. Girdling: Perform trunk/cane girdling to improve berry size and sugar content.\n7. Growth Regulators: Apply GA3 (Gibberellic Acid) for thinning and berry expansion.\n8. Fertilizer: 500kg N, 500kg P, 1000kg K per hectare for mature vineyards.\n9. Irrigation: Drip irrigation is essential; reduce watering during ripening (sugar build-up).\n10. Pests: Flea beetle and Mealy Bug are common; monitor clusters regularly.\n11. Disease: Downy Mildew is the most critical; spray Metalaxyl or Bordeaux mixture.\n12. Powdery Mildew: Common in dry weather; use Wettable Sulphur or Myclobutanil.\n13. Bunch Thinning: Over-cropping reduces quality; remove excess bunches early.\n14. Harvesting: Pick only when T.S.S. (Brix) reaches 18-22% and acidity is low.\n15. Post-Harvest: Pre-cool harvested grapes to 0-4°C within 6 hours to maintain freshness."
                    },
                    "ginger": {
                        "name": "Ginger",
                        "season": "KHARIF",
                        "desc": "Valuable spice with underground rhizomes.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy or clayey loam with rich organic matter; pH 6.0-6.5.\n2. Climate: Warm and humid; needs moderate rainfall (1500mm+) during growth.\n3. Variety: Choose based on fiber content (Mahim, Rio-de-Janeiro, Varada).\n4. Rhizome Selection: Use healthy 20-30g bits of rhizomes with 1-2 sprouts.\n5. Seed Rate: 1,500 to 1,800 kg per hectare.\n6. Planting Time: April-May with the first showers of monsoon.\n7. Bed Preparation: 1m wide beds with 25cm high ridges for drainage.\n8. Mulching: First mulch with 12t/ha green leaves at planting; repeat at 45 and 90 days.\n9. Fertilizer: 75:50:50 NPK kg/ha; apply N in two splits.\n10. Irrigation: Requires regular moisture; use sprinklers or drip in dry spells.\n11. Weed Control: 2-3 hand weedings; keep the beds well-covered with mulch.\n12. Pests: Shoot Borer and Rhizome Scale are common; use Malathion if needed.\n13. Disease: Soft Rot (Rhizome Rot) is devastating; treat rhizomes with Mancozeb.\n14. Harvesting (Green): After 6 months for fresh use; (Dry): After 8-9 months.\n15. Curing: Wash thoroughly, peel carefully, and sun dry for 8-10 days for dry ginger."
                    },
                    "garlic": {
                        "name": "Garlic",
                        "season": "RABI",
                        "desc": "Hardy bulb crop known for strong aroma.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Rich well-drained silty or clay loam with high organic content; pH 6-7.\n2. Climate: Cool climates (12-24°C) favor bulb development; sensitive to extreme heat.\n3. Variety: Choose White (G-41) or Purple (Agri-found Parvati) based on market.\n4. Prep: Plough 3-4 times; apply 25 tons of FYM to one hectare.\n5. Planting Material: Use healthy cloves (outer cloves preferred for larger bulbs).\n6. Seed Rate: 500-600 kg of cloves per hectare.\n7. Planting Method: Dibbling at 10x15cm spacing with pointed end up.\n8. Fertilizer: 100kg N, 50kg P, 50kg K per hectare.\n9. Weed Control: 2-3 hand weedings; garlic is a poor competitor against weeds.\n10. Irrigation: 10-12 irrigations required during bulb formation and expansion.\n11. Micronutrients: Respond well to Sulphur (50kg/ha) for pungent aroma.\n12. Pests: Onion Thrips are major; monitor regularly during dry spells.\n13. Disease: Purple Blotch and Stemphylium Blight; spray Mancozeb or Zineb.\n14. Harvesting: Harvest when tops turn 50-75% yellow; avoid delay to prevent splitting.\n15. Curing: Bundle and dry in shade (not direct sun) for 7-10 days for long life."
                    },
                    "soybean": {
                        "name": "Soybean",
                        "season": "KHARIF",
                        "desc": "High protein legume and oilseed.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy loam with neutral pH (6.5-7.5).\n2. Climate: Warm and moist; 25-30°C is ideal for growth.\n3. Land Prep: 2-3 deep ploughings to ensure a fine tilth and level soil.\n4. Variety: Choose yellow mosaic virus resistant varieties (JS-335, JS-9305).\n5. Seed Treatment: Treat with Rhizobium and PSB cultures for better N-fixation.\n6. Seed Rate: 70-80 kg/ha for bold seeds; 60kg for small seeds.\n7. Spacing: 45x10cm or 30x10cm depending on the variety.\n8. Fertilizer: Basal dose of 20:60:40 NPK kg/ha; high Phosphorus is key.\n9. Weed Control: Weeds cause up to 50% yield loss; use Pendimethalin.\n10. Irrigation: Two critical stages: flowering and pod development.\n11. Micronutrients: Apply 25kg/ha Zinc Sulphate and 10kg/ha Borax.\n12. Pests: Girdle Beetle and Semilooper are major; use Chlorantraniliprole.\n13. Disease: Watch for Rust and Pod Blight; spray Carbendazim early.\n14. Harvesting: Harvest when leaves turn yellow and drop; pods turn brown.\n15. Storage: Dry well to 10-12% moisture to prevent fungal and pest damage."
                    },
                    "chickpea": {
                        "name": "Chickpea (Chana)",
                        "season": "RABI",
                        "desc": "Major pulse crop, critical for protein.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Heavy-textured loamy or clayey soils with neutral pH.\n2. Climate: Cool weather (15-25°C) during growth; dry weather for ripening.\n3. Prep: Deep ploughing in summer followed by 2-3 harrowings in Rabi.\n4. Variety: Choose Bold (Kabuli) or Desi types (Pusa-362, Digvijay).\n5. Sowing Time: Oct 15th to Nov 15th for optimal pod setting.\n6. Nipping: Remove top buds 30-40 days after sowing to increase branching.\n7. Spacing: 30x10cm for Desi; 45x15cm for Kabuli varieties.\n8. Seed Treatment: Treat with Trichoderma and Rhizobium culture.\n9. Fertilizer: 20kg N, 40kg P per ha; needs less Nitrogen as it's a legume.\n10. Irrigation: Light irrigation at branching and pod development stages.\n11. Pests: Gram Pod Borer is the main pest; use pheromone traps and HNPV.\n12. Disease: Wilt and Root Rot are common; avoid waterlogging.\n13. Weed Management: 1-2 hand weedings at 30 and 60 days after sowing.\n14. Harvesting: Harvest when plants turn yellow and pods rattle.\n15. Yield Tip: Proper nipping and sulfur application can increase yield by 20%."
                    },
                    "black_gram": {
                        "name": "Black Gram (Urad)",
                        "season": "KHARIF/RABI",
                        "desc": "Nutritious pulse used in fermented foods.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Heavier clayey or loamy soils with good water storage.\n2. pH: Ideal range is 6.5 to 7.8; tolerant of slightly alkaline soils.\n3. Land Prep: Level the field to prevent waterlogging; avoid fine tilth.\n4. Variety: Select YMV (Yellow Mosaic Virus) resistant varieties.\n5. Seed Rate: 15-20 kg/ha for Kharif; 25-30 kg/ha for Rabi.\n6. Spacing: 30x10cm is standard for optimal plant population.\n7. Seed Treatment: Treat with Thiram (2g/kg) and Rhizobium culture.\n8. Fertilizer: 20kg N, 40kg P, 20kg K per hectare (Basal application).\n9. Weeding: Keep the field weed-free for the first 30 days.\n10. Irrigation: Maintain uniform moisture during flowering and podding.\n11. Pests: Aphids, Jassids, and Pod Borers; use Neem oil sprays.\n12. Disease: YMV is major; use resistant seeds and control whitefly.\n13. Green Manuring: Using Urad as a green manure crop enriches soil Nitrogen.\n14. Harvesting: Harvest when 80-90% of pods turn black and dry.\n15. Post-Harvest: Sun dry the plants before threshing to prevent seed damage."
                    },
                    "green_gram": {
                        "name": "Green Gram (Moong)",
                        "season": "KHARIF/RABI",
                        "desc": "Versatile leguminous crop, easy to digest.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Alluvial or loamy soil with neutral pH and good drainage.\n2. Climate: Warm weather (25-35°C); tolerant to dry conditions.\n3. Sowing: June-July (Kharif), Feb-March (Summer), and Oct-Nov (Rabi).\n4. Seed Rate: 12-15 kg/ha for Kharif; higher for summer crop.\n5. Seed Treatment: Bavistin (2g/kg) followed by Rhizobium culture.\n6. Spacing: 30x10cm or 25x10cm depending on the variety.\n7. Fertilizer: Apply 20kg N and 40kg P2O5 per hectare at sowing.\n8. Weed Control: Pendimethalin (1kg/ha) as pre-emergence followed by 1 weeding.\n9. Irrigation: Summer crop needs 3-4 irrigations; Kharif depends on monsoon.\n10. Pests: Flower Thrips and Pod Borers; spray Spinosad or Neem oil.\n11. Disease: Watch for Macrophomina blight and Powdery Mildew.\n12. Intercropping: Excellent for growing between rows of Cotton or Sugarcane.\n13. Sustainability: Moong beans fix Nitrogen, reducing the need for Urea for the next crop.\n14. Harvesting: Harvest when pods turn black/brown; multiple pickings may be needed.\n15. Yield: Average yield of 8-12 quintals per hectare with proper management."
                    },
                    "tea": {
                        "name": "Tea",
                        "season": "PERENNIAL",
                        "desc": "The world's most popular beverage crop.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep, well-drained acidic soil (pH 4.5-5.5) with high organic matte.\n2. Climate: Warm humid weather, high rainfall (150-300cm), and moderate heat.\n3. Altitude: High-grown tea (above 1000m) has better quality and aroma.\n4. Shade Management: Plant shade trees like Albizia to regulate micro-climate.\n5. Pit Prep: 45x45x45cm pits; fill with topsoil and organic compost.\n6. Spacing: 105x60cm or 120x60-75cm in single/double hedge systems.\n7. Pruning: Level skiffing or deep pruning every 3-4 years to maintain bush architecture.\n8. Plucking: Follow a plucking cycle based on temperature (7-12 days).\n9. Plucking Quality: 'Two leaves and a bud' is the gold standard for high-quality tea.\n10. Fertilizer: Apply NPK in 2:1:2 or 3:1:3 ratios; Sulphur is also critical.\n11. Micronutrients: Zinc Sulphate (2%) sprays improve leaf recovery after pruning.\n12. Pests: Red Spider Mite and Tea Mosquito Bug are major; use eco-friendly sprays.\n13. Disease: Blister Blight is common during monsoon; spray Copper Oxychloride.\n14. Drainage: Crucial to prevent water stagnation which causes root death.\n15. Processing: Withering, Rolling, Fermentation, and Drying are key post-harvest steps."
                    },
                    "pigeon_pea": {
                        "name": "Pigeon Pea",
                        "season": "KHARIF",
                        "desc": "Drought-tolerant pulse crop essential for protein.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy loam with neutral pH.\n2. Climate: Grows best in warm climates (25-35°C); drought tolerant.\n3. Land Prep: Deep ploughing to break hard pans for better root growth.\n4. Variety: Choose wilt-resistant hybrids (ICPH 2740, BDN 711).\n5. Sowing Time: June-July with the onset of monsoon.\n6. Seed Rate: 12-15 kg/ha for sole cropping.\n7. Spacing: 60x15cm or 90x20cm depending on variety.\n8. Seed Treatment: Treat with Trichoderma and Rhizobium culture.\n9. Fertilizer: 20kg N, 50kg P, 20kg K per hectare (Basal).\n10. Weed Control: One hand weeding at 30 days and another at 60 days.\n11. Irrigation: Critical during flowering and pod development.\n12. Pests: Pod Borer and Pod Fly are major; use Pheromone traps.\n13. Disease: Monitor for Fusarium Wilt and Sterility Mosaic.\n14. Harvesting: Harvest when 80% of pods turn brown and leaves dry up.\n15. Storage: Dry well to 10-12% moisture before storing in cool dry place."
                    },
                    "lentil": {
                        "name": "Lentil",
                        "season": "RABI",
                        "desc": "Small, lens-shaped nutritious pulse.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Grows best in clay loam to loamy soil with neutral pH.\n2. Climate: Cool weather (18-30°C); sensitive to waterlogging and frost.\n3. Prep: Fine tilth seedbed is essential for small seeds.\n4. Sowing Time: Oct 15 to Nov 15 as a Rabi crop.\n5. Variety: Select high-yielding varieties (Pusa Vaibhav, HUL 57).\n6. Seed Rate: 35-40 kg/ha for small seeds; 45-50 kg for large seeds.\n7. Spacing: 25-30cm between rows; 5cm between plants.\n8. Seed Treatment: Treat with Bavistin and Rhizobium leguminosarum.\n9. Fertilizer: 20kg N, 40kg P per hectare at sowing.\n10. Irrigation: 2 irrigations are usually enough: branching and pod filling.\n11. Weed Control: Use Pendimethalin as pre-emergence herbicide.\n12. Pests: Aphids are the main threat; spray Neem based insecticides.\n13. Disease: Watch for Wilt and Root Rot; ensure good drainage.\n14. Harvesting: Harvest when pods turn golden brown and rattle.\n15. Drying: Clear pods from threshing floor quickly to avoid moisture gain."
                    },
                    "cabbage": {
                        "name": "Cabbage",
                        "season": "RABI",
                        "desc": "Cool-season leafy vegetable for various cuisines.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Sandy loam rich in organic matter; pH 6.0-7.0.\n2. Climate: Cool temperatures (15-20°C); head formation fails in heat.\n3. Nursery: Raise seedlings in raised beds for 4-5 weeks.\n4. Variety: Choose hybrids like Quisto or Pusa Drum Head.\n5. Transplanting: Space plants at 60x45cm or 45x45cm.\n6. Fertilizer: High requirement—150kg N, 100kg P, 100kg K per ha.\n7. Irrigation: Keep soil uniformly moist; avoid fluctuations to prevent splitting.\n8. Mulching: Organic mulch helps retain moisture and control weeds.\n9. Pests: Diamondback Moth is major; use Neem seed kernel extract.\n10. Disease: Clubroot is serious; ensure soil pH is not too acidic.\n11. Boron: Apply Borax (10kg/ha) if heads show brown hollow stems.\n12. Earthing Up: Perform twice to support the heavy heads.\n13. Weeding: Keep first 60 days weed-free for maximum head size.\n14. Harvesting: Harvest when heads are firm and reach desired weight.\n15. Storage: Can keep for 1-2 weeks in cool, well-ventilated conditions."
                    },
                    "cauliflower": {
                        "name": "Cauliflower",
                        "season": "RABI",
                        "desc": "Nutritious brassica vegetable with white curd.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained loamy soil with high fertility and neutral pH.\n2. Climate: Very sensitive to climate; specific varieties for each season.\n3. Temp: 15-20°C for curd initiation; extreme heat leads to leafy curds.\n4. Nursery: 5-6 weeks nursery period; treat with Captan.\n5. Transplanting: Space at 60x45cm for mid-season varieties.\n6. Fertilizer: 120kg N, 80kg P, 80kg K per hectare.\n7. Molybdenum: 'Whiptail' disease occurs in acidic soils; apply Sodium Molybdate.\n8. Blanching: Tie outer leaves over the curd to keep it white and tender.\n9. Irrigation: Requires regular moisture; Curds become small in drought.\n10. Pests: Aphids and Diamondback Moth; monitor clusters daily.\n11. Disease: Black Rot and Downy Mildew are common; use resistant seeds.\n12. Harvesting: Cut with leaves still attached to protect the curd.\n13. Handling: Handle curds gently to avoid bruising/browning.\n14. Quality: Select curds that are compact, white, and free from diseases.\n15. Post-Harvest: Pre-cool quickly to maintain crispness and color."
                    },
                    "carrot": {
                        "name": "Carrot",
                        "season": "RABI",
                        "desc": "Vibrant root vegetable rich in Vitamin A.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep, well-drained sandy loam or silty loam; pH 6.0-7.0.\n2. Climate: Cool season crop (15-20°C); high temps cause tough roots.\n3. Land Prep: Remove all stones and clumps; plough 20-25cm deep.\n4. Variety: Choose Nantes or Pusa Rudhira (red varieties).\n5. Sowing Method: Sown on ridges (15cm high) for straight roots.\n6. Seed Rate: 4-6 kg/ha; mix seeds with sand for uniform sowing.\n7. Spacing: 30cm between ridges; 5-10cm between plants.\n8. Fertilizer: 60kg N, 40kg P, 100kg K per hectare.\n9. Thinning: Essential at 20-30 days to avoid crooked roots.\n10. Irrigation: Maintain constant moisture; dry periods followed by rain cause splitting.\n11. Weed Control: Early weeding is critical as carrot seedlings are slow growers.\n12. Pests: Carrot Rust Fly and Aphids; use row covers for young plants.\n13. Disease: Alternaria Leaf Blight; ensure good air circulation.\n14. Harvesting: Harvest when roots are 2-3cm thick at the top.\n15. Storage: Remove tops immediately after harvest; store in cool sand or fridge."
                    },
                    "brinjal": {
                        "name": "Brinjal",
                        "season": "RABI/KHARIF",
                        "desc": "Versatile vegetable, also known as Eggplant.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained silt loam or sandy loam with high organic matter.\n2. Climate: Warm weather crop (21-30°C); sensitive to frost.\n3. Variety: Choose based on fruit shape/color and wilt resistance.\n4. Nursery: Raise seedlings in pro-trays for 30-35 days.\n5. Transplanting: Space at 60x60cm or 75x60cm for larger varieties.\n6. Fertilizer: 100kg N, 80kg P, 60kg K per hectare; split Nitrogen.\n7. Irrigation: Keep soil moist but avoid waterlogging at the base.\n8. Mulching: Plastic mulch increases soil temp and reduces fruit rot.\n9. Pests: Shoot and Fruit Borer are major; use pheromone traps and trimming.\n10. Disease: Bacterial Wilt and Phomopsis Blight; use tolerant varieties.\n11. Pruning: Light pruning of lower leaves helps in air circulation.\n12. Micronutrients: Apply Zinc and Manganese for glossy skin.\n13. Harvesting: Pick when fruits are firm and skin is glossy (before seeds harden).\n14. Yield: Regular picking encourages more fruit set.\n15. Storage: Keep in a cool place (10-12°C); do not store below 5°C."
                    },
                    "papaya": {
                        "name": "Papaya",
                        "season": "PERENNIAL",
                        "desc": "Fast-growing tropical fruit with high yield.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained sandy loam or alluvial soil; pH 6.0-7.0.\n2. Climate: Tropical crop; sensitive to frost and strong winds.\n3. Drainage: Extremely sensitive to waterlogging (causes collar rot).\n4. Variety: Choose Gynodioecious (all female/hermaphrodite) like Coorg Honey Dew or Red Lady.\n5. Planting: Dig 45x45x45cm pits; space at 2x2 meters.\n6. Planting Material: Use 2-month old seedlings from nursery.\n7. Fertilizer: 250g N, 250g P, 500g K per plant per year in 2-3 splits.\n8. Irrigation: Requires regular watering; drip irrigation is highly recommended.\n9. Thinning: Remove excess fruits if bunching is too tight.\n10. Support: Stake young trees to prevent snapping in high winds.\n11. Pests: Mealy bugs and Spider mites; use soap-based sprays.\n12. Disease: Papaya Ring Spot Virus (PRSV) is major; use virus-free seeds.\n13. Gender Check: For dioecious varieties, keep 1 male for 10 females.\n14. Harvesting: Harvest when skin shows 'color break' (turning yellow).\n15. Handling: Wrap in newspaper or straw to avoid latex staining and bruising."
                    },
                    "pomegranate": {
                        "name": "Pomegranate",
                        "season": "PERENNIAL",
                        "desc": "Hardy fruit crop suitable for arid regions.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Well-drained deep loamy soil; tolerates alkalinity and salinity.\n2. Climate: Semi-arid; needs hot dry summers and cool winters.\n3. Propagation: Use hard-wood cuttings or air layering (Gooti).\n4. Planting: Pits of 60x60x60cm; spacing 4.5x4.5m or 5x5m.\n5. Training: Multi-stem system (3-4 stems) is preferred in India.\n6. Pruning: Annual pruning in winter; remove suckers and crossing branches.\n7. Bahar Treatment: Use 'Ambe' (Jan), 'Mrig' (June), or 'Hastha' (Sept) Bahar.\n8. Irrigation: Drip irrigation is essential; avoid moisture stress.\n9. Fruit Cracking: Ensure uniform irrigation to prevent skin cracking.\n10. Fertilizer: 600g N, 250g P, 500g K per mature tree.\n11. Micronutrients: Borax and Zinc Sulphate sprays improve fruit quality.\n12. Pests: Pomegranate Butterfly (Anar Butterfly) is critical; bag the fruits.\n13. Disease: Bacterial Blight (Telya) is very serious; spray Streptocycline.\n14. Harvesting: Fruit is mature when it makes a metallic sound on tapping.\n15. Storage: Can be stored for 2 months at 5°C with 90-95% humidity."
                    },
                    "coffee": {
                        "name": "Coffee",
                        "season": "PERENNIAL",
                        "desc": "High-value plantation crop grown in shade.",
                        "guidelines": "Comprehensive Cultivation Guidelines:\n1. Soil: Deep, friable, rich in organic matter, acidic (pH 5.0-6.0).\n2. Climate: Tropical (15-28°C); needs distinct dry and wet periods.\n3. Altitude: Arabica (1000-1500m); Robusta (500-1000m).\n4. Shade: Must be grown under two-tier shade (permanent and temporary).\n5. Land Prep: Terracing is necessary on slopes to prevent erosion.\n6. Planting: Pits of 45x45x45cm; spacing 2x2m (Arabica) or 3x3m (Robusta).\n7. Fertilizer: Apply NPK in splits during pre-monsoon and post-monsoon.\n8. Pruning: Topping and desuckering crucial to maintain bush shape.\n9. Blossom Showers: Artificial irrigation or first rain is needed for flowering.\n10. Mulching: Critical in young plantations for moisture conservation.\n11. Pests: Coffee Berry Borer and White Stem Borer are major threats.\n12. Disease: Coffee Leaf Rust; use tolerant varieties like S-795.\n13. Picking: Selective picking of ripe red cherries (Fly picking/Main picking).\n14. Processing: Wet method (Parchment coffee) or Dry method (Cherry coffee).\n15. Quality: Proper drying to 10-11% moisture determines the final cup quality."
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
                "search_button": "వెతకండి",
                "no_data_found": "డేటా కనుగొనబడలేదు"
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
            "crop_status": {
                "no_crops_title": "పంటలు ఏవీ ఎంచుకోలేదు",
                "no_crops_message": "మీరు ఇంకా ఏ పంటలను ఎంచుకోలేదు. దయచేసి మీ పంటను ఎంచుకోండి.",
                "boost_yield": "దిగుబడిని పెంచండి",
                "prevention": "నివారణ",
                "monitoring": "మీ పంటను పర్యవేక్షిస్తున్నాము...",
                "heavy_rain_threat": "భారీ వర్షం కురిసే అవకాశం ఉంది",
                "heavy_rain_suggestion": "ఎరువుల వినియోగాన్ని వాయిదా వేయండి.",
                "high_temp_threat": "అధిక ఉష్ణోగ్రత హెచ్చరిక",
                "high_temp_suggestion": "సాయంత్రం వేళల్లో నీరు పెట్టండి.",
                "paddy_suggestion": "2-5 సెం.మీ నిలకడగా ఉన్న నీటిని నిర్వహించండి.",
                "cotton_suggestion": "తెల్లదోమ ఉధృతిని తనిఖీ చేయండి.",
                "prod_tip_default": "నేల సారవంతాన్ని కాపాడుకోవడానికి పంట మార్పిడి చేయండి.",
                "prod_tip_paddy": "దిగుబడిని 15-20% పెంచడానికి అజొల్లాను జీవ ఎరువుగా ఉపయోగించండి.",
                "prod_tip_cotton": "మెరుగైన దిగుబడి కోసం అధిక సాంద్రత గల నాటడం పద్ధతిని అమలు చేయండి.",
                "prod_tip_maize": "నైట్రోజన్ స్థాయిలను మెరుగుపరచడానికి సోయాబీన్‌తో అంతర పంటగా సాగు చేయండి.",
                "history_advice_default": "స్థానిక ధోరణుల ఆధారంగా క్రమం తప్పకుండా తెగుళ్ల సంకేతాలను తనిఖీ చేయండి.",
                "history_advice_fungal": "గతంలో శిలీంధ్ర సమస్య గుర్తించబడింది. అధిక నైట్రోజన్‌ను నివారించండి మరియు పొలాన్ని పొడిగా ఉంచండి.",
                "history_advice_pest": "గతంలో తెగుళ్ల దాడి గమనించబడింది. ఈ సీజన్ ప్రారంభంలోనే ఫెరోమోన్ ట్రాప్‌లను ఏర్పాటు చేయండి.",
                "history_advice_recurrence": "తిరిగి రాకుండా నివారిస్తున్నాము: {{disease}}"
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
                "ai_label": "AgriSmart AI",
                "voice_unsupported": "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ సపోర్ట్ చేయబడదు.",
                "start_listening": "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
                "stop_listening": "వినడం ఆపు"
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
                "market_contact": "మార్కెట్ సంప్రదింపు",
                "download_report": "పూర్తి మార్కెట్ నివేదికను డౌన్లోడ్ చేయండి",
                "price_gap": "కనిష్ట/గరిష్ట మధ్య ధర వ్యత్యాసం ₹{{gap}}. నాణ్యత గ్రేడ్ ముఖ్యం.",
                "trend_up": "{{crop}} ధరలు పెరుగుదల ధోరణిలో ఉన్నాయి. అమ్మకానికి ఇది మంచి సమయం.",
                "trend_stable": "{{crop}} ధరలలో స్థిరత్వం కనిపిస్తోంది. తదుపరి 48 గంటల పాటు పర్యవేక్షించండి.",
                "avg_price": "{{crop}}కు సగటు ధర",
                "no_data_found": "డేటా కనుగొనబడలేదు",
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
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీటిని నిలుపుకోగలిగే సారవంతమైన జిగురు లేదా ఒండ్రు నేలలు ఉత్తమం.\n2. pH విలువ: 5.5 నుండి 6.5 వరకు ఉండాలి (స్వల్ప ఆమ్ల గుణం).\n3. భూమి తయారీ: దమ్మి రెండుసార్లు చేయాలి; చదునుగా ఉంచడం ద్వారా సమానమైన నీటి పంపిణీ సాధ్యమవుతుంది.\n4. విత్తే సమయం: జూన్-జులై (ఖరీఫ్) మరియు నవంబర్-డిసెంబర్ (రబీ).\n5. విత్తన మోతాదు: నాటు పద్ధతికి ఎకరాకు 12-15 కిలోల విత్తనం.\n6. నారుమడి యాజమాన్యం: 21-25 రోజుల వయస్సు గల నారును నాటాలి.\n7. నాటడం: వరుసల మధ్య 20 సెం.మీ మరియు మొక్కల మధ్య 15 సెం.మీ దూరం ఉండాలి.\n8. ఎరువులు: ఎకరాకు 48 కిలోల నత్రజని, 24 కిలోల భాస్వరం, 24 కిలోల పొటాష్.\n9. నీటి యాజమాన్యం: నాటిన నుండి కోత వరకు 2-5 సెం.మీ నీరు నిలిచి ఉండేలా చూడాలి.\n10. కలుపు నివారణ: నాటిన 3-5 రోజుల్లోనే కలుపు మందులను వాడాలి.\n11. పురుగులు: కాండం తొలుచు పురుగు, ఆకుముడత మరియు ఉల్లికోడు నివారణ చర్యలు.\n12. తెగుళ్లు: అగ్గి తెగులు మరియు ఆకుమచ్చ తెగుళ్లను గమనించి మందులు చల్లాలి.\n13. జింక్ లోపం: ఆకులపై గోధుమ రంగు మచ్చలు వస్తే జింక్ సల్ఫేట్ వాడండి.\n14. కోత: 80-85% గింజలు పసుపు రంగులోకి మారినప్పుడు కోత చేపట్టాలి.\n15. కోత తర్వాత: గింజల్లో 12-14% కంటే ఎక్కువ తేమ లేకుండా ఆరబెట్టాలి."
                    },
                    "wheat": {
                        "name": "గోధుమ",
                        "season": "రబీ",
                        "desc": "తటస్థ pH ఉన్న, నీరు త్వరగా ఇంకిపోయే ఒండ్రు నేలల్లో గోధుమ బాగా పెరుగుతుంది.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: తటస్థ pH కలిగిన, నీరు త్వరగా ఇంకిపోయే ఒండ్రు నేలలు అనువైనవి.\n2. వాతావరణం: పెరుగుదల దశలో 15-20°C మరియు గింజ పక్వానికి వచ్చే సమయంలో ఎండ ఉండాలి.\n3. భూమి తయారీ: 2-3 సార్లు లోతైన దుక్కి చేసి, నేలను మెత్తగా తయారు చేయాలి.\n4. విత్తే సమయం: నవంబర్ మొదటి పక్షం అత్యంత అనుకూలమైన సమయం.\n5. విత్తన మోతాదు: ఎకరాకు 40-50 కిలోల విత్తనం; ఆలస్యంగా విత్తితే మోతాదు పెంచాలి.\n6. విత్తే పద్ధతి: సీడ్ డ్రిల్‌తో 4-5 సెం.మీ లోతులో విత్తడం శ్రేయస్కరం.\n7. ఎరువులు: ఎకరాకు 48 కిలోల నత్రజని, 24 కిలోల భాస్వరం మరియు 16 కిలోల పొటాష్.\n8. నీటి పారుదల: కిరీటం వేరు దశ (CRI) లో నీరు పారించడం చాలా ముఖ్యం (21 రోజులు).\n9. అదనపు నీటి పారుదల: పిలకలు వేసే దశ, గింజ పాలు పోసుకునే దశలో నీరు తప్పనిసరి.\n10. మైక్రో న్యూట్రియంట్స్: నేలలో మాంగనీస్ మరియు జింక్ లోపాలను గమనించాలి.\n11. కలుపు నియంత్రణ: విత్తిన 30-35 రోజుల్లోపు కలుపు తీయడం ద్వారా దిగుబడి పెరుగుతుంది.\n12. తుప్పు తెగులు: పసుపు తుప్పు తెగులు రాకుండా రెసిస్టెంట్ రకాలను వాడండి.\n13. కర్నాల్ బంట్: పూత దశలో అధిక తేమ లేకుండా జాగ్రత్త పడాలి.\n14. కోత: గింజలు గట్టిపడి, తేమ 15% కన్నా తక్కువ ఉన్నప్పుడు కోయాలి.\n15. నిల్వ: తేమ లేని గదులలో నిల్వ చేయడం వల్ల బూజు పట్టకుండా ఉంటుంది."
                    },
                    "cotton": {
                        "name": "పత్తి",
                        "season": "ఖరీఫ్",
                        "desc": "పత్తికి లోతైన, సారవంతమైన నేలలు మరియు వెచ్చని వాతావరణం అవసరం.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నల్ల రేగడి నేలలు లేదా నీరు నిల్వ ఉండని సారవంతమైన ఒండ్రు నేలలు.\n2. నీరు నిల్వ ఉండటం: పత్తి మొక్క నీరు నిల్వ ఉండటాన్ని తట్టుకోదు; మంచి మురుగు నీటి సౌకర్యం ఉండాలి.\n3. విత్తే సమయం: వర్షాలు ప్రారంభమైన జూన్-జులై మాసాల్లో విత్తాలి.\n4. భూమి తయారీ: 15-20 సెం.మీ లోతుగా దుక్కి చేయాలి; ఎకరాకు 5-10 టన్నుల పశువుల ఎరువు వేయాలి.\n5. దూరం: హైబ్రిడ్ రకాలకు 90x60 సెం.మీ లేదా 60x60 సెం.మీ దూరం పాటించాలి.\n6. విత్తన శుద్ధి: రసం పీల్చే పురుగుల నుండి కాపాడటానికి ఇమిడాక్లోప్రిడ్ తో శుద్ధి చేయండి.\n7. ఎరువులు: BT పత్తికి ఎకరాకు 60:30:30 కిలోల NPK ఎరువులు వేయాలి.\n8. పలచబరచడం: మొలకెత్తిన 15 రోజులకు బలహీనమైన మొక్కలను తీసివేయాలి.\n9. అంతర కృషి: 20, 40 మరియు 60 రోజులకు కలుపు తీసి మట్టిని ఎగదోయాలి.\n10. నీటి అవసరం: పూత మరియు కాయ దశలో నీటి ఎద్దడి లేకుండా చూడాలి.\n11. పురుగుల యాజమాన్యం: శనగ పచ్చ పురుగు మరియు గులాబీ రంగు పురుగుల పట్ల నిఘా.\n12. రసం పీల్చే పురుగులు: తెల్ల దోమ మరియు పచ్చ దోమ నివారణకు ఫిరమోన్ బుట్టలు.\n13. పెరుగుదల నియంత్రణ: అధిక పెరుగుదల ఉంటే 'మెపిక్వాట్ క్లోరైడ్' వాడాలి.\n14. ఏరడం: 50-70% కాయలు పగిలిన తర్వాత ప్రతీ 15 రోజులకు ఒకసారి ఏరాలి.\n15. కోత తర్వాత: నాణ్యమైన మరియు దెబ్బతిన్న పత్తిని వేరు చేసి మార్కెట్ చేయాలి."
                    },
                    "maize": {
                        "name": "మక్కజొన్న",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "అనేక భారతీయ వాతావరణాలకు సరిపోయే బహుముఖ పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీరు నిల్వ ఉండని, సారవంతమైన ఎర్ర నేలలు లేదా ఒండ్రు నేలలు (pH 5.5-7.5).\n2. ఉష్ణోగ్రత: 21°C నుండి 27°C ఉష్ణోగ్రత పెరుగుదలకు అనుకూలం.\n3. భూమి తయారీ: 2-3 సార్లు దుక్కి చేసి నేలను మెత్తగా తయారు చేయాలి.\n4. విత్తే సమయం: ఖరీఫ్ జూన్-జులై మరియు రబీ అక్టోబర్-నవంబర్.\n5. విత్తన మోతాదు: ఎకరాకు 7.5 నుండి 8 కిలోల విత్తనం అవసరం.\n6. విత్తే లోతు: గింజను 3-5 సెం.మీ లోతులో విత్తాలి.\n7. ఎరువులు: ఎకరాకు 48 కిలోల నత్రజని, 24 కిలోల భాస్వరం, 20 కిలోల పొటాష్.\n8. మైక్రో న్యూట్రియంట్స్: జింక్ లోపం రాకుండా ఎకరాకు 10 కిలోల జింక్ సల్ఫేట్ వేయాలి.\n9. కలుపు నివారణ: విత్తిన 48 గంటల్లోపు ఎట్రాజన్ వంటి కలుపు మందులను వాడాలి.\n10. నీటి పారుదల: మోకాలు ఎత్తు దశ, పూత దశ మరియు గింజ ఊరే దశల్లో నీరు ముఖ్యం.\n11. పురుగులు: కత్తెర పురుగు నివారణకు ప్రత్యేక జాగ్రత్తలు తీసుకోవాలి.\n12. తెగుళ్లు: ఆకుమచ్చ తెగులు రాకుండా కాపర్ ఆధారిత మందులు వాడాలి.\n13. కోత: కంకి పై పొట్టు ఎండిపోయి, గింజలు గట్టిపడినప్పుడు కోయాలి.\n14. వొలుచుట: కంకులను ఎండబెట్టిన తర్వాత యంత్రాల ద్వారా గింజలను వేరు చేయాలి.\n15. నిల్వ: తేమ 12% కంటే తక్కువ ఉండేలా చూసుకుని గోనె సంచుల్లో నిల్వ చేయాలి."
                    },
                    "chilli": {
                        "name": "మిరప",
                        "season": "రబీ/ఖరీఫ్",
                        "desc": "సేంద్రీయ పదార్థం ఎక్కువగా ఉండే నేలలు మిరపకు అనుకూలం.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగు నీరు పోయే సౌకర్యం గల ఇసుక లోమ్ లేదా నల్ల రేగడి నేలలు.\n2. pH విలువ: 6.5 నుండి 7.5 వరకు ఉండాలి; ఉప్పు నేలలు పనికిరావు.\n3. వాతావరణం: వేడి మరియు తేమ గల వాతావరణం; అతివృష్టి మరియు మంచు పడకూడదు.\n4. నారుమడి: ఎత్తైన నారుమడులపై 40-45 రోజులు నారు పెంచాలి.\n5. నాటడం: వరుసల మధ్య 60 సెం.మీ మరియు మొక్కల మధ్య 45 సెం.మీ దూరం ఉండాలి.\n6. ఎరువులు: ఎకరాకు 60:30:30 కిలోల NPK ఎరువులు వాడాలి.\n7. మల్చింగ్: తేమను కాపాడటానికి గడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ వాడవచ్చు.\n8. నీటి పారుదల: పూత మరియు కాయ దశలో క్రమం తప్పకుండా నీరు ఇవ్వాలి.\n9. పురుగులు: తామర పురుగులు, ఎర్ర నల్లి నివారణకు వేప నూనె వాడాలి.\n10. తెగుళ్లు: కొమ్మ మరియు కాయ కుళ్ళు తెగుళ్లను గమనించి నివారణ చేపట్టాలి.\n11. మైక్రో న్యూట్రియంట్స్: మెరుగైన నాణ్యత కోసం బోరాన్ మరియు కాల్షియం వాడండి.\n12. కలుపు నియంత్రణ: 2-3 సార్లు అంతర కృషి చేయడం ద్వారా కలుపు నివారించాలి.\n13. పచ్చి మిర్చి కోత: నాటిన 60-70 రోజులకు కాయ గట్టిపడినప్పుడు కోయాలి.\n14. ఎండు మిర్చి కోత: కాయ పూర్తిగా ఎర్రగా మారినప్పుడు కోయాలి.\n15. ఎండబెట్టడం: శుభ్రమైన సిమెంట్ కల్లాలపై రంగు తగ్గకుండా ఎండబెట్టాలి."
                    },
                    "turmeric": {
                        "name": "పసుపు",
                        "season": "ఖరీఫ్",
                        "desc": "అద్భుతమైన ఔషధ గుణాలు కలిగిన సాంబార పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీరు నిల్వ ఉండని సారవంతమైన ఒండ్రు నేలలు (pH 5.0-7.5).\n2. వాతావరణం: వేడి మరియు తేమతో కూడిన వాతావరణం, తగినంత వర్షపాతం.\n3. విత్తన ఎంపిక: తెగుళ్లు లేని తల్లి కొమ్ములను విత్తనంగా వాడాలి.\n4. విత్తన మోతాదు: ఎకరాకు 800-1000 కిలోల విత్తన కొమ్ములు అవసరం.\n5. భూమి తయారీ: 1 మీటర్ వెడల్పు, 15-30 సెం.మీ ఎత్తు గల మడులను చేయాలి.\n6. నాటడం సమయం: ఏప్రిల్-మే మాసాలు నాటడానికి అత్యంత అనుకూలం.\n7. దూరం: 30x15 సెం.మీ లేదా 30x30 సెం.మీ దూరం పాటించాలి.\n8. మల్చింగ్: నాటిన వెంటనే ఆకులతో మల్చింగ్ చేయడం ద్వారా తేమను కాపాడవచ్చు.\n9. రెండో మల్చింగ్: నాటిన 50 మరియు 90 రోజులకు తిరిగి మల్చింగ్ చేయాలి.\n10. నీటి పారుదల: మొలక వచ్చే దశ మరియు కొమ్ము ఊరే దశల్లో నీరు ముఖ్యం.\n11. మైక్రో న్యూట్రియంట్స్: పసుపు పంటకు జింక్ మరియు ఐరన్ ఎరువులు అవసరం.\n12. పురుగులు: కాండం తొలుచు పురుగు నివారణకు జాగ్రత్తలు తీసుకోవాలి.\n13. తెగుళ్లు: దుంప కుళ్ళు తెగులు రాకుండా మందులతో శుద్ధి చేయాలి.\n14. కోత: నాటిన 7-9 నెలలకు ఆకులు ఎండిపోయినప్పుడు తవ్వాలి.\n15. క్యూరింగ్: తవ్విన కొమ్ములను ఉడికించి, 10-15 రోజులు ఎండబెట్టాలి."
                    },
                    "tomato": {
                        "name": "టమోటా",
                        "season": "రబీ",
                        "desc": "ఇసుకలోమ్ నేలలకు సరిపడే అధిక విలువ కలిగిన పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సేంద్రీయ పదార్థాలు పుష్కలంగా ఉన్న ఇసుక లోమ్ నేలలు.\n2. pH విలువ: 6.0 నుండి 7.0 వరకు ఉండాలి; చవిటి నేలల్లో నాటకండి.\n3. వాతావరణం: పగలు 20-25°C మరియు రాత్రి 15-20°C ఉష్ణోగ్రతలు ఉత్తమం.\n4. రకము: అధిక దిగుబడి మరియు తెగుళ్లను తట్టుకునే హైబ్రిడ్ రకాలను ఎంచుకోండి.\n5. నారు యాజమాన్యం: ప్రో-ట్రేలలో కోకో-పీట్ ఉపయోగించి 25-30 రోజులు నారు పెంచాలి.\n6. ఎత్తైన మడులు: మంచి గాలి ప్రసరణ కోసం 1.2 మీటర్ల వెడల్పున్న ఎత్తైన మడులు చేయాలి.\n7. నాటడం: మొక్కల మధ్య 60x45 సెం.మీ దూరం ఉండాలి; ప్లాస్టిక్ మల్చింగ్ మేలు.\n8. ఎరువులు: ఎకరాకు 60 కిలోల నత్రజని, 40 కిలోల భాస్వరం మరియు 40 కిలోల పొటాష్.\n9. మద్దతు (Staking): నాటిన 15 రోజుల్లో వెదురు కర్రలతో మొక్కలకు మద్దతు ఇవ్వాలి.\n10. కత్తిరింపు: ప్రధాన కాండంపై వచ్చే అదనపు రెమ్మలను ఎప్పటికప్పుడు తొలగించాలి.\n11. నీటి పారుదల: పూత మరియు కాయ పెరిగే దశల్లో నీటి ఎద్దడి రాకుండా చూడాలి.\n12. పురుగులు: కాయతొలుచు పురుగు నివారణకు ఫిరమోన్ బుట్టలు వాడాలి.\n13. తెగుళ్లు: ఆకుమాడు తెగులు మరియు బాక్టీరియల్ వాడి తెగులు పట్ల జాగ్రత్త.\n14. పోషణ: కాయ పగుళ్లు రాకుండా మరియు నాణ్యత కోసం కాల్షియం మరియు బోరాన్ వాడండి.\n15. కోత: రవాణా కోసం గట్టిగా ఉన్నప్పుడే లేదా స్థానిక వినియోగానికి పండిన తర్వాత కోయాలి."
                    },
                    "sugarcane": {
                        "name": "చెరకు",
                        "season": "బహువార్షిక",
                        "desc": "అధిక నీటి వినియోగం కలిగి సావంతమైన నేలల్లో పెరుగుతుంది.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: లోతైన, సారవంతమైన మరియు నీటిని నిలుపుకునే నేలలు ఉత్తమం.\n2. వాతావరణం: ఉష్ణమండల వాతావరణం; 20-30°C ఉష్ణోగ్రత పెరుగుదలకు అవసరం.\n3. భూమి తయారీ: లోతుగా దున్ని (30-45 సెం.మీ) నేలను మెత్తగా తయారు చేయాలి.\n4. రకాలు: Co-86032 వంటి అధిక చక్కెర శాతం గల రకాలను ఎంచుకోండి.\n5. విత్తన ఎంపిక: 8-10 నెలల వయస్సు గల 2-3 కళ్ళు ఉన్న ఆరోగ్యకరమైన కాండాలను వాడాలి.\n6. నాటడం పద్ధతి: ట్రెంచ్ (కందకం) పద్ధతి ద్వారా నాటితే అధిక దిగుబడి వస్తుంది.\n7. ఎరువులు: నత్రజని ఎరువులు ఎక్కువగా అవసరం; ఎకరాకు 100 కిలోల నత్రజని వాడాలి.\n8. మట్టిని ఎగదోయడం: నాటిన 60, 90 మరియు 120 రోజులకు మట్టిని ఎగదోయాలి.\n9. నీటి పారుదల: నేలలో ఎప్పుడూ తేమ ఉండేలా చూడాలి; నీటి నిల్వ ఉండకూడదు.\n10. కలుపు నియంత్రణ: విత్తిన వెంటనే కలుపు మందులను చల్లి, తర్వాత అంతర కృషి చేయాలి.\n11. పిలకల తొలగింపు: ప్రధాన కాండం బలంగా ఉండటానికి అడుగున వచ్చే పిలకలని తొలగించాలి.\n12. గాలి ప్రసరణ: ఎండు ఆకులను తీసివేయడం ద్వారా గాలి ప్రసరణ పెరుగుతుంది.\n13. పురుగులు: మువ్వతొలుచు పురుగు నివారణకు ప్రత్యేక జాగ్రత్తలు చేపట్టాలి.\n14. గింజ శాతాన్ని పరీక్షించుట: కోతకు ముందు గింజలో చక్కెర శాతం (Brix) పరీక్షించాలి.\n15. కోత: నేల మట్టానికి కోసి, 24 గంటల్లో చక్కెర మిల్లుకు తరలించాలి."
                    },
                    "groundnut": {
                        "name": "వేరుశనగ",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "నేలలో నైట్రోజన్‌ను స్థిరీకరించే నూనెగింజ పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: ఇసుక నేలలు లేదా ఎర్ర లోమ్ నేలలు (pH 6.0-7.5) కాయ ఊరడానికి అనుకూలం.\n2. మురుగునీటి సౌకర్యం: నీరు నిల్వ ఉంటే విత్తనం కుళ్ళిపోతుంది; మంచి మురుగునీటి సౌకర్యం ఉండాలి.\n3. భూమి తయారీ: 2-3 సార్లు దుక్కి చేసి, నేలను సమానంగా చదును చేయాలి.\n4. రకము: నూనె శాతం ఎక్కువగా ఉండే రకాలను లేదా లావు గింజ రకాలను వాడాలి.\n5. విత్తన శుద్ధి: వేరు కుళ్ళు తెగులు రాకుండా మాంకోజెబ్ తో విత్తన శుద్ధి చేయండి.\n6. విత్తే సమయం: ఖరీఫ్ జూన్-జులై మరియు రబీ/వేసవి అక్టోబర్-నవంబర్.\n7. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం ఉండాలి.\n8. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని, 16 కిలోల భాస్వరం మరియు జిప్సం వేయాలి.\n9. జిప్సం ప్రాముఖ్యత: ఊడ దిగే దశలో ఎకరాకు 200 కిలోల జిప్సం కాయ నాణ్యతకు ముఖ్యం.\n10. కలుపు నియంత్రణ: కలుపు నివారణకు విత్తిన వెంటనే పెండి మిథాలిన్ వాడాలి.\n11. నీటి పారుదల: పూత, ఊడ దిగే మరియు కాయ ఊరే దశల్లో నీరు చాలా ముఖ్యం.\n12. పురుగులు: ఎర్ర గొంగళి పురుగు మరియు తామర పురుగుల నివారణ చర్యలు.\n13. తెగుళ్లు: టిక్కా ఆకుమచ్ఛ తెగులు నివారణకు శిలీంద్ర నాశకాలను వాడాలి.\n14. కోత: ఆకులు పసుపు రంగులోకి మారి, కాయ లోపలి పొర నల్లగా ఉన్నప్పుడు కోయాలి.\n15. కోత తర్వాత: తేమ 10% కంటే తక్కువ వచ్చే వరకు కాయలను ఎండబెట్టాలి."
                    },
                    "mustard": {
                        "name": "ఆవాలు",
                        "season": "రబీ",
                        "desc": "ఉత్తర భారతదేశపు ప్రధాన నూనెగింజ పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సారవంతమైన, నీరు నిల్వ ఉండని ఒండ్రు నేలలు (pH 6.0-7.5).\n2. వాతావరణం: చల్లని మరియు పొడి వాతావరణంలో బాగా పెరుగుతుంది; మంచుకు సున్నితం.\n3. భూమి తయారీ: 2-3 సార్లు దుక్కి చేసి నేలను మెత్తగా తయారు చేయాలి.\n4. రకము: పుసా బోల్డ్ లేదా RH-30 వంటి అధిక దిగుబడినిచ్చే రకాలను ఎంచుకోండి.\n5. విత్తే సమయం: అక్టోబర్ మొదటి పక్షం విత్తడానికి అత్యంత అనుకూలం.\n6. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం ఉండాలి.\n7. ఎరువులు: ఎకరాకు 32 కిలోల నత్రజని, 16 కిలోల భాస్వరం మరియు గంధకం వాడాలి.\n8. గంధకం ప్రాముఖ్యత: గింజలలో నూనె శాతం పెరగడానికి గంధకం (Sulphur) చాలా ముఖ్యం.\n9. పలచబరచడం: విత్తిన 15-20 రోజులకు బలహీనమైన మొక్కలను తీసివేసి దూరం పాటించాలి.\n10. నీటి పారుదల: పూత మరియు కాయ ఊరే దశల్లో నీరు అందించాలి.\n11. పురుగులు: పేనుబంక నివారణకు ఆక్సి-డెమెటాన్ మిథైల్ వాడండి.\n12. తెగుళ్లు: తెల్ల తుప్పు తెగులు రాకుండా మాంకోజెబ్ మందును చల్లాలి.\n13. కలుపు నియంత్రణ: ఒకటి లేదా రెండుసార్లు కలుపు తీయడం వల్ల దిగుబడి పెరుగుతుంది.\n14. కోత: 75% కాయలు పసుపు రంగులోకి మారినప్పుడు పంట కోయాలి.\n15. నిల్వ: గింజలలో తేమ 8-9% ఉన్నప్పుడు మాత్రమే నిల్వ చేయాలి."
                    },
                    "onion": {
                        "name": "ఉల్లిపాయ",
                        "season": "రబీ/ఖరీఫ్",
                        "desc": "దాదాపు ప్రతి వంటగదిలో ఉపయోగించే ముఖ్యమైన పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సేంద్రీయ పదార్థాలు ఉన్న సారవంతమైన ఇసుక లోమ్ నేలలు (pH 6.0-7.0).\n2. వాతావరణం: పెరుగుదల దశలో 15-25°C మరియు గడ్డ ఊరే సమయంలో 25-30°C.\n3. రకము: సీజన్ ని బట్టి ఖరీఫ్ లేదా రబీ రకాలను ఎంచుకోవాలి.\n4. నారుమడి: 7-8 వారాల వయస్సు కలిగిన నారును మాత్రమే నాటాలి.\n5. నాటడం: 15x10 సెం.మీ దూరం పాటించాలి; సాయంత్రం వేళల్లో నాటడం ఉత్తమం.\n6. ఎరువులు: ఎకరాకు 40 కిలోల నత్రజని, 20 కిలోల భాస్వరం మరియు 40 కిలోల పొటాష్.\n7. నీటి పారుదల: తరచుగా తక్కువ నీటిని పారించాలి; నీరు నిల్వ ఉండకూడదు.\n8. నీటి నిలిపివేత: కోతకు 10-15 రోజుల ముందు నీరు ఆపేస్తే నిల్వ సామర్థ్యం పెరుగుతుంది.\n9. కలుపు నియంత్రణ: ఉల్లి పంటలో కలుపు తీయడం చాలా ముఖ్యం; తగిన మందులు వాడాలి.\n10. మైక్రో న్యూట్రియంట్స్: గడ్డ నాణ్యత కోసం జింక్ మరియు బోరాన్ వాడండి.\n11. పురుగులు: తామర పురుగుల నివారణకు ఎసిఫేట్ వంటి మందులు వాడాలి.\n12. తెగుళ్లు: ఆకుమచ్చ తెగులు రాకుండా మాంకోజెబ్ మందును చల్లాలి.\n13. కోత: 50-70% మొక్కల ఆకులు క్రిందకు వాలినప్పుడు కోత చేపట్టాలి.\n14. క్యూరింగ్: 3 రోజులు పొలంలో, తర్వాత 7-10 రోజులు నీడలో ఆరబెట్టాలి.\n15. నిల్వ: గాలి ఆడే గదుల్లో మాత్రమే నిల్వ చేయాలి; ఎక్కువ ఎత్తులో పోయకండి."
                    },
                    "potato": {
                        "name": "బంగాళదుంప",
                        "season": "రబీ",
                        "desc": "ప్రపంచవ్యాప్తంగా అత్యంత ముఖ్యమైన కూరగాయల పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగునీరు పోయే సౌకర్యం గల గుల్లగా ఉండే సారవంతమైన ఇసుక లోమ్ నేలలు.\n2. వాతావరణం: పగలు మిడిల్ ఉష్ణోగ్రత మరియు రాత్రి చల్లగా ఉండటం దుంప ఊరడానికి కీలకం.\n3. రకము: ప్రాంతానికి సరిపడే కుఫ్రి జ్యోతి లేదా కుఫ్రి బహార్ వంటి రకాలను ఎంచుకోండి.\n4. విత్తన ఎంపిక: 2-3 మొలక కళ్ళు ఉన్న ఆరోగ్యకరమైన విత్తన దుంపలను వాడాలి.\n5. విత్తే సమయం: మైదాన ప్రాంతాల్లో అక్టోబర్-నవంబర్ లో నాటడం శ్రేయస్కరం.\n6. దూరం: వరుసల మధ్య 60 సెం.మీ మరియు దుంపల మధ్య 20 సెం.మీ దూరం ఉండాలి.\n7. ఎరువులు: ఎకరాకు 60 కిలోల నత్రజని, 40 కిలోల భాస్వరం, 48 కిలోల పొటాష్.\n8. మట్టిని ఎగదోయడం: 30 మరియు 50 రోజులకు మొక్క మొదలు వద్ద మట్టిని ఎగదోయాలి.\n9. నీటి పారుదల: నేలలో ఎప్పుడూ తేమ ఉండాలి; నీటి ఎద్దడి వస్తే దుంప నాణ్యత తగ్గుతుంది.\n10. కలుపు నియంత్రణ: మెట్రిబ్యూజిన్ వంటి కలుపు మందులను విత్తిన వెంటనే వాడాలి.\n11. పురుగులు: పేనుబంక మరియు దుంప పురుగుల పట్ల అప్రమత్తంగా ఉండాలి.\n12. తెగుళ్లు: ఆకుమాడు తెగులు అత్యంత ప్రమాదకరం; కాపర్ మందులు వాడాలి.\n13. ఆకులు కోయుట: కోతకు 10-12 రోజుల ముందు ఆకులను కోసివేయడం ద్వారా తోలు గట్టిపడుతుంది.\n14. కోత: భూమి ఎండినప్పుడు దుంపలకు దెబ్బ తగలకుండా జాగ్రత్తగా తవ్వాలి.\n15. నిల్వ: 7 రోజులు గది ఉష్ణోగ్రత వద్ద ఉంచి, తర్వాత కోల్డ్ స్టోరేజ్ కు తరలించాలి."
                    },
                    "guava": {
                        "name": "జామ",
                        "season": "బహువార్షిక",
                        "desc": "విటమిన్ సి సమృద్ధిగా ఉండే పండ్ల పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సారవంతమైన, నీరు నిల్వ ఉండని ఇసుక లోమ్ లేదా ఎర్ర నేలలు ఉత్తమం.\n2. వాతావరణం: ఉష్ణ మరియు ఉప-ఉష్ణమండల వాతావరణం; తీవ్రమైన మంచును తట్టుకోలేదు.\n3. నాటడం: 5x5 లేదా 6x6 మీటర్ల దూరంలో 60x60x60 సెం.మీ గుంతలు తీసి నాటాలి.\n4. గుంతల తయారీ: ఎకరాకు 20-25 కిలోల పశువుల ఎరువు, సూపర్ ఫాస్ఫేట్ తో గుంతలను నింపాలి.\n5. శిక్షణ (Training): చిన్న మొక్కలకు 60-90 సెం.మీ వరకు ఒకే కాండం ఉండేలా చూసి, తర్వాత కొమ్మలు రానివ్వాలి.\n6. కత్తిరింపు (Pruning): ఏటా ఫిబ్రవరి మరియు ఆగస్టులో ఎండు కొమ్మలు, అడ్డంగా పెరిగే కొమ్మలను కత్తిరించాలి.\n7. ఎరువులు: ఎకరాకు 600 గ్రా నత్రజని, 400 గ్రా భాస్వరం మరియు పొటాష్ ప్రతీ చెట్టుకు వేయాలి.\n8. నీటి పారుదల: పూత మరియు కాయ పెరిగే దశలో క్రమం తప్పకుండా నీరు ఇవ్వాలి.\n9. బహార్ యాజమాన్యం: సంవత్సరానికి ఒకే పంట (మృగ్ బహార్) తీసుకోవడం దిగుబడికి శ్రేయస్కరం.\n10. పురుగులు: పండు ఈగ నివారణకు ఫిరమోన్ బుట్టలు మరియు మలాథియాన్ వాడాలి.\n11. తెగుళ్లు: కాయ కుళ్ళు మరియు ఆకుమచ్చ తెగుళ్ళ పట్ల జాగ్రత్త వహించాలి.\n12. మైక్రో న్యూట్రియంట్స్: జింక్ మరియు బోరాన్ లోపాలను గమనించి పిచికారీ చేయాలి.\n13. కాయ నాణ్యత: కాయలు పెద్దవిగా అవ్వడానికి పూత సమయంలో పొటాష్ ఎరువులు కీలకం.\n14. కోత: కాయ పసుపు పచ్చ రంగులోకి మారుతున్నప్పుడు రంగు మారకముందే కోయాలి.\n15. ప్యాకేజింగ్: దెబ్బతినకుండా గడ్డి లేదా పేపర్ చుట్టి బాక్సులలో ప్యాక్ చేయాలి."
                    },
                    "mango": {
                        "name": "మామిడి",
                        "season": "బహువార్షిక",
                        "desc": "పండ్లలో రాజు, భారతదేశం నుండి ప్రధాన ఎగుమతి పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: లోతైన, సారవంతమైన మరియు నీరు త్వరగా ఇంకిపోయే ఎర్ర నేలలు లేదా ఒండ్రు నేలలు.\n2. pH విలువ: 6.5 నుండి 7.5 వరకు ఉండాలి; ఉప్పు నేలలు సాగుకు పనికిరావు.\n3. రకాలు: ఎగుమతికి బంగినపల్లి, ఆల్ఫోన్సో మరియు స్థానిక మార్కెట్ కు తోటపురి శ్రేష్ఠమైనవి.\n4. నాటడం సమయం: జూన్ నుండి సెప్టెంబర్ వరకు వర్షాకాలంలో నాటడం ఉత్తమం.\n5. గుంతల తయారీ: 1x1x1 మీటర్ల పరిమాణంలో గుంతలు తీసి 15 రోజులు ఎండనివ్వాలి.\n6. ఎరువులు: ప్రతీ చెట్టుకు 100 కిలోల పశువుల ఎరువు, 2 కిలోల నత్రజని, 1 కిలో భాస్వరం వేయాలి.\n7. నీటి పారుదల: చిన్న చెట్లకు తరచుగా, కాపుకు వచ్చిన చెట్లకు కాయ దశలో నీరు ఇవ్వాలి.\n8. పూత యాజమాన్యం: పూత సమయంలో తేనె మంచు పురుగు (Hopper) నివారణకు చర్యలు తీసుకోవాలి.\n9. పూత రాలడం: పూత రాలకుండా ఉండటానికి ప్లానోఫిక్స్ (Planofix) వంటి హార్మోన్లు వాడాలి.\n10. మైక్రో న్యూట్రియంట్స్: పండ్లు తియ్యగా ఉండటానికి బోరాన్ మరియు జింక్ సల్ఫేట్ పిచికారీ చేయాలి.\n11. పండు ఈగ: మార్చి-ఏప్రిల్ నెలల్లో పండు ఈగ నివారణకు ఫిరమోన్ బుట్టలు పెట్టాలి.\n12. కత్తిరింపు: కాపు అయిపోయిన వెంటనే ఎండు కొమ్మలను కత్తిరించి బోర్డో మిశ్రమం పూయాలి.\n13. అంతర పంటలు: మొదటి 5-8 ఏళ్ల వరకు కూరగాయలను అంతర పంటలుగా పండించవచ్చు.\n14. కోత: కాయ భుజాలు నిండినప్పుడు, రంగు మారడం ప్రారంభించినప్పుడు కోయాలి.\n15. కోత తర్వాత: జిగురు కారకుండా జాగ్రత్తగా శుభ్రం చేసి గ్రేడింగ్ చేయాలి."
                    },
                    "banana": {
                        "name": "అరటి",
                        "season": "బహువార్షిక",
                        "desc": "అధిక పోషకాహారంతో వేగంగా పెరుగుతున్న పండ్ల పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: లోతైన, సారవంతమైన మరియు మురుగునీరు పోయే సౌకర్యం గల ఒండ్రు నేలలు.\n2. pH విలువ: 6.5 నుండి 7.5 వరకు ఉండాలి; నీరు నిల్వ ఉండే నేలల్లో అరటి వేయకండి.\n3. రకాలు: మార్కెట్ డిమాండ్ ను బట్టి గ్రాండ్ నైన్ (G-9) లేదా అమృతపాణి రకాలను ఎంచుకోండి.\n4. ప్రచారం: టిష్యూ కల్చర్ మొక్కలు లేదా ఆరోగ్యకరమైన సూది పిలకలను వాడాలి.\n5. నాటడం: 1.8x1.8 మీటర్ల దూరం పాటించాలి; నాటిన తర్వాత గట్టిగా తొక్కాలి.\n6. నీటి పారుదల: అరటికి ఎక్కువ నీరు అవసరం; డ్రిప్ పద్ధతి ద్వారా నీరు అందజేయడం ఉత్తమం.\n7. ఎరువులు: పొటాషియం ఎరువులు ఎక్కువగా అవసరం; దఫదఫాలుగా ఎరువులు వేయాలి.\n8. పిలకల తొలగింపు (Desuckering): ప్రధాన మొక్క పక్కన వచ్చే పిలకలను ఎప్పటికప్పుడు తొలగించాలి.\n9. మట్టిని ఎగదోయడం: 3 మరియు 5వ నెలలో మట్టిని కుదుళ్ల వద్ద ఎగదోయాలి.\n10. మద్దతు (Propping): గెల బరువుకు చెట్టు పడిపోకుండా వెదురు కర్రలతో మద్దతు ఇవ్వాలి.\n11. గెల యాజమాన్యం: గెలపై ఎండు ఆకులు మరియు మగ పువ్వును (Denaveling) తొలగించాలి.\n12. పురుగులు: దుంప ముక్కు పురుగు మరియు తామర పురుగుల నివారణ చర్యలు.\n13. తెగుళ్లు: సిగాటోకా ఆకుమచ్చ తెగులు నివారణకు శిలీంద్ర నాశకాలను వాడాలి.\n14. గెల కవరింగ్: నాణ్యత కోసం గెలకు రంధ్రాలు ఉన్న పాలిథిన్ కవర్లను తొడగాలి.\n15. కోత: గెలలోని కాయల మూలలు గుండ్రంగా మారినప్పుడు కోయాలి."
                    },
                    "grapes": {
                        "name": "ద్రాక్ష",
                        "season": "బహువార్షిక",
                        "desc": "టేబుల్ మరియు వైన్ కోసం ఉపయోగించే ద్రాక్షతోట పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీరు త్వరగా ఇంకిపోయే సారవంతమైన నేలలు; వేర్లు లోతుగా చొచ్చుకుపోయేలా ఉండాలి.\n2. వాతావరణం: వేడి మరియు పొడి వాతావరణం; పూత సమయంలో వర్షం పడకూడదు.\n3. శిక్షణ పద్ధతి: గాలి మరియు వెలుతురు కోసం 'పందిరి' (Bower) పద్ధతి అత్యంత శ్రేయస్కరం.\n4. కత్తిరింపు (Pruning): సంవత్సరానికి రెండుసార్లు ఏప్రిల్ (Back pruning) మరియు అక్టోబర్ (Forward pruning).\n5. అక్టోబర్ కత్తిరింపు: కాయల కోత కోసం అక్టోబర్ లో చేసే కత్తిరింపు చాలా కీలకం.\n6. నీటి పారుదల: కత్తిరింపు తర్వాత మరియు కాయ పెరిగే దశలో క్రమం తప్పకుండా నీరు ఇవ్వాలి.\n7. ఎరువులు: ఎకరాకు 200 కిలోల నత్రజని, 120 కిలోల భాస్వరం మరియు 200 కిలోల పొటాష్.\n8. కాయలు పల్చబరచడం: నాణ్యత మరియు పరిమాణం కోసం కాయలను చేతితో పల్చబరచాలి.\n9. పోషణ: కాయలు పగలకుండా మరియు తియ్యగా ఉండటానికి కాల్షియం మరియు బోరాన్ వాడండి.\n10. పురుగులు: పిండి నల్లి (Mealy bug) నివారణకు ప్రత్యేక జాగ్రత్తలు తీసుకోవాలి.\n11. తెగుళ్లు: బూజు తెగులు మరియు ఆకుమచ్చ తెగుళ్ళ నివారణకు బోర్డో మిశ్రమం వాడాలి.\n12. హార్మోన్లు: కాయ పరిమాణం పెరగడానికి GA3 (Gibberellic Acid) వాడవచ్చు.\n13. కోత: కాయ పూర్తిగా పక్వానికి వచ్చి రంగు మరియు రుచి మారినప్పుడు కోయాలి.\n14. కోత తర్వాత: ద్రాక్ష గుత్తులను జాగ్రత్తగా ట్రేలలో అమర్చి రవాణా చేయాలి.\n15. ఎండబెట్టడం: కిస్మిస్ తయారీకి ఎండు ద్రాక్ష రకాలను ప్రత్యేకంగా సాగు చేయాలి."
                    },
                    "ginger": {
                        "name": "అల్లం",
                        "season": "ఖరీఫ్",
                        "desc": "భూగర్భ కొమ్ములతో కూడిన విలువైన సాంబార పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సారవంతమైన ఇసుక లోమ్ లేదా ఒండ్రు నేలలు; నీరు నిల్వ ఉంటే దుంప కుళ్ళిపోతుంది.\n2. pH విలువ: 6.0 నుండి 6.5 వరకు ఉండాలి; అల్లం సాగుకు మట్టిని బాగా మెత్తగా చేయాలి.\n3. విత్తన ఎంపిక: తెగుళ్లు లేని 2.5-5 సెం.మీ పొడవు గల కొమ్ములను విత్తనంగా వాడాలి.\n4. విత్తన మోతాదు: ఎకరాకు సుమారుగా 600-750 కిలోల విత్తన కొమ్ములు అవసరం.\n5. నాటడం సమయం: మే-జూన్ మాసాల్లో వర్షాలు ప్రారంభమయ్యే ముందు నాటాలి.\n6. దూరం: వరుసల మధ్య 25-30 సెం.మీ మరియు మొక్కల మధ్య 15-20 సెం.మీ దూరం ఉండాలి.\n7. మల్చింగ్: నాటిన వెంటనే ఆకులతో మల్చింగ్ చేయడం వల్ల మొలక శాతం పెరుగుతుంది.\n8. రెండో మల్చింగ్: నాటిన 45 మరియు 90 రోజులకు తిరిగి మల్చింగ్ మరియు మట్టిని ఎగదోయాలి.\n9. ఎరువులు: ఎకరాకు 30 కిలోల నత్రజని, 20 కిలోల భాస్వరం మరియు 20 కిలోల పొటాష్.\n10. నీటి పారుదల: మొలక వచ్చే దశలో మరియు కొమ్ము పెరిగే దశలో తేమ తప్పనిసరి.\n11. పురుగులు: కాండం తొలుచు పురుగు నివారణకు పిచికారీ చేయాలి.\n12. తెగుళ్లు: దుంప కుళ్ళు తెగులు అత్యంత ప్రమాదకరం; నీరు నిల్వ ఉండకుండా చూడాలి.\n13. కలుపు నియంత్రణ: 2-3 సార్లు చేతితో కలుపు తీయడం ద్వారా దిగుబడి పెరుగుతుంది.\n14. పచ్చి అల్లం కోత: నాటిన 6 నెలల తర్వాత పచ్చి అల్లం కోసం తవ్వవచ్చు.\n15. ఎండు అల్లం (శొంఠి): 8 నెలల తర్వాత ఆకులు ఎండిపోయినప్పుడు తవ్వాలి; శొంఠి తయారీకి అనుకూలం."
                    },
                    "garlic": {
                        "name": "వెల్లుల్లి",
                        "season": "రబీ",
                        "desc": "ఘాటైన వాసన కలిగిన గడ్డ పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సారవంతమైన ఒండ్రు నేలలు లేదా లోమ్ నేలలు; గట్టి నేలల్లో గడ్డ పరిమాణం తగ్గుతుంది.\n2. వాతావరణం: పెరుగుదల దశలో చల్లని వాతావరణం మరియు కోతకు పొడి వాతావరణం అవసరం.\n3. విత్తన ఎంపిక: గడ్డలోని బయటి వరుసలో ఉన్న పెద్ద రెబ్బలను విత్తనంగా ఎంచుకోవాలి.\n4. విత్తన మోతాదు: ఎకరాకు సుమారుగా 200-250 కిలోల వెల్లుల్లి రెబ్బలు అవసరం.\n5. నాటడం సమయం: సెప్టెంబర్ నుండి అక్టోబర్ వరకు నాటడం ఉత్తమం.\n6. నాటడం పద్ధతి: రెబ్బ పదునుగా ఉన్న వైపు పైకి ఉండేలా 5-8 సెం.మీ లోతులో నాటాలి.\n7. దూరం: 15x10 సెం.మీ దూరం పాటించాలి.\n8. ఎరువులు: ఎకరాకు 40 కిలోల నత్రజని, 20 కిలోల భాస్వరం మరియు 20 కిలోల పొటాష్.\n9. గంధకం (Sulphur): వెల్లుల్లి ఘాటు పెరగడానికి గంధకం వాడకం చాలా ముఖ్యం.\n10. నీటి పారుదల: తరచుగా తక్కువ నీటిని పారించాలి; గడ్డ ఊరే దశలో నీటి ఎద్దడి రాకూడదు.\n11. కలుపు నియంత్రణ: వెల్లుల్లి మొదళ్ళు దెబ్బతినకుండా జాగ్రత్తగా కలుపు తీయాలి.\n12. పురుగులు: తామర పురుగుల (Thrips) నివారణకు చర్యలు తీసుకోవాలి.\n13. తెగుళ్లు: ఊదా రంగు మచ్చ తెగులు రాకుండా శిలీంద్ర నాశకాలను వాడాలి.\n14. కోత: క్రింది ఆకులు ఎండిపోయి, పై ఆకులు వాలినప్పుడు కోయాలి.\n15. క్యూరింగ్: గడ్డలను 7-10 రోజులు నీడలో ఆరబెట్టి, వేర్లు మరియు తలలను కత్తిరించాలి."
                    },
                    "soybean": {
                        "name": "సోయాబీన్",
                        "season": "ఖరీఫ్",
                        "desc": "అధిక ప్రోటీన్ కలిగిన పప్పుధాన్యము మరియు నూనెగింజ.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగు నీరు పోయే సౌకర్యం గల సారవంతమైన లోమ్ నేలలు (pH 6.5-7.5).\n2. వాతావరణం: వెచ్చని మరియు తేమతో కూడిన వాతావరణం; 25-30°C ఉష్ణోగ్రత ఉత్తమం.\n3. భూమి తయారీ: 2-3 సార్లు లోతుగా దుక్కి చేసి నేలను చదునుగా చేయాలి.\n4. రకము: పచ్చ ఆకుమచ్చ తెగులును తట్టుకునే జె.ఎస్-335 వంటి రకాలను ఎంచుకోండి.\n5. విత్తన శుద్ధి: నత్రజని స్థిరీకరణ కోసం రైజోబియం మరియు భాస్వరం బాక్టీరియా కల్చర్ తో శుద్ధి చేయండి.\n6. విత్తన మోతాదు: గింజ పరిమాణాన్ని బట్టి ఎకరాకు 25-30 కిలోల విత్తనం.\n7. దూరం: వరుసల మధ్య 45 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం పాటించాలి.\n8. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని, 24 కిలోల భాస్వరం మరియు 16 కిలోల పొటాష్.\n9. మైక్రో న్యూట్రియంట్స్: అధిక దిగుబడి కోసం ఎకరాకు 10 కిలోల జింక్ సల్ఫేట్ వేయాలి.\n10. కలుపు నియంత్రణ: కలుపు వల్ల దిగుబడి 50% తగ్గే అవకాశం ఉంది; పెండి మిథాలిన్ వాడాలి.\n11. నీటి పారుదల: పూత మరియు కాయ ఊరే దశల్లో తేమ ఎద్దడి లేకుండా చూడాలి.\n12. పురుగులు: గిర్డిల్ బీటిల్ మరియు గొంగళి పురుగుల నివారణ చర్యలు.\n13. తెగుళ్లు: తుప్పు తెగులు మరియు ఆకుమచ్చ తెగుళ్ళ పట్ల అప్రమత్తంగా ఉండాలి.\n14. కోత: ఆకులు పసుపు రంగులోకి మారి రాలిపోయినప్పుడు, కాయలు ఎండినప్పుడు కోయాలి.\n15. నిల్వ: గింజలలో తేమ 10-12% వచ్చే వరకు ఎండబెట్టి నిల్వ చేయాలి."
                    },
                    "chickpea": {
                        "name": "శనగలు",
                        "season": "రబీ",
                        "desc": "ప్రధాన పప్పుధాన్య పంట, ప్రోటీన్ కోసం కీలకం.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీరు నిల్వ ఉండని సారవంతమైన బరువైన లోమ్ నేలలు.\n2. pH విలువ: 6.0 నుండి 7.5 వరకు ఉండాలి; ఉప్పు నేలల్లో శనగ సరిగా పెరగదు.\n3. వాతావరణం: పెరుగుదల దశలో చల్లని వాతావరణం మరియు కాయ దశలో వెచ్చగా ఉండాలి.\n4. భూమి తయారీ: వేసవిలో లోతైన దుక్కి చేసి, రబీలో 2-3 సార్లు మెత్తగా దున్నాలి.\n5. రకము: ప్రాంతానికి సరిపడే దేశీ లేదా కాబూలీ రకాలను ఎంచుకోండి.\n6. విత్తే సమయం: అక్టోబర్ మధ్య నుండి నవంబర్ మధ్య వరకు విత్తడం శ్రేయస్కరం.\n7. చిగుళ్లు తుంచడం (Nipping): నాటిన 30-40 రోజులకు చిగుళ్లు తుంచితే కొమ్మలు ఎక్కువగా వస్తాయి.\n8. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం పాటించాలి.\n9. విత్తన శుద్ధి: ట్రైకోడెర్మ మరియు రైజోబియం కల్చర్ తో విత్తన శుద్ధి చేయాలి.\n10. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని, 20 కిలోల భాస్వరం మరియు గంధకం వాడాలి.\n11. నీటి పారుదల: శాఖలు వచ్చే దశ మరియు కాయ ఊరే దశల్లో తేలికపాటి తడులు ఇవ్వాలి.\n12. పురుగులు: శనగ పచ్చ పురుగు నివారణకు లింగాకర్షణ బుట్టలు మరియు మందులు వాడాలి.\n13. తెగుళ్లు: వేరు కుళ్ళు మరియు వడలు తెగులు రాకుండా జాగ్రత్త పడాలి.\n14. కోత: ఆకులు పసుపు రంగులోకి మారి, కాయలు గలగలా శబ్దం వచ్చినప్పుడు కోయాలి.\n15. దిగుబడి చిట్కా: పసుపు రంగులోకి మారుతున్నప్పుడు పొటాష్ ద్రావణాన్ని పిచికారీ చేస్తే గింజ బరువు పెరుగుతుంది."
                    },
                    "black_gram": {
                        "name": "మినములు",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "పులియబెట్టిన ఆహారాలలో ఉపయోగించే బలమైన పప్పుధాన్యం.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: బరువైన నల్ల రేగడి నేలలు లేదా నీటిని నిలుపుకోగలిగే ఒండ్రు నేలలు.\n2. pH విలువ: 6.5 నుండి 7.8 వరకు ఉండాలి; స్వల్ప చవిటి నేలలను తట్టుకుంటుంది.\n3. భూమి తయారీ: నేలను చదునుగా చేసి, మురుగునీరు పోయేలా కందకాలు చేయాలి.\n4. రకము: పల్లాకు తెగులును (YMV) తట్టుకునే రకాలను ఎంచుకోవాలి.\n5. విత్తన మోతాదు: ఖరీఫ్ లో ఎకరాకు 6-8 కిలోలు, రబీలో 10-12 కిలోలు.\n6. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం పాటించాలి.\n7. విత్తన శుద్ధి: థైరామ్ మరియు రైజోబియం కల్చర్ తో విత్తన శుద్ధి చేయడం ముఖ్యం.\n8. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని మరియు 16 కిలోల భాస్వరం వేయాలి.\n9. కలుపు నియంత్రణ: మొదటి 30 రోజులు పంటను కలుపు లేకుండా ఉంచాలి.\n10. నీటి పారుదల: పూత మరియు కాయ దశలో తేమ ఎద్దడి లేకుండా చూడాలి.\n11. పురుగులు: పేనుబంక, తామర పురుగు మరియు కాయతొలుచు పురుగుల నివారణ.\n12. తెగుళ్లు: పల్లాకు తెగులు నివారణకు తెల్ల దోమను నియంత్రించాలి.\n13. పచ్చి రొట్ట ఎరువు: మినమును పచ్చి రొట్ట ఎరువుగా వాడటం వల్ల నేల సారం పెరుగుతుంది.\n14. కోత: 80% కాయలు నలుపు రంగులోకి మారి ఎండినప్పుడు కోయాలి.\n15. కోత తర్వాత: మొక్కలను పికి ఎండబెట్టిన తర్వాత తూర్పారబట్టాలి."
                    },
                    "green_gram": {
                        "name": "పెసలు",
                        "season": "ఖరీఫ్/రబీ",
                        "desc": "తేలికగా జీర్ణమయ్యే బహుముఖ పప్పుధాన్య పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: నీరు నిల్వ ఉండని సారవంతమైన ఒండ్రు నేలలు లేదా లోమ్ నేలలు.\n2. వాతావరణం: వేడి వాతావరణం (25-35°C); పొడి వాతావరణాన్ని తట్టుకుంటుంది.\n3. విత్తే సమయం: ఖరీఫ్ జూన్-జులై, వేసవి ఫిబ్రవరి-మార్చి మరియు రబీ అక్టోబర్-నవంబర్.\n4. విత్తన మోతాదు: ఎకరాకు 5-6 కిలోల విత్తనం సరిపోతుంది.\n5. విత్తన శుద్ధి: శిలీంద్ర నాశకంతో పాటు రైజోబియం కల్చర్ తో శుద్ధి చేయాలి.\n6. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 10 సెం.మీ దూరం ఉండాలి.\n7. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని మరియు 16 కిలోల భాస్వరం వేయాలి.\n8. కలుపు నియంత్రణ: పెండి మిథాలిన్ పిచికారీ మరియు ఒకసారి చేతితో కలుపు తీయాలి.\n9. నీటి పారుదల: వేసవి పంటకు 3-4 సార్లు నీరు ఇవ్వాలి; ఖరీఫ్ లో వర్షాన్ని బట్టి.\n10. పురుగులు: పూత సమయంలో తామర పురుగులు మరియు కాయతొలుచు పురుగుల పట్ల జాగ్రత్త.\n11. తెగుళ్లు: బూడిద తెగులు మరియు ఆకుమచ్చ తెగుళ్ళ నివారణ చర్యలు.\n12. అంతర పంట: పత్తి లేదా చెరకు పంటల్లో అంతర పంటగా వేయడానికి అనుకూలం.\n13. నేల సారం: పెసర వేర్ల ద్వారా నత్రజని స్థిరీకరణ జరిగి నేల సారం పెరుగుతుంది.\n14. కోత: కాయలు ఒకేసారి పకవానికి రావు, కాబట్టి 2-3 సార్లు కాయలు ఏరాలి.\n15. దిగుబడి: సరైన యాజమాన్య పద్ధతులు పాటిస్తే ఎకరాకు 4-6 క్వింటాళ్ల దిగుబడి వస్తుంది."
                    },
                    "tea": {
                        "name": "టీ",
                        "season": "బహువార్షిక",
                        "desc": "ప్రపంచంలో అత్యంత ప్రజాదరణ పొందిన పానీయపు పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. వాతావరణం: 20-30°C ఉష్ణోగ్రత, అధిక తేమ మరియు ఏడాది పొడవునా వర్షపాతం (150-300 సెం.మీ).\n2. నేల: సారవంతమైన ఆమ్ల నేలలు (pH 4.5-5.5) మరియు నీరు నిల్వ ఉండకూడదు.\n3. ఎత్తు: సముద్ర మట్టానికి 1000 మీటర్ల పైన పెరిగే టీ నాణ్యత ఎక్కువగా ఉంటుంది.\n4. నీడ యాజమాన్యం: ఉష్ణోగ్రతను నియంత్రించడానికి పొలంలో నీడ నిచ్చే చెట్లను పెంచాలి.\n5. నాటడం: 45x45x45 సెం.మీ గుంతలు తీసి సారవంతమైన మట్టితో నింపి నాటాలి.\n6. దూరం: రకాన్ని బట్టి 105x60 సెం.మీ లేదా 120x60 సెం.మీ దూరం పాటించాలి.\n7. కత్తిరింపు (Pruning): టీ పొదను ఒకే ఎత్తులో ఉంచడానికి ప్రతీ 3-4 ఏళ్లకు కత్తిరించాలి.\n8. కోత (Plucking): ప్రతీ 7-12 రోజులకు ఒకసారి ఆకులను కోయాలి.\n9. నాణ్యమైన కోత: 'రెండు ఆకులు మరియు ఒక మొగ్గ' పద్ధతిలో కోస్తే నాణ్యమైన టీ తయారవుతుంది.\n10. ఎరువులు: నైట్రోజన్, భాస్వరం మరియు పొటాష్ ఎరువులను 3:1:3 నిష్పత్తిలో వేయాలి.\n11. మైక్రో న్యూట్రియంట్స్: జింక్ సల్ఫేట్ పిచికారీ చేయడం వల్ల లేత చిగుళ్లు బాగా వస్తాయి.\n12. పురుగులు: ఎర్ర నల్లి మరియు టీ దోమల నివారణకు జీవ నియంత్రణ పద్ధతులు వాడాలి.\n13. తెగుళ్లు: వేరు కుళ్ళు మరియు బ్లిస్టర్ బ్లైట్ తెగుళ్ల పట్ల జాగ్రత్త వహించాలి.\n14. మురుగునీటి సౌకర్యం: టీ తోటల్లో నీరు నిల్వ ఉంటే వేర్లు కుళ్ళిపోతాయి.\n15. తయారీ దశలు: కోసిన ఆకులను కడగడం, నలపడం, పులియబెట్టడం మరియు ఎండబెట్టడం ద్వారా టీ పొడి తయారవుతుంది."
                    },
                    "pigeon_pea": {
                        "name": "కందులు",
                        "season": "ఖరీఫ్",
                        "desc": "దుర్భిక్షాన్ని తట్టుకునే ప్రోటీన్ రిచ్ పప్పుధాన్య పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: స్వల్ప ఆమ్ల గుణం లేని, మురుగునీరు పోయే సదుపాయం ఉన్న ఇసుక లోమ్ నేలలు.\n2. వాతావరణం: వెచ్చని వాతావరణం (25-35°C) మరియు తక్కువ వర్షపాతం ఉన్న ప్రాంతాల్లో బాగా పెరుగుతుంది.\n3. భూమి తయారీ: లోతుగా దున్ని నేలను సిద్ధం చేయాలి; ఇది వేర్లు లోతుగా చొచ్చుకుపోవడానికి సహాయపడుతుంది.\n4. రకాలు: వడలు తెగులును తట్టుకునే రకాలను (ICPH 2740, BDN 711) ఎంచుకోవాలి.\n5. విత్తే సమయం: జూన్-జులై మాసాలు విత్తడానికి అత్యంత అనుకూలం.\n6. విత్తన మోతాదు: ఎకరాకు 5-6 కిలోల విత్తనం అవసరం.\n7. దూరం: వరుసల మధ్య 60-90 సెం.మీ మరియు మొక్కల మధ్య 15-20 సెం.మీ దూరం పాటించాలి.\n8. విత్తన శుద్ధి: రైజోబియం మరియు ట్రైకోడెర్మ తో విత్తన శుద్ధి చేయాలి.\n9. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని మరియు 20 కిలోల భాస్వరం వేయాలి.\n10. కలుపు నియంత్రణ: విత్తిన 30 మరియు 60 రోజులకు కలుపు తీయడం ద్వారా దిగుబడి పెరుగుతుంది.\n11. నీటి పారుదల: పూత మరియు కాయ ఊరే దశల్లో తేమ ఎద్దడి లేకుండా చూడాలి.\n12. పురుగులు: శనగ పచ్చ పురుగు మరియు కాయతొలుచు పురుగుల నివారణ చర్యలు.\n13. తెగుళ్లు: వడలు తెగులు మరియు ఆకుమచ్చ తెగుళ్ళ పట్ల అప్రమత్తంగా ఉండాలి.\n14. కోత: 80% కాయలు పసుపు రంగులోకి మారి ఎండినప్పుడు కోత చేపట్టాలి.\n15. నిల్వ: గింజలలో తేమ 10-12% వచ్చే వరకు ఎండబెట్టి నిల్వ చేయాలి."
                    },
                    "lentil": {
                        "name": "లెన్టిల్ (మసూర్ పప్పు)",
                        "season": "రబీ",
                        "desc": "చిన్న, లెన్స్ ఆకారపు పోషకమైన పప్పుధాన్యం.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగునీరు పోయే సౌకర్యం గల ఒండ్రు నేలలు లేదా లోమ్ నేలలు.\n2. వాతావరణం: చల్లని వాతావరణం (18-30°C) పెరుగుదలకు అనుకూలం.\n3. భూమి తయారీ: విత్తనం చిన్నది కాబట్టి నేలను బాగా మెత్తగా తయారు చేయాలి.\n4. విత్తే సమయం: అక్టోబర్ 15 నుండి నవంబర్ 15 వరకు రబీ పంటగా విత్తాలి.\n5. రకాలు: అధిక దిగుబడినిచ్చే పుసా వైభవ్ వంటి రకాలను ఎంచుకోవాలి.\n6. విత్తన మోతాదు: ఎకరాకు 14-16 కిలోల విత్తనం సరిపోతుంది.\n7. దూరం: వరుసల మధ్య 25-30 సెం.మీ దూరం పాటించాలి.\n8. విత్తన శుద్ధి: బావిస్టిన్ మరియు రైజోబియం కల్చర్ తో శుద్ధి చేయాలి.\n9. ఎరువులు: ఎకరాకు 8 కిలోల నత్రజని మరియు 16 కిలోల భాస్వరం వేయాలి.\n10. నీటి పారుదల: శాఖలు వచ్చే దశ మరియు కాయ ఊరే దశల్లో రెండు తడులు ఇస్తే సరిపోతుంది.\n11. కలుపు నియంత్రణ: పెండి మిథాలిన్ పిచికారీ చేయడం వల్ల కలుపు నివారించవచ్చు.\n12. పురుగులు: పేనుబంక ప్రబలకుండా వేప నూనె కాషాయాన్ని చల్లాలి.\n13. తెగుళ్లు: వేరు కుళ్ళు తెగులు రాకుండా మేలైన మురుగునీటి సౌకర్యం ఉండాలి.\n14. కోత: కాయలు బంగారు గోధుమ రంగులోకి మారి గలగలా శబ్దం వచ్చినప్పుడు కోయాలి.\n15. ఆరబెట్టడం: కోత తర్వాత గింజలను బాగా ఎండబెట్టి భద్రపరచాలి."
                    },
                    "cabbage": {
                        "name": "క్యాబేజీ",
                        "season": "రబీ",
                        "desc": "వివిధ వంటకాలలో ఉపయోగించే చల్లని కాలపు ఆకు కూరగాయ.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సేంద్రీయ పదార్థం ఎక్కువగా ఉండే సారవంతమైన లోమ్ నేలలు.\n2. వాతావరణం: చల్లని వాతావరణం (15-20°C) గడ్డ కట్టడానికి అవసరం.\n3. నారుమడి: 4-5 వారాల వయస్సు గల నారును మాత్రమే నాటాలి.\n4. రకాలు: హైబ్రిడ్ రకాలను ఎంచుకోవడం ద్వారా అధిక దిగుబడి పొందవచ్చు.\n5. నాటడం: వరుసల మధ్య 60 సెం.మీ మరియు మొక్కల మధ్య 45 సెం.మీ దూరం ఉండాలి.\n6. ఎరువులు: నత్రజని ఎరువులు ఎక్కువగా అవసరం; ఎకరాకు 60 కిలోల నత్రజని వాడాలి.\n7. నీటి పారుదల: నేలలో ఎప్పుడూ తేమ ఉండాలి; తేమలో హెచ్చుతగ్గులు ఉంటే గడ్డలు పగులుతాయి.\n8. మల్చింగ్: తేమను కాపాడటానికి గడ్డితో మల్చింగ్ చేయడం మేలు.\n9. పురుగులు: డైమండ్ బ్యాక్ మాత్ నివారణకు ప్రత్యేక చర్యలు చేపట్టాలి.\n10. తెగుళ్లు: క్లబ్ రూట్ తెగులు రాకుండా నేల pH తటస్థంగా ఉండేలా చూడాలి.\n11. బోరాన్ లోపం: గడ్డ మధ్యలో రంగు మారితే బోరాక్స్ ను ఎరువుగా వాడాలి.\n12. మట్టిని ఎగదోయడం: గడ్డ బరువుకు మొక్క పడిపోకుండా మట్టిని ఎగదోయాలి.\n13. కలుపు నివారణ: మొదటి 60 రోజులు పంటను కలుపు లేకుండా ఉంచాలి.\n14. కోత: గడ్డ గట్టిగా మారి సరైన పరిమాణం వచ్చినప్పుడు కోయాలి.\n15. నిల్వ: చల్లని మరియు గాలి ఆడే ప్రదేశంలో 1-2 వారాలు నిల్వ ఉంటుంది."
                    },
                    "cauliflower": {
                        "name": "క్యాలీఫ్లవర్",
                        "season": "రబీ",
                        "desc": "తెల్లని పూత కలిగిన పోషకమైన బ్రాసికా కూరగాయ.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సారవంతమైన, నీరు నిల్వ ఉండని లోమ్ నేలలు (pH 6.5-7.5).\n2. వాతావరణం: వాతావరణ మార్పులకు చాలా సున్నితం; చల్లని వాతావరణం ఉండాలి.\n3. ఉష్ణోగ్రత: 15-20°C ఉష్ణోగ్రత పూత రావడానికి అనుకూలం.\n4. నారుమడి: 5-6 వారాల నారును నాటాలి; విత్తన శుద్ధి తప్పనిసరి.\n5. నాటడం: 60x45 సెం.మీ దూరం పాటించాలి.\n6. ఎరువులు: ఎకరాకు 48 కిలోల నత్రజని, 32 కిలోల భాస్వరం మరియు పొటాష్ వాడాలి.\n7. మాలిబ్డినం లోపం: ఆకులు మొలచుకుపోయినట్లు అయితే సోడియం మాలిబ్డేట్ వాడండి.\n8. బ్లాంచింగ్: పూత తెల్లగా ఉండటానికి చుట్టూ ఉన్న ఆకులతో కప్పి ఉంచాలి.\n9. నీటి పారుదల: క్రమం తప్పకుండా నీరు ఇవ్వాలి; లేకపోతే పూత చిన్నదిగా వస్తుంది.\n10. పురుగులు: పేనుబంక మరియు డైమండ్ బ్యాక్ మాత్ పట్ల నిఘా ఉండాలి.\n11. తెగుళ్లు: నల్ల కుళ్ళు తెగులు రాకుండా రెసిస్టెంట్ రకాలను ఎంచుకోండి.\n12. కోత: పూత గట్టిగా కోమలంగా ఉన్నప్పుడే ఆకులతో సహా కోయాలి.\n13. నిర్వహణ: పూతకు దెబ్బ తగలకుండా జాగ్రత్తగా రవాణా చేయాలి.\n14. నాణ్యత: తెల్లని మరియు ఎటువంటి వ్యాధులు లేని పూతలను ఎంచుకోండి.\n15. కోత తర్వాత: తాజాదనం కోసం వెంటనే చల్లని ప్రదేశానికి తరలించాలి."
                    },
                    "carrot": {
                        "name": "క్యారెట్",
                        "season": "రబీ",
                        "desc": "విటమిన్ ఎ సమృద్ధిగా ఉండే శక్తివంతమైన దుంప కూరగాయ.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: లోతైన, రాళ్లు లేని ఇసుక లోమ్ నేలలు దుంప ఎదుగుదలకు ఉత్తమం.\n2. వాతావరణం: చల్లని వాతావరణం (15-20°C) వల్ల దుంప రంగు మరియు రుచి పెరుగుతుంది.\n3. భూమి తయారీ: నేలను 20-25 సెం.మీ లోతుగా దున్ని మెత్తటి దుక్కి చేయాలి.\n4. రకాలు: పూసా రుధిర వంటి ఎర్రటి రకాలను ఎంచుకోవాలి.\n5. విత్తే పద్ధతి: బోదెలు (Ridges) పద్ధతిలో విత్తితే దుంపలు తిన్నగా పెరుగుతాయి.\n6. విత్తన మోతాదు: ఎకరాకు 2-2.5 కిలోల విత్తనం; ఇసుకతో మిక్స్ చేసి విత్తాలి.\n7. దూరం: వరుసల మధ్య 30 సెం.మీ మరియు మొక్కల మధ్య 5-10 సెం.మీ.\n8. ఎరువులు: ఎకరాకు 24 కిలోల నత్రజని, 16 కిలోల భాస్వరం మరియు 40 కిలోల పొటాష్.\n9. పలచబరచడం: 20-30 రోజులకు మొక్కల మధ్య దూరం ఉండేలా పలచబరచాలి.\n10. నీటి పారుదల: నేలలో తేమ సమానంగా ఉండాలి; హెచ్చుతగ్గుల వల్ల దుంపలు పగులుతాయి.\n11. కలుపు నియంత్రణ: మొక్కలు నెమ్మదిగా పెరుగుతాయి కాబట్టి ప్రారంభంలో కలుపు తీయాలి.\n12. పురుగులు: క్యారెట్ రస్ట్ ఫ్లై మరియు పేనుబంక నివారణకు చర్యలు తీసుకోవాలి.\n13. తెగుళ్లు: ఆకుమాడు తెగులు రాకుండా శిలీంద్ర నాశకాలను వాడాలి.\n14. కోత: దుంప పైన 2-3 సెం.మీ వెడల్పు వచ్చినప్పుడు తవ్వాలి.\n15. నిల్వ: తవ్విన వెంటనే ఆకులను కోసివేసి చల్లని ఇసుకలో నిల్వ చేయాలి."
                    },
                    "brinjal": {
                        "name": "వంకాయ",
                        "season": "రబీ/ఖరీఫ్",
                        "desc": "వివిధ ఆకారాలు మరియు రంగులలో లభించే బహుముఖ కూరగాయ.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సేంద్రీయ పదార్థాలు ఉన్న సారవంతమైన ఇసుక లేదా చెరువు మట్టి నేలలు.\n2. వాతావరణం: వెచ్చని వాతావరణం (25-30°C) పెరుగుదలకు అవసరం.\n3. రకాలు: మార్కెట్ కు అనుగుణంగా రంగు మరియు ఆకారం ఉన్న రకాలను ఎంచుకోండి.\n4. నారు యాజమాన్యం: ప్రో-ట్రేలలో 30-35 రోజులు నారు పెంచాలి.\n5. నాటడం: 60x60 సెం.మీ లేదా 75x60 సెం.మీ దూరం పాటించాలి.\n6. ఎరువులు: ఎకరాకు 40 కిలోల నత్రజని, 32 కిలోల భాస్వరం మరియు 24 కిలోల పొటాష్.\n7. నీటి పారుదల: నేలలో తేమ ఉండాలి కానీ నీరు నిల్వ ఉండకూడదు.\n8. మల్చింగ్: నేల ఉష్ణోగ్రతను పెంచడానికి ప్లాస్టిక్ మల్చింగ్ వాడవచ్చు.\n9. పురుగులు: కాండం మరియు కాయతొలుచు పురుగు నివారణకు చిగుళ్లను కత్తిరించాలి.\n10. తెగుళ్లు: బాక్టీరియల్ వాడు తెగులు లేని రకాలను ఎంచుకోవాలి.\n11. కత్తిరింపు: క్రింది ఆకులను కత్తిరించడం వల్ల గాలి ప్రసరణ పెరుగుతుంది.\n12. మైక్రో న్యూట్రియంట్స్: మెరుగైన నాణ్యత కోసం జింక్ మరియు మాంగనీస్ వాడండి.\n13. కోత: కాయ గట్టిగా మెరుస్తూ ఉన్నప్పుడే కోయాలి; గింజ గట్టిపడకూడదు.\n14. దిగుబడి: తరచుగా కోత చేపట్టడం వల్ల కొత్త పూత ఎక్కువగా వస్తుంది.\n15. నిల్వ: చల్లని ప్రదేశంలో (10-12°C) నిల్వ చేయాలి; ఫ్రిజ్ లో ఎక్కువ రోజులు ఉంచకండి."
                    },
                    "papaya": {
                        "name": "బొప్పాయి",
                        "season": "బహువార్షిక",
                        "desc": "అధిక దిగుబడినిచ్చే వేగంగా పెరుగుతున్న ఉష్ణమండల పండు.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగునీరు పోయే సదుపాయం గల సారవంతమైన ఎర్ర లేదా నల్ల నేలలు.\n2. వాతావరణం: ఉష్ణమండల వాతావరణం; మంచును మరియు బలమైన గాలులను తట్టుకోలేదు.\n3. మురుగునీరు: నీరు నిల్వ ఉంటే కాండం కుళ్ళు తెగులు వస్తుంది; నీరు నిల్వ ఉండకూడదు.\n4. రకాలు: రెడ్ లేడీ వంటి హైబ్రిడ్ రకాలను ఎంచుకోవడం ఉత్తమం.\n5. గుంతల తయారీ: 45x45x45 సెం.మీ గుంతలను 2 మీటర్ల దూరంలో తీయాలి.\n6. నాటడం: 2 నెలల వయస్సు గల ఆరోగ్యకరమైన నారును నాటాలి.\n7. ఎరువులు: ప్రతీ మొక్కకు ఏడాదికి 250 గ్రా నత్రజని, 250 గ్రా భాస్వరం మరియు పొటాష్.\n8. నీటి పారుదల: క్రమం తప్పకుండా నీరు ఇవ్వాలి; డ్రిప్ పద్ధతి చాలా మేలు.\n9. పలచబరచడం: కాయలు ఎక్కువగా ఉంటే కొన్నింటిని తీసివేసి పరిమాణం పెంచవచ్చు.\n10. మద్దతు: గాలికి మొక్క పడిపోకుండా కర్రలతో మద్దతు ఇవ్వాలి.\n11. పురుగులు: పిండి నల్లి మరియు నల్లి నివారణకు వేప నూనె చల్లాలి.\n12. తెగుళ్లు: బొప్పాయి రింగ్ స్పాట్ వైరస్ రాకుండా జాగ్రత్త పడాలి.\n13. విత్తన ఎంపిక: వైరస్ లేని నాణ్యమైన విత్తనాన్ని మాత్రమే వాడాలి.\n14. కోత: కాయపై పసుపు రంగు మచ్చలు కనిపించినప్పుడు కోయాలి.\n15. కోత తర్వాత: దెబ్బతినకుండా గడ్డిలో లేదా పేపర్ చుట్టి భద్రపరచాలి."
                    },
                    "pomegranate": {
                        "name": "దానిమ్మ",
                        "season": "బహువార్షిక",
                        "desc": "శుష్క ప్రాంతాలకు సరిపడే గట్టి పండ్ల పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: మురుగునీరు పోయే లోతైన నేలలు; చవిటి నేలలను కూడా తట్టుకుంటుంది.\n2. వాతావరణం: వేడి మరియు పొడి వాతావరణం; వేసవిలో వేడి, శీతాకాలంలో చలి అవసరం.\n3. ప్రచారం: అంటు కట్టడం లేదా కొమ్మల ద్వారా ప్రచారం చేయవచ్చు.\n4. నాటడం: 4.5x4.5 మీటర్ల దూరంలో 60 సెం.మీ గుంతలు తీసి నాటాలి.\n5. శిక్షణ: చెట్టుకు 3-4 ప్రధాన కాండాలు ఉండేలా చూసుకోవాలి.\n6. కత్తిరింపు: ఏటా ఎండు కొమ్మలను, క్రింద వచ్చే పిలకలని కత్తిరించాలి.\n7. బహార్ ట్రీట్మెంట్: నీటి ఎద్దడి ద్వారా పూత వచ్చేలా ప్రేరేపించాలి.\n8. నీటి పారుదల: డ్రిప్ పద్ధతి ద్వారా నియంత్రిత నీటిని అందించాలి.\n9. కాయ పగుళ్లు: నీటి ఎద్దడి వల్ల కాయలు పగులుతాయి; క్రమం తప్పకుండా నీరు ఇవ్వాలి.\n10. ఎరువులు: ప్రతీ చెట్టుకు 600 గ్రా నత్రజని, 250 గ్రా భాస్వరం మరియు పొటాష్ వేయాలి.\n11. మైక్రో న్యూట్రియంట్స్: బోరాన్ మరియు జింక్ పిచికారీ వల్ల కాయ నాణ్యత పెరుగుతుంది.\n12. పురుగులు: దానిమ్మ కాయతొలుచు పురుగు నివారణకు కాయలకు సంచులు తొడగాలి.\n13. తెగుళ్లు: బాక్టీరియల్ బ్లైట్ (తెల్యా) రాకుండా స్ట్రెప్టోసైక్లిన్ వాడాలి.\n14. కోత: కాయను తట్టినప్పుడు లోహపు శబ్దం వస్తే కోయాలి.\n15. నిల్వ: చల్లని ప్రదేశంలో 2 నెలల వరకు నిల్వ ఉంటుంది."
                    },
                    "coffee": {
                        "name": "కాఫీ",
                        "season": "బహువార్షిక",
                        "desc": "నీడలో పెరిగే అధిక విలువ కలిగిన తోట పంట.",
                        "guidelines": "సమగ్ర సాగు మార్గదర్శకాలు:\n1. నేల: సేంద్రీయ పదార్థాలు గల ఆమ్ల నేలలు (pH 5.0-6.0) అనుకూలం.\n2. వాతావరణం: ఉష్ణమండల వాతావరణం ఉండాలి; వర్షపాతం సమృద్ధిగా ఉండాలి.\n3. ఎత్తు: సముద్ర మట్టానికి 500-1500 మీటర్ల ఎత్తులో బాగా పెరుగుతుంది.\n4. నీడ యాజమాన్యం: తప్పనిసరిగా నీడ నిచ్చే చెట్ల క్రింద సాగు చేయాలి.\n5. భూమి తయారీ: కొండ వాలు ప్రాంతాల్లో టెర్రస్ సాగు చేయడం మంచిది.\n6. నాటడం: 2x2 మీ లేదా 3x3 మీ దూరంలో గుంతలు తీసి నాటాలి.\n7. ఎరువులు: పూతకు ముందు మరియు వర్షాకాలం తర్వాత ఎరువులు వేయాలి.\n8. కత్తిరింపు: పొదను నిర్ణీత ఎత్తులో ఉంచడానికి కత్తిరించడం (Topping) ముఖ్యం.\n9. బ్లోసమ్ షవర్స్: పూత రావడానికి నీటి తడులు లేదా వర్షం అవసరం.\n10. మల్చింగ్: చిన్న మొక్కలకు తేమను కాపాడటానికి మల్చింగ్ చేయాలి.\n11. పురుగులు: కాఫీ బోరర్ నివారణకు ప్రత్యేక చర్యలు తీసుకోవాలి.\n12. తెగుళ్లు: ఆకు తుప్పు తెగులు రాకుండా బోర్డో మిశ్రమం వాడాలి.\n13. కోత: ఎర్రగా పండిన పండ్లను (Cherries) మాత్రమే ఏరాలి.\n14. తయారీ: పండ్లను కడగడం లేదా ఎండబెట్టడం ద్వారా కాఫీ గింజలను తీయాలి.\n15. నాణ్యత: గింజల్లో 10-11% తేమ ఉండేలా ఆరబెడితే నాణ్యమైన కాఫీ లభిస్తుంది."
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
                "search_button": "खोजें",
                "no_data_found": "डेटा नहीं मिला"
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
            "crop_status": {
                "no_crops_title": "कोई फसल नहीं चुनी गई",
                "no_crops_message": "आपने अभी तक कोई फसल नहीं चुनी है। कृपया अपनी फसल चुनें।",
                "boost_yield": "पैदावार बढ़ाएं",
                "prevention": "रोकथाम",
                "monitoring": "आपकी फसल की निगरानी की जा रही है...",
                "heavy_rain_threat": "भारी बारिश की संभावना",
                "heavy_rain_suggestion": "उर्वरक डालने में देरी करें।",
                "high_temp_threat": "उच्च तापमान की चेतावनी",
                "high_temp_suggestion": "शाम को सिंचाई करें।",
                "paddy_suggestion": "2-5 सेमी खड़ा पानी बनाए रखें।",
                "cotton_suggestion": "सफेद मक्खी के प्रकोप की जाँच करें।",
                "prod_tip_default": "मिट्टी की उर्वरता बनाए रखने के लिए फसल चक्र अपनाएं।",
                "prod_tip_paddy": "पैदावार 15-20% बढ़ाने के लिए अज़ोला का जैव-उर्वरक के रूप में उपयोग करें।",
                "prod_tip_cotton": "बेहतर पैदावार के लिए उच्च घनत्व रोपण प्रणाली लागू करें।",
                "prod_tip_maize": "नाइट्रोजन स्तर में सुधार के लिए सोयाबीन के साथ अंतर-फसल उगाएं।",
                "history_advice_default": "स्थानीय रुझानों के आधार पर नियमित रूप से कीटों के संकेतों की जाँच करें।",
                "history_advice_fungal": "पिछली कवक समस्या का पता चला। अत्यधिक नाइट्रोजन से बचें और खेत को सूखा रखें।",
                "history_advice_pest": "पिछला कीट हमला देखा गया। इस सीजन की शुरुआत में फेरोमोन ट्रैप लगाएं।",
                "history_advice_recurrence": "पुनरावृत्ति को रोकना: {{disease}}"
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
                "ai_label": "AgriSmart AI",
                "voice_unsupported": "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।",
                "start_listening": "वॉयस इनपुट शुरू करें",
                "stop_listening": "सुनना बंद करें"
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
                "market_contact": "मार्केट संपर्क",
                "download_report": "पूर्ण बाजार रिपोर्ट डाउनलोड करें",
                "price_gap": "न्यूनतम/अधिकतम के बीच मूल्य अंतर ₹{{gap}} है। गुणवत्ता ग्रेड मायने रखता है।",
                "trend_up": "{{crop}} की कीमतें बढ़ रही हैं। बेचने का अच्छा समय है।",
                "trend_stable": "{{crop}} की कीमतों में स्थिरता दिख रही है। अगले 48 घंटों तक निगरानी रखें।",
                "avg_price": "{{crop}} के लिए औसत मूल्य",
                "no_data_found": "डेटा नहीं मिला"
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
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: भारी चिकनी या दोमट मिट्टी जिसमें पानी रोकने की क्षमता हो (pH 5.5-6.5).\n2. नर्सरी: रोपाई से 21-25 दिन पहले नर्सरी तैयार करें; प्रति हेक्टेयर 25-30 किलो बीज पर्याप्त है।\n3. बीज उपचार: फफूंद से बचाने के लिए बीजों को कार्बेन्डाजिम से उपचारित करें।\n4. रोपाई का समय: मुख्य रूप से जून-जुलाई (खरीफ); पौधों के बीच 20x15 सेमी की दूरी रखें।\n5. जल प्रबंधन: रोपाई के पहले सप्ताह में 2-3 सेमी पानी रखें, बाद में इसे 5 सेमी तक बढ़ाएं।\n6. उर्वरक: NPK 120:60:40 अनुपात में डालें; नाइट्रोजन की आधी मात्रा रोपाई के समय दें।\n7. खरपतवार: रोपाई के 3-5 दिन बाद खरपतवार नाशक का छिड़काव करें।\n8. कीट प्रबंधन: तना छेदक (Stem Borer) और पत्ती लपेटक के प्रति सतर्क रहें; नीम तेल का प्रयोग करें।\n9. पोषण: खेत में जिंक की कमी होने पर जिंक सल्फेट 25 किलो प्रति हेक्टेयर डालें।\n10. सिंचाई: कल्ले निकलते समय और दाना भरते समय पानी की कमी न होने दें।\n11. एकीकृत कीट प्रबंधन: जैविक नियंत्रण के लिए खेतों में 'ट्राइकोग्रामा' कार्ड लगाएं।\n12. रोगों की रोकथाम: झुलसा (Blight) रोग के लक्षण दिखने पर उचित कवकनाशी का प्रयोग करें।\n13. दाना भरना: जब दाने दूधिया अवस्था में हों, तब खेत में नमी बरकरार रखें।\n14. कटाई: जब 80-85% दाने सुनहरे पीले हो जाएं और नमी 20% तक हो, तब कटाई करें।\n15. भंडारण: दानों को अच्छी तरह सुखाकर नमी 12-14% तक लाएं ताकि फफूंद न लगे।"
                    },
                    "wheat": {
                        "name": "गेहूं",
                        "season": "रबी",
                        "desc": "गेहूं तटस्थ पीएच वाली अच्छी जल निकासी वाली दोमट मिट्टी में सबसे अच्छा बढ़ता है।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. जलवायु: जमाव के समय 20-22°C और पकने के समय 25-30°C तापमान आदर्श है।\n2. मिट्टी: अच्छे जल निकास वाली उपजाऊ दोमट मिट्टी (pH 6.5-7.5).\n3. बुवाई का समय: नवंबर के पहले से दूसरे सप्ताह तक; देरी होने पर उपज कम हो सकती है।\n4. बीज दर: सामान्य बुवाई के लिए 100 किलो प्रति हेक्टेयर बीज पर्याप्त है।\n5. बीज उपचार: अंकुरण में सुधार के लिए बीजों को उपयुक्त फफूंदनाशक से उपचारित करें।\n6. सिंचाई के चरण (CRI): क्राउन रूट इनीशिएशन (CRI) यानी 21 दिन पर पहली सिंचाई सबसे जरूरी है।\n7. जल प्रबंधन: कुल 4-6 सिंचाइयों की आवश्यकता होती है; फूल आने और दाना बनते समय पानी दें।\n8. उर्वरक प्रबंधन: NPK 120:60:40; नाइट्रोजन को दो बार में (बुवाई और पहली सिंचाई) दें।\n9. खरपतवार नियंत्रण: बुवाई के 30-35 दिन बाद निराई करें या शाकनाशियों का उपयोग करें।\n10. दीमक नियंत्रण: यदि दीमक की समस्या हो, तो क्लोरपायरीफोस का प्रयोग करें।\n11. सूक्ष्म पोषक तत्व: यदि पीलापन दिखे, तो 0.5% जिंक सल्फेट का छिड़काव करें।\n12. रतुआ (Rust) रोग: पीला या भूरा रतुआ दिखने पर तुरंत कवकनाशी का प्रयोग करें।\n13. उपज सुधार: समय पर बुवाई और संतुलित उर्वरक प्रयोग से 50-60 क्विंटल प्रति हेक्टेयर उपज संभव है।\n14. कटाई: जब दाने सख्त हो जाएं और तना सूखकर सुनहरा हो जाए, तब कटाई करें।\n15. मड़ाई और भंडारण: अनाज को धूप में सुखाकर नमी 10% से कम रखें।"
                    },
                    "cotton": {
                        "name": "कपास",
                        "season": "खरीफ",
                        "desc": "कपास को गहरी, उपजाऊ मिट्टी और गर्म तापमान की आवश्यकता होती है।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी काली मिट्टी (रेगुर) जो नमी सोख सके, कपास के लिए सबसे अच्छी है।\n2. बुवाई का समय: मानसून की पहली बारिश के साथ जून-जुलाई में बुवाई करें।\n3. बीज दर: संकर (Hybrid) किस्मों के लिए 2-3 किलो और देसी के लिए 10-12 किलो प्रति हेक्टेयर।\n4. दूरी: किस्म के अनुसार 90x60 सेमी या 120x60 सेमी की दूरी रखें।\n5. नाइट्रोजन प्रबंधन: नाइट्रोजन को दो-तीन बार में दें ताकि पौधे का विकास सही हो।\n6. खरपतवार नियंत्रण: पहले 60-70 दिनों तक फसल को खरपतवार मुक्त रखना अनिवार्य है।\n7. कीट प्रबंधन (IPM): गुलाबी सूंडी (Pink Bollworm) के लिए फेरोमोन ट्रैप का उपयोग करें।\n8. सिंचाई: फूल आने और टिंडे (Bolls) बनते समय पानी की कमी न होने दें।\n9. एकीकृत खाद प्रबंधन: मिट्टी परीक्षण के आधार पर सल्फर और मैग्नीशियम का प्रयोग करें।\n10. रस चूसक कीट: सफेद मक्खी और जेसिड्स के लिए नीम आधारित दवाओं का छिड़काव करें।\n11. विरलीकरण (Thinning): बुवाई के 15-20 दिन बाद अतिरिक्त पौधों को हटा दें।\n12. मिट्टी चढ़ाना: पौधों को गिरने से बचाने के लिए 45 दिन बाद हल्की मिट्टी चढ़ाएं।\n13. वृद्धि नियामक: अधिक वानस्पतिक वृद्धि रोकने के लिए 'साइकिल' या 'मेपिक्वैट' का उपयोग करें।\n14. चुनाई (Picking): टिंडे पूरी तरह खुलने पर ही सुबह के समय चुनाई करें ताकि नमी बनी रहे।\n15. सुखाना और भंडारण: चुनाई के बाद रूई को साफ स्थान पर सुखाएं और कचरा अलग करें।"
                    },
                    "maize": {
                        "name": "मक्का",
                        "season": "खरीफ/रबी",
                        "desc": "भारत की कई जलवायु परिस्थितियों के लिए उपयुक्त बहुमुखी फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: उपजाऊ, अच्छी जल निकासी वाली दोमट या बलुई दोमट मिट्टी (pH 6.5-7.5).\n2. बीज दर: संकर किस्मों के लिए 18-20 किलो और देशी के लिए 20-22 किलो प्रति हेक्टेयर।\n3. बीज उपचार: बीजों को 'थीरम' या 'कार्बेन्डाजिम' से उपचारित करना बीमारियों से बचाता है।\n4. बुवाई की दूरी: मक्के के लिए 60x20 सेमी की दूरी कतारों और पौधों के बीच रखें।\n5. उर्वरक प्रबंधन: नाइट्रोजन की भारी आवश्यकता होती है; इसे तीन भागों में (शुरुआत, घुटने तक ऊंचाई और फूल आने पर) दें।\n6. खरपतवार नियंत्रण: बुवाई के बाद 48 घंटे के भीतर 'एट्राजीन' का छिड़काव करें।\n7. जल निकास: मक्के को जल भराव बिल्कुल पसंद नहीं है, इसलिए जल निकास की अच्छी व्यवस्था रखें।\n8. कीट प्रबंधन: 'फाल आर्मीवर्म' (Fall Armyworm) से बचाव के लिए शुरुआती चरण में ही प्रभावी नियंत्रण करें।\n9. सिंचाई: नर मंजरी (Tasseling) और भुट्टा बनते समय नमी की कमी उपज घटा सकती है।\n10. सूक्ष्म पोषक तत्व: जिंक की कमी दूर करने के लिए जिंक सल्फेट का प्रयोग करें।\n11. अंतःफसल: दलहनी फसलों के साथ मिश्रित खेती मिट्टी की उर्वरता बढ़ाती है।\n12. निराई-गुड़ाई: कम से कम दो बार निराई-गुड़ाई करने से जड़ों को हवा मिलती है।\n13. परिपक्वता: जब भुट्टे के दाने सख्त हो जाएं और उनके आधार पर काला निशान दिखे, तब समझें फसल तैयार है।\n14. कटाई: भुट्टों को पूरी तरह सूखने पर तोड़ें और दानों को अलग करें।\n15. भंडारण: दानों को धूप में सुखाकर नमी 12% तक लाएं।"
                    },
                    "chilli": {
                        "name": "मिर्च",
                        "season": "रबी/खरीफ",
                        "desc": "मिर्च अच्छी जल निकासी वाली दोमट मिट्टी पसंद करती है।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: जीवांश युक्त उपजाऊ दोमट या चिकनी दोमट मिट्टी (pH 6.5-7.5).\n2. नर्सरी प्रबंधन: बीजों को प्रो-ट्रे या छोटी क्यारियों में उगाएं; रोपाई 4-5 सप्ताह बाद करें।\n3. बीज उपचार: बीजों को 'ट्राइकोडर्मा' से उपचारित करना जड़ सड़न से बचाता है।\n4. रोपाई: शाम के समय रोपाई करें और पौधों के बीच 60x45 सेमी की दूरी रखें।\n5. उर्वरक: प्रचुर मात्रा में गोबर की खाद और 100:60:60 किलो NPK प्रति हेक्टेयर डालें।\n6. सिंचाई: मिर्च को मध्यम सिंचाई की आवश्यकता होती है; फूल आने पर नमी बनाए रखें।\n7. कीट प्रबंधन: थ्रिप्स और घुन (Mites) के लिए नीम का तेल या पीला चिपचिपा ट्रैप (Yellow Traps) लगाएं।\n8. रोगों की रोकथाम: आर्द्र पतन (Damping off) से बचने के लिए क्यारियों में जल निकासी सही रखें।\n9. मल्चिंग: खरपतवारों को रोकने और नमी बचाने के लिए प्लास्टिक मल्च का उपयोग प्रभावी है।\n10. सूक्ष्म पोषक तत्व: बेहतर रंग और तीखेपन के लिए बोरोन और मैग्नीशियम का छिड़काव करें।\n11. सहारा (Support): भारी पैदावार वाली किस्मों के लिए छोटे डंडों का सहारा फायदेमंद है।\n12. फूलों का झड़ना: अधिक तापमान में फूल झड़ने से रोकने के लिए 'प्लानोफिक्स' का हल्का छिड़काव करें।\n13. कटाई: हरी मिर्च के लिए फलों के पूर्ण आकार का होने पर तोड़ें; लाल मिर्च के लिए पूरी तरह पकने दें।\n14. उपज: सही प्रबंधन से संकर मिर्च की 100-150 क्विंटल प्रति हेक्टेयर तक पैदावार संभव है।\n15. सुखाना: लाल मिर्च को साफ फर्श पर सुखाएं ताकि गुणवत्ता बनी रहे।"
                    },
                    "turmeric": {
                        "name": "हल्दी",
                        "season": "खरीफ",
                        "desc": "उत्कृष्ट औषधीय गुणों वाला मसाला।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी, उपजाऊ और उपजाऊ दोमट मिट्टी (pH 6.0-7.0); जल निकासी उत्तम होनी चाहिए।\n2. रोपण का समय: मई के अंत से जून के मध्य तक हल्दी लगाने का सबसे सही समय है।\n3. बीजाणु (Rhizomes): रोपण के लिए बड़े, रोग मुक्त और अच्छी तरह विकसित प्रकंदों का चुनाव करें।\n4. बीज दर: प्रति हेक्टेयर लगभग 2000-2500 किलो प्रकंदों की आवश्यकता होती है।\n5. रोपण विधि: मेड़ों और नालियों (Ridge & Furrow) पद्धति का उपयोग करें; दूरी 30x15 सेमी रखें।\n6. मल्चिंग: नमी बनाए रखने और खरपतवार रोकने के लिए रोपण के तुरंत बाद पत्तों से भारी मल्चिंग करें।\n7. उर्वरक: नाइट्रोजन, फास्फोरस और पोटाश 120:60:60 के अनुपात में मिट्टी में मिलाएं।\n8. जैविक खाद: खेत की तैयारी के समय 20-30 टन प्रति हेक्टेयर अच्छी तरह सड़ी गोबर की खाद डालें।\n9. सिंचाई: वर्षा कम होने पर 15-20 दिनों के अंतराल पर सिंचाई करें।\n10. खरपतवार नियंत्रण: रोपण के 45 और 90 दिन बाद निराई-गुड़ाई अवश्य करें।\n11. रोगों की रोकथाम: प्रकंद सड़न (Rhizome rot) से बचने के लिए मिट्टी में उपयुक्त फफूंदनाशक मिलाएं।\n12. मिट्टी चढ़ाना: रोपण के 3 महीने बाद पौधों के आधार पर मिट्टी चढ़ाएं ताकि प्रकंद अच्छी तरह फैलें।\n13. कटाई: आमतौर पर 7-9 महीने बाद जब पत्तियां पीली होकर सूख जाएं, तब हल्दी की खुदाई करें।\n14. शोधन (Curing): खुदाई के बाद हल्दी को उबालने और धूप में सुखाने की प्रक्रिया सावधानी से करें।\n15. पॉलिशिंग: सूखने के बाद हल्दी को चमकदार बनाने के लिए पॉलिश करें ताकि बाजार मूल्य अच्छा मिले।"
                    },
                    "tomato": {
                        "name": "टमाटर",
                        "season": "रबी",
                        "desc": "दोमट मिट्टी के लिए उपयुक्त उच्च मूल्य वाली फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छे जल निकास वाली उपजाऊ दोमट मिट्टी (pH 6.0-7.0) टमाटर के लिए आदर्श है।\n2. जलवायु: शुष्क और मध्यम गर्म जलवायु (20-28°C) सर्वोत्तम है।\n3. नर्सरी प्रबंधन: 25-30 दिन पुरानी पौध की रोपाई करें; शाम का समय रोपाई के लिए अच्छा है।\n4. रोपाई की दूरी: कतार से कतार 60 सेमी और पौधे से पौधे 45 सेमी की दूरी रखें।\n5. बीज उपचार: 'ट्राइकोडर्मा' से बीज उपचारित करने पर 'डैम्पिंग ऑफ' रोग कम होता है।\n6. सहारा देना (Staking): फलों को मिट्टी से बचाने और सड़ने से रोकने के लिए डंडों या तार का सहारा दें।\n7. उर्वरक: 100:60:60 NPK के साथ प्रचुर मात्रा में सड़ी हुई गोबर की खाद डालें।\n8. सिंचाई: जड़ों के पास हल्की सिंचाई करें; ड्रिप सिंचाई टमाटर के लिए सबसे अच्छी है।\n9. खरपतवार: रोपाई के पहले महीने में 2 बार निराई-गुड़ाई अवश्य करें।\n10. छंटाई (Pruning): अनावश्यक शाखाओं को हटाकर मुख्य तने को विकसित होने दें।\n11. सूक्ष्म पोषक तत्व: फलों को फटने से बचाने के लिए बोरान और कैल्शियम का छिड़काव करें।\n12. कीट नियंत्रण: फल छेदक (Fruit Borer) के लिए फेरोमोन ट्रैप और नीम तेल का प्रयोग करें।\n13. रोगों की रोकथाम: अगेती और पछेती झुलसा (Blight) के लिए कवकनाशी का समय पर उपयोग करें।\n14. मल्चिंग: प्लास्टिक मल्च का उपयोग खरपतवार रोकने और नमी बचाने में बहुत सहायक है।\n15. कटाई: स्थानीय बाजार के लिए पूर्ण विकसित लाल टमाटर और दूर भेजने के लिए 'पिंक' स्टेज पर तोड़ें।"
                    },
                    "sugarcane": {
                        "name": "गन्ना",
                        "season": "बारहमासी",
                        "desc": "उपजाऊ जलोढ़ मिट्टी के लिए उपयुक्त भारी जल उपभोक्ता।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी, उपजाऊ और मध्यम से भारी दोमट मिट्टी (pH 6.5-7.5) गन्ने के लिए उपयुक्त है।\n2. रोपण का समय: बसंत ऋतु (फरवरी-मार्च) और शरद ऋतु (अक्टूबर-नवंबर) सबसे अच्छे समय हैं।\n3. बीज का चुनाव: 8-10 महीने पुराने स्वस्थ गन्ने की 3 आंखों वाले टुकड़ों (Sets) का उपयोग करें।\n4. बीज उपचार: टुकड़ों को 'एगलॉल' या 'एरेटॉन' से उपचारित करने से जमाव अच्छा होता है।\n5. रोपण विधि: कतारों के बीच 75-90 सेमी की दूरी रखें; नाली विधि (Trench method) उत्तम है।\n6. उर्वरक प्रबंधन: भारी मात्रा में नाइट्रोजन की आवश्यकता होती है; फास्फोरस और पोटाश बुवाई के समय दें।\n7. सिंचाई: गन्ने को अधिक पानी चाहिए; गर्मी में 8-10 दिन और सर्दी में 15-20 दिन के अंतर पर पानी दें।\n8. खरपतवार: पहले 3-4 महीनों तक फसल को खरपतवार मुक्त रखना बहुत जरूरी है।\n9. निराई-गुड़ाई: जड़ों को हवा मिलने और विकास के लिए नियमित निराई-गुड़ाई करें।\n10. मिट्टी चढ़ाना (Earthing): पौधों को गिरने से बचाने के लिए 3-4 महीने बाद जड़ों पर मिट्टी चढ़ाएं।\n11. कीट नियंत्रण: पायरीला और सफेद मक्खी के लिए एकीकृत कीट प्रबंधन अपनाएं।\n12. रोगों की रोकथाम: लाल सड़न (Red rot) प्रतिरोधी किस्मों का ही चयन करें।\n13. गन्ने को बांधना (Propping): फसल को गिरने से बचाने के लिए गन्ने के पौधों को एक साथ बांधें।\n14. परिपक्वता: जब गन्ने के दाने सख्त हो जाएं और ऊपर की पत्तियां पीली होने लगें, तब कटाई करें।\n15. रैटूनिंग (Ratooning): पहली फसल के बाद पेड़ी फसल लेने के लिए सही प्रबंधन करें।"
                    },
                    "groundnut": {
                        "name": "मूंगफली",
                        "season": "खरीफ/रबी",
                        "desc": "तेलहन फसल जो मिट्टी में नाइट्रोजन स्थिर करती है।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: उपजाऊ बलुई दोमट मिट्टी मूंगफली के लिए सर्वोत्तम है ताकि फलियां आसानी से विकसित हो सकें।\n2. जलवायु: मध्यम वर्षा और शुष्क मौसम (25-30°C) मूंगफली के विकास के लिए अच्छा है।\n3. बीज दर: दानों के आकार के अनुसार 80-100 किलो दाना प्रति हेक्टेयर प्रयोग करें।\n4. बीज उपचार: बीजों को 'थीरम' या 'मैनकोजेब' से उपचारित करना अनिवार्य है।\n5. राइजोबियम: बुवाई से पहले बीजों पर राइजोबियम कल्चर लगाएं ताकि नाइट्रोजन स्थिरीकरण बेहतर हो।\n6. बुवाई की दूरी: कतार से कतार 30 सेमी और पौधे से पौधे 10 सेमी की दूरी रखें।\n7. उर्वरक: 20:60:40 NPK के साथ सल्फर का प्रयोग तेल की मात्रा बढ़ाने के लिए करें।\n8. जिप्सम प्रबंधन: सुइयां बनते समय (Pegging stage) 250-400 किलो जिप्सम प्रति हेक्टेयर डालें।\n9. सिंचाई: सुइयां बनते समय और फलियां भरते समय नमी की कमी न होने दें।\n10. खरपतवार: मूंगफली में निराई बहुत जरूरी है, लेकिन 'पेगिंग' शुरू होने के बाद निराई न करें।\n11. कीट नियंत्रण: सफेद लट (White Grub) के नियंत्रण के लिए विशेष ध्यान दें।\n12. रोगों की रोकथाम: टिक्का रोग (Leaf Spot) और कॉलर रॉट के लिए समय पर स्प्रे करें।\n13. अंतःफसल: मूंगफली को मक्का या अरहर के साथ अंतर-फसल के रूप में लगाया जा सकता है।\n14. कटाई: जब पत्तियां पीली पड़कर गिरने लगें और फलियों के अंदर का हिस्सा भूरा हो जाए, तब खुदाई करें।\n15. सुकाना (Curing): खुदाई के बाद फलियों को 2-3 दिन धूप में सुखाएं ताकि नमी 8-10% रह जाए।"
                    },
                    "mustard": {
                        "name": "सरसों",
                        "season": "रबी",
                        "desc": "उत्तर भारत की मुख्य तिलहन फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. जलवायु: 15-25°C के बीच तापमान वाली ठंडी जलवायु और साफ मौसम सरसों के लिए अच्छा है।\n2. मिट्टी: मध्यम से भारी दोमट मिट्टी जिसमें अच्छी जल निकासी हो (pH 6.0-7.5).\n3. बुवाई का समय: अक्टूबर का पूरा महीना सरसों की बुवाई के लिए सबसे उपयुक्त है।\n4. बीज दर: 4-5 किलो प्रति हेक्टेयर बीज पर्याप्त है; बीजों को 2-3 सेमी गहराई पर बोएं।\n5. दूरी: कतारों के बीच 30 सेमी और पौधों के बीच 10-12 सेमी की दूरी रखें।\n6. विरलीकरण (Thinning): जमाव के 15-20 दिन बाद अतिरिक्त पौधों को हटाकर सही दूरी बनाएं।\n7. उर्वरक: 80:40:40 NPK के साथ सरसों में गंधक (Sulphur) का प्रयोग तेल की मात्रा बढ़ाता है।\n8. सिंचाई: पहली सिंचाई फूल आने से पहले (30-35 दिन) और दूसरी फली बनते समय करें।\n9. खरपतवार: फसल के शुरुआती 30 दिनों में निराई-गुड़ाई कर खरपतवारों को नियंत्रित करें।\n10. कीट प्रबंधन: माहू (Aphid) सरसों का प्रमुख शत्रु है; इसके लिए समय पर कीटनाशक का प्रयोग करें।\n11. रोगों की रोकथाम: सफेद रतुआ (White Rust) और पाला गिरने की स्थिति में फसल की सुरक्षा करें।\n12. सल्फर प्रबंधन: 20-30 किलो सल्फर प्रति हेक्टेयर डालने से दाना चमकदार और वजनदार होता है।\n13. मधुमक्खी पालन: सरसों के खेत के पास मधुमक्खी पालन से परागण (Pollination) और उपज बढ़ती है।\n14. कटाई: जब 70-80% फलियां पीली हो जाएं, तब फसल काट लें ताकि बीज न झड़ें।\n15. भंडारण: दानों को धूप में सुखाकर नमी 8% से कम होने पर ही भंडारित करें।"
                    },
                    "onion": {
                        "name": "प्याज",
                        "season": "रबी/खरीफ",
                        "desc": "रसोई में उपयोग की जाने वाली आवश्यक कंद फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छे जल निकास वाली उपजाऊ दोमट या बलुई दोमट मिट्टी (pH 6.0-7.0) सर्वोत्तम है।\n2. नर्सरी प्रबंधन: बीजों को नर्सरी में 6-7 सप्ताह तक विकसित होने दें; रोपाई के समय ऊंचाई 15 सेमी हो।\n3. रोपाई का समय: रबी के लिए नवंबर-दिसंबर और खरीफ के लिए जुलाई-अगस्त।\n4. रोपाई की दूरी: कतार से कतार 15 सेमी और पौधे से पौधे 10 सेमी की दूरी रखें।\n5. उर्वरक: 100:50:50 NPK के साथ प्रचुर मात्रा में सड़ी गोबर की खाद और सल्फर डालें।\n6. सिंचाई: प्याज को नियमित रूप से पानी दें; कंद (Bulb) बनते समय नमी कम न होने दें।\n7. खरपतवार: प्याज की फसल में 2-3 बार निराई बहुत जरूरी है क्योंकि खरपतवार उपज घटाते हैं।\n8. कीट प्रबंधन: थ्रिप्स से बचाव के लिए चिपकने वाले नीले ट्रैप (Blue Sticky Traps) लगाएं।\n9. रोगों की रोकथाम: बैंगनी धब्बा (Purple Blotch) के लिए प्रभावी कवकनाशी का छिड़काव करें।\n10. सल्फर की भूमिका: सल्फर प्याज के तीखेपन और भंडारण क्षमता को बढ़ाता है।\n11. सिंचाई रोकना: कटाई से 15 दिन पहले सिंचाई पूरी तरह बंद कर दें ताकि कंद सख्त हो सकें।\n12. परिपक्वता पहचान: जब 50% पौधों की पत्तियां ऊपर से गिर जाएं (Neck fall), तब समझें फसल तैयार है।\n13. कटाई: पौधों को उखाड़कर 2-3 दिन खेत में ही रहने दें ताकि पत्तियां सूख जाएं।\n14. शोधन (Curing): कंदों को 10-15 दिन छायादार हवादार स्थान पर सुखाएं ताकि भंडारण में सड़न न हो।\n15. भंडारण: अच्छी तरह सूखे कंदों को हवादार भंडार गृहों या जूट की बोरियों में रखें।"
                    },
                    "potato": {
                        "name": "आलू",
                        "season": "रबी",
                        "desc": "दुनिया भर में सबसे महत्वपूर्ण सब्जी की फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. बीज का चुनाव: रोग मुक्त, प्रमाणित और अच्छी तरह अंकुरित बीज कंदों का ही प्रयोग करें।\n2. मिट्टी: गहरी, उपजाऊ और भुरभुरी बलुई दोमट मिट्टी (pH 5.2-6.4) आलू के लिए सबसे अच्छी है।\n3. बुवाई का समय: उत्तर भारत में अक्टूबर का मध्य समय बुवाई के लिए श्रेष्ठ है।\n4. रोपण विधि: मेड़ों (Ridges) पर आलू लगाएं; उचित दूरी 60x20 सेमी रखें।\n5. उर्वरक: 150:100:100 NPK के साथ खेत की तैयारी में पर्याप्त गोबर खाद का प्रयोग करें।\n6. मिट्टी चढ़ावा (Earthing): रोपण के 30-35 दिन बाद पौधों पर मिट्टी चढ़ाएं ताकि कंद धूप से बच सकें।\n7. सिंचाई: हल्की और बार-बार सिंचाई करें; कंद बनते समय नमी का ध्यान रखें।\n8. कीट प्रबंधन: माहू (Aphid) और आलू के छोटे कीटों पर नियमित निगरानी रखें।\n9. झुलसा रोग (Blight): अगेती और पछेती झुलसा से बचाव के लिए कवकनाशी का अग्रिम प्रयोग करें।\n10. खरपतवार नियंत्रण: मिट्टी चढ़ाते समय खरपतवारों को साफ कर दें।\n11. डीहलमिंग (Dehaulming): खुदाई से 10-12 दिन पहले पौधों की ऊपरी बेल को काटकर हटा दें।\n12. कंद परिपक्वता: डीहलमिंग से आलू की त्वचा सख्त हो जाती है और भंडारण क्षमता बढ़ती है।\n13. खुदाई: हल्की मिट्टी सूखने पर खुदाई करें; आलू को चोट लगने से बचाएं।\n14. सुखाना: खुदाई के बाद कंदों को 2-3 दिन छाया में हवा लगने दें (Curing). 15. भंडारण: आलू को ग्रेड करें और केवल स्वस्थ कंदों को ही ठंडे और हवादार स्थान या कोल्ड स्टोरेज में रखें।"
                    },
                    "guava": {
                        "name": "अमरूद",
                        "season": "बारहमासी",
                        "desc": "विटामिन सी से भरपूर फल की फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. उत्तम मिट्टी: अच्छे जल निकास वाली उपजाऊ दोमट या बलुई दोमट मिट्टी अमरूद के लिए सर्वोत्तम है।\n2. रोपण का समय: मानसून की शुरुआत (जून-जुलाई) या बसंत ऋतु (फरवरी-मार्च) का समय अच्छा है।\n3. गड्ढों की तैयारी: 60x60x60 सेमी के गड्ढे खोदें और उन्हें गोबर खाद, मिट्टी और उर्वरकों के मिश्रण से भरें।\n4. रोपण की दूरी: बागवानी के लिए 6x6 मीटर और सघन बागवानी (HDP) के लिए 3x3 मीटर की दूरी रखें।\n5. किस्मों का चुनाव: 'इलाहाबादी सफेदा' और 'लखनऊ-49 (सरदार)' व्यावसायिक रूप से सफल किस्में हैं।\n6. सिंचाई प्रबंधन: युवा पौधों को नियमित पानी दें; पुराने पेड़ों को फल बनते समय सिंचाई की आवश्यकता होती है।\n7. उर्वरक: वर्ष में दो बार (जून और जनवरी) सड़ी हुई गोबर की खाद और संतुलित NPK का प्रयोग करें।\n8. वार्षिक छंटाई (Pruning): वर्ष में एक बार छंटाई जरूरी है ताकि नई शाखाएं आएं और धूप अंदर तक पहुंचे।\n9. बहार प्रबंधन: अधिक लाभ के लिए 'मृग बहार' (सर्दी की फसल) लेने का प्रयास करें; 'अम्बे बहार' के फूल तोड़ दें।\n10. कीट नियंत्रण: फल मक्खी (Fruit Fly) से बचाव के लिए अमरूद के फलों पर पेपर बैगिंग या ट्रैप का उपयोग करें।\n11. विल्ट रोग प्रबंधन: अमरूद के सूखने वाले रोग (Wilt) से बचाव के लिए मिट्टी का उपचार और सही जल निकास रखें।\n12. प्रशिक्षण (Training): युवा पौधों को एक सीधे तने पर 60-90 सेमी तक बढ़ने दें, फिर शाखाएं निकलने दें।\n13. खरपतवार: पेड़ों के चारों ओर खरपतवार मुक्त मेड़ (Thali) बनाए रखें।\n14. कटाई: जब फल हरे से हल्के पीले या सफेद होने लगें, तब डंठल सहित सावधानी से तोड़ें।\n15. श्रेणीकरण: फलों को वजन और गुणवत्ता के अनुसार अलग करें ताकि बाजार में अधिक दाम मिलें।"
                    },
                    "mango": {
                        "name": "आम",
                        "season": "बारहमासी",
                        "desc": "फलों का राजा, भारत के लिए प्रमुख निर्यात फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. जलवायु: आम के लिए उष्णकटिबंधीय जलवायु सर्वोत्तम है; फूल आने के समय कोहरा या बारिश नुकसानदेह है।\n2. गड्ढों का उपचार: 1x1x1 मीटर के गड्ढों को मिट्टी, 50 किलो गोबर खाद और बोन मील से भरकर रखें।\n3. कलमी पौधों का चुनाव: हमेशा प्रमाणित नर्सरी से स्वस्थ और रोग मुक्त कलमी (Grafted) पौधे ही लें।\n4. रोपण विधि: पौधों को गड्ढे के ठीक बीच में लगाएं और ग्राफ्टिंग हिस्से को मिट्टी से 15-20 सेमी ऊपर रखें।\n5. सिंचाई प्रारंभ: रोपण के तुरंत बाद पानी दें; पहले साल सप्ताह में दो बार सिंचाई करें।\n6. पोषण (NPK): 10 साल से ऊपर के पेड़ों को 1 किलो नाइट्रोजन, 0.5 किलो फास्फोरस और 1 किलो पोटाश सालाना दें।\n7. खरपतवार: बाग को खरपतवार मुक्त रखने के लिए साल में दो बार जुताई करें।\n8. अंतःफसल (Intercropping): शुरुआती 5-8 वर्षों में दलहनी या छोटी सब्जियाँ उगाकर अतिरिक्त आय लें।\n9. पुष्पन प्रबंधन: दिसंबर-जनवरी में फूल आते समय पेड़ों को विशेष पोषण और सुरक्षा की जरूरत होती है।\n10. कीट प्रबंधन: आम का फुदका (Hopper) और मिलीबग प्रमुख कीट हैं; नीम के तेल या कीटनाशकों का प्रयोग करें।\n11. रोगों की रोकथाम: चूर्णिल आसिता (Powdery Mildew) और एन्थ्रेक्नोज के लिए गंधक युक्त कवकनाशी छिड़कें।\n12. फल गिरना (Fruit drop): फलों को गिरने से रोकने के लिए पानी का संतुलन बनाए रखें और 2,4-D का छिड़काव करें।\n13. ट्रेनिंग और प्रुनिंग: सूखे और रोगग्रस्त शाखाओं को नियमित अंतराल पर हटाते रहें।\n14. कटाई: जब फल पूरी तरह विकसित होकर कंधे पर भारी हो जाएं, तब 'हार्वेस्टर' का उपयोग कर डंठल सहित तोड़ें।\n15. पोस्ट हार्वेस्ट: फलों को गर्म पानी (52°C) से उपचारित करें ताकि वे सड़ें नहीं और लंबे समय तक ताजे रहें।"
                    },
                    "banana": {
                        "name": "केला",
                        "season": "बारहमासी",
                        "desc": "उच्च पोषण वाला तेजी से बढ़ने वाला फल का पौधा।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी, उपजाऊ और उपजाऊ दोमट मिट्टी जिसमें अच्छी जल निकासी हो, केले के लिए अनिवार्य है।\n2. पौध चयन: टिश्यू कल्चर पौधों को प्राथमिकता दें क्योंकि वे रोग मुक्त और एकसमान उत्पादन देते हैं।\n3. रोपण की दूरी: जी-9 जैसी किस्मों के लिए 1.8x1.8 मीटर या 1.5x1.5 मीटर की दूरी रखें।\n4. सिंचाई (Fertigation): केले को भारी पानी की जरूरत होती है; ड्रिप सिंचाई से उर्वरक और पानी देना सबसे अच्छा है।\n5. उर्वरक प्रबंधन: केले को प्रचुर मात्रा में नाइट्रोजन और पोटाश की आवश्यकता होती है जिसे मासिक किश्तों में दें।\n6. डीसकरिंग (Desuckering): मुख्य पौधे की वृद्धि के लिए बगल से निकलने वाली छोटी पौध (Suckers) को नियमित हटाते रहें।\n7. मिट्टी चढ़ाना: रोपण के 3-4 महीने बाद पौधों की जड़ों पर मिट्टी चढ़ाएं ताकि वे मजबूत रहें।\n8. फोलियर स्प्रे: सूक्ष्म पोषक तत्वों का छिड़काव पत्तियों की चमक और फलों के गुच्छे के विकास में सहायक है।\n9. कीट प्रबंधन: तना छेदक और राइजोबियम वीविल से बचाव के लिए उचित जैविक या रासायनिक उपचार करें।\n10. रोगों की रोकथाम: सिगाटोका लीफ स्पॉट और पनामा विल्ट के प्रति संवेदनशील रहें और समय पर कवकनाशी दें।\n11. प्रोपिंग (Propping): भारी गुच्छे आने पर पौधों को झुकने या टूटने से बचाने के लिए बांस का सहारा दें।\n12. बंच ढंकना (Bunch Covering): फलों को धूप और कीड़ों से बचाने के लिए पॉलीथीन या स्कर्टिंग बैग का उपयोग करें।\n13. नर फूल हटाना (Denavelling): गुच्छे में फल बनने के बाद नीचे के अवशेष नर भाग (Navel) को हटा दें।\n14. कटाई: जब फलियों के किनारे (Angles) खत्म हो जाएं और वे गोल दिखने लगें, तब गुच्छे को सावधानी से काटें।\n15. परिवहन: गुच्छों को गद्देदार सतह पर रखें और सावधानी से बाजार भेजें ताकि फल दागदार न हों।"
                    },
                    "grapes": {
                        "name": "अंगूर",
                        "season": "बारहमासी",
                        "desc": "खाने और शराब के लिए उपयोग की जाने वाली फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छे निकास वाली बलुई दोमट या हल्की लाल मिट्टी (pH 6.5-7.5) अंगूर के लिए श्रेष्ठ है।\n2. प्रशिक्षण विधि: पंडाल (Pandal) या टेलीफोन सिस्टम का उपयोग करें ताकि बेलें अच्छी तरह फैल सकें।\n3. छंटाई (Pruning): अंगूर में साल में दो बार छंटाई अनिवार्य है – अप्रैल में वृद्धि के लिए और अक्टूबर में फल के लिए।\n4. सिंचाई: अंगूर को नियमित सिंचाई चाहिए, लेकिन फूल आने और पकने के समय पानी का प्रबंधन बहुत सतर्कता से करें।\n5. उर्वरक प्रबंधन: पोटाश अंगूर की मिठास और गुणवत्ता के लिए मुख्य तत्व है; इसे प्रचुर मात्रा में दें।\n6. थिनिंग (Thinning): फलों के गुच्छों को सघन होने से बचाने के लिए अतिरिक्त फलों को हटा दें।\n7. बेरी विकास: बड़े दानों के लिए जिबरेलिक एसिड (GA3) का छिड़काव विशेषज्ञों की सलाह पर करें।\n8. कीट प्रबंधन: मिलीबग (Mealybug) और थ्रिप्स पर नियंत्रण के लिए पीला/नीला ट्रैप और नीम तेल का प्रयोग करें।\n9. रोगों की रोकथाम: डाउनी मिल्ड्यू और एन्थ्रेक्नोज अंगूर के प्रमुख शत्रु हैं; नियमित निगरानी और उपचार आवश्यक है।\n10. पोषक तत्वों की कमी: पुरानी पत्तियों पर मैग्नीशियम की कमी के लक्षण दिखने पर मैग्नीशियम सल्फेट का प्रयोग करें।\n11. सिंचाई रोकना: कटाई से 10-15 दिन पहले सिंचाई बंद करने से अंगूर मीठे होते हैं।\n12. पक्षियों से सुरक्षा: पकने के समय फलों को पक्षियों से बचाने के लिए जाल (Nets) का उपयोग करें।\n13. परिपक्वता: जब दानों का रंग पारभासी हो जाए और वे नरम महसूस हों, तब तोड़ें।\n14. कटाई का समय: अंगूर को हमेशा सुबह के ठंडे समय में ही तोड़ें।\n15. पैकिंग: गुच्छों को सावधानी से बक्सों में पैक करें ताकि उनके ऊपर की सफेद प्राकृतिक मोम (Bloom) न हटे।"
                    },
                    "ginger": {
                        "name": "अदरक",
                        "season": "खरीफ",
                        "desc": "भूमिगत प्रकंदों वाला मूल्यवान मसाला।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी का चुनाव: उपजाऊ, भुरभुरी और प्रचुर जैविक खाद वाली दोमट मिट्टी अदरक के लिए सबसे अच्छी है।\n2. रोपण का समय: मानसून की शुरुआत के साथ मई-जून में अदरक लगाना आदर्श है।\n3. बीजाणु (Rhizomes): रोपण के लिए 20-30 ग्राम वजन के स्वस्थ, रोग मुक्त और कम से कम एक अंकुर वाले प्रकंदों का चयन करें।\n4. बीज दर: प्रति हेक्टेयर लगभग 1500-1800 किलो अदरक के प्रकंद पर्याप्त होते हैं।\n5. ऊँची क्यारी विधि: बेहतर जल निकासी और प्रकंद विकास के लिए हमेशा ऊँची क्यारियों (Raised Beds) पर रोपण करें।\n6. मल्चिंग (Mulching): अदरक में मल्चिंग बहुत जरूरी है; इसे रोपण के समय, 45 दिन और 90 दिन बाद पत्तों से ढकें।\n7. उर्वरक प्रबंधन: 75:50:50 NPK के साथ प्रचुर गोबर खाद या वर्मीकम्पोस्ट का प्रयोग करें।\n8. सिंचाई: अदरक को नमी पसंद है लेकिन जल भराव नहीं; शुष्क समय में नियमित हल्की सिंचाई करें।\n9. खरपतवार: फसल के शुरुआती 4-5 महीनों तक निराई-गुड़ाई कर खरपतवारों को नियंत्रित करें।\n10. मृदा उपचार: प्रकंद सड़न (Rhizome rot) से बचने के लिए मिट्टी में ट्राइकोडर्मा मिलाएं।\n11. कीट प्रबंधन: प्रकंद छेदक (Shoot borer) के प्रति सतर्क रहें और जैव-कीटनाशकों का प्रयोग करें।\n12. मिट्टी चढ़ाना: 2-3 महीने बाद प्रकंदों के ऊपर मिट्टी चढ़ाएं ताकि वे धूप से बचें और बढ़ें।\n13. मिश्रित खेती: छाया प्रदान करने के लिए मक्का या दालों के साथ अदरक को उगाया जा सकता है।\n14. कटाई: सूखने के बाद या 8-9 महीने बाद हरी अदरक के लिए खुदाई करें।\n15. सुखाना (Curing): प्रकंदों को साफ करके छाया में अच्छी तरह सुखाएं और ठंडे-हवादार स्थान पर भंडारित करें।"
                    },
                    "garlic": {
                        "name": "लहसुन",
                        "season": "रबी",
                        "desc": "तेज गंध वाली कंद फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: लहसुन के लिए उपजाऊ दोमट मिट्टी जिसमें अच्छी जल निकासी हो, सबसे अच्छी है।\n2. जलवायु: कंद (Bulbs) बनने के लिए छोटी दिन की अवधि और ठंडे तापमान (15-20°C) की आवश्यकता होती है।\n3. बुवाई का समय: उत्तर भारत में अक्टूबर का मध्य अक्टूबर से नवंबर के पहले सप्ताह तक उत्तम है।\n4. कलियों का चयन: रोपण के लिए बड़े और रोग मुक्त कलियों (Cloves) का उपयोग करें।\n5. बीज दर: प्रति हेक्टेयर लगभग 500-600 किलो कलियां पर्याप्त होती हैं।\n6. रोपण विधि: कलियों को 10x15 सेमी की दूरी पर 3-5 सेमी गहरा लगाएं; नुकीला हिस्सा ऊपर रखें।\n7. उर्वरक: 100:50:50 किलो NPK प्रति हेक्टेयर; पोटाश कंद के आकार और गुणवत्ता के लिए महत्वपूर्ण है।\n8. सड़ी गोबर खाद: खेत की तैयारी में 20 टन सड़ी हुई गोबर खाद मिलाएं।\n9. सिंचाई: लहसुन को नियमित नमी चाहिए; कंद बनते समय पानी की कमी न होने दें।\n10. खरपतवार: फसल के दौरान 2-3 बार निराई-गुड़ाई करना अनिवार्य है क्योंकि लहसुन खरपतवारों के प्रति संवेदनशील है।\n11. कीट प्रबंधन: थ्रिप्स (Thrips) लहसुन के प्रमुख कीट हैं; नीम तेल या पीला चिपचिपा ट्रैप उपयोग करें।\n12. रोगों की रोकथाम: बैंगनी धब्बा (Purple blotch) से बचाव के लिए समय पर कवकनाशी का छिड़काव करें।\n13. सिंचाई का अंत: कटाई से 15-20 दिन पहले सिंचाई पूरी तरह बंद कर दें ताकि कंद सख्त हो सकें।\n14. परिपक्वता: जब पौधों की ऊपरी 50% पत्तियां पीली होकर गिर जाएं, तब समझें लहसुन तैयार है।\n15. कटाई और सुखाना: पौधों को उखाड़कर 3-4 दिन छाया में सुखाएं (Curing) ताकि भंडारण क्षमता बढ़े।"
                    },
                    "soybean": {
                        "name": "सोयाबीन",
                        "season": "खरीफ",
                        "desc": "उच्च प्रोटीन फलियां और तिलहन।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: उपजाऊ, अच्छी जल निकासी वाली दोमट या भारी मिट्टी सोयाबीन के लिए सर्वोत्तम है (pH 6.5-7.5).\n2. बुवाई का समय: मानसून की पहली प्रमुख वर्षा के बाद जून के अंतिम सप्ताह से जुलाई के पहले सप्ताह तक।\n3. बीज दर: किस्म के आधार पर 65-75 किलो बीज प्रति हेक्टेयर।\n4. बीज उपचार: फफूंदनाशी और राइजोबियम कल्चर (Rhizobium) से उपचार करना नाइट्रोजन स्थिरीकरण के लिए आवश्यक है।\n5. पीएसबी (PSB) कल्चर: फास्फोरस की उपलब्धता बढ़ाने के लिए पीएसबी कल्चर का भी प्रयोग करें।\n6. दूरी: कतार से कतार 45 सेमी और पौधे से पौधे 5-10 सेमी की दूरी रखें।\n7. उर्वरक: 20:60:40 किलो NPK प्रति हेक्टेयर; सल्फर का प्रयोग दाल की गुणवत्ता में सुधार करता है।\n8. खरपतवार प्रबंधन: बुवाई के 30-45 दिनों तक खेत को खरपतवार मुक्त रखना अनिवार्य है।\n9. जल प्रबंधन: फूल आने और फलियां भरने के समय नमी की कमी उपज को बहुत प्रभावित करती है।\n10. कीट प्रबंधन: गर्डल बीटल (Girdle beetle) और सेमीलूपर सूंडी के प्रति सतर्क रहें; IPM अपनाएं।\n11. रोगों की रोकथाम: पीला मोज़ेक वायरस (YMV) के लिए प्रतिरोधी किस्मों का चयन करें और सफेद मक्खी को नियंत्रित करें।\n12. विरलीकरण: अधिक घने पौधों को बुवाई के 15-20 दिन बाद हटा दें।\n13. एकीकृत खाद प्रबंधन: रासायनिक उर्वरकों के साथ जैविक खाद का संतुलित उपयोग करें।\n14. कटाई: जब 90% फलियां भूरी या सुनहरी पीली हो जाएं और पत्तियां गिर जाएं, तब कटाई करें।\n15. भंडारण: दानों को सुखाकर नमी 10-12% तक लाएं ताकि वे लंबे समय तक सुरक्षित रहें।"
                    },
                    "chickpea": {
                        "name": "चना",
                        "season": "रबी",
                        "desc": "प्रमुख दलहन फसल, प्रोटीन के लिए महत्वपूर्ण।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी:अच्छी जल निकास वाली दोमट मिट्टी (pH 6.0-9.0); बहुत अधिक उपजाऊ मिट्टी में वानस्पतिक वृद्धि अधिक होती है।\n2. जलवायु: चने को ठंडी और शुष्क जलवायु पसंद है; पाला फसल के लिए नुकसानदायक है।\n3. बुवाई का समय: अक्टूबर के मध्य से नवंबर के मध्य तक का समय सर्वश्रेष्ठ है।\n4. बीज दर: देसी चने के लिए 70-80 किलो और काबुली के लिए 100-120 किलो प्रति हेक्टेयर।\n5. बीज उपचार: 'ट्राइकोडर्मा' या फफूंदनाशी से उपचारित करने पर 'उकठा' (Wilt) रोग कम होता है।\n6. दूरी: कतार से कतार 30 सेमी और पौधे से पौधे 10 सेमी की दूरी रखें।\n7. उर्वरक प्रबंधन: 20:60:20 किलो NPK प्रति हेक्टेयर; डीएपी (DAP) का प्रयोग बुवाई के समय करें।\n8. निप्पिंग (Nipping): बुवाई के 30-40 दिन बाद पौधों की ऊपरी कलियों को तोड़ दें ताकि अधिक शाखाएं और फलियां लगें।\n9. सिंचाई: आमतौर पर चने को कम पानी चाहिए; पहली सिंचाई फूल आने से पहले और दूसरी फली बनते समय करें।\n10. कीट प्रबंधन: फली छेदक (Pod Borer) चने का सबसे खतरनाक कीट है; इसके लिए फेरोमोन ट्रैप लगाएं।\n11. सल्फर का उपयोग: 20 किलो सल्फर प्रति हेक्टेयर देने से उपज और गुणवत्ता में सुधार होता है।\n12. खरपतवार: पहली निराई 30-35 दिन बाद करें; इससे जड़ों को हवा भी मिलती है।\n13. उकठा रोग: इस बीमारी से बचने के लिए फसल चक्र अपनाएं और प्रतिरोधी किस्में ही उगाएं।\n14. कटाई: जब पौधे पीले हो जाएं और फलियों को हिलाने पर दानों की आवाज 'खड़खड़ाने' लगे, तब कटाई करें।\n15. भंडारण: मड़ाई के बाद चने को सुखाकर नमी 10% से कम रखें।"
                    },
                    "black_gram": {
                        "name": "उड़द",
                        "season": "खरीफ/रबी",
                        "desc": "पौष्टिक दाल, किण्वित खाद्य पदार्थों में उपयोग की जाती है।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छे जल निकास वाली मध्यम से भारी दोमट या काली मिट्टी उड़द के लिए उत्तम है।\n2. बुवाई का समय: खरीफ में जून-जुलाई और रबी में धान की कटाई के बाद नवंबर।\n3. बीज दर: खरीफ के लिए 12-15 किलो और ग्रीष्मकालीन के लिए 20-25 किलो प्रति हेक्टेयर।\n4. बीज उपचार: राइजोबियम कल्चर से बीज उपचारित करने पर उपज 10-15% तक बढ़ सकती है।\n5. दूरी: खरीफ में 30x10 सेमी और ग्रीष्मकाल में 25x10 सेमी का अंतराल रखें।\n6. उर्वरक प्रबंधन: 20:40:20 किलो NPK प्रति हेक्टेयर; फास्फोरस का प्रयोग जड़ों के विकास के लिए जरूरी है।\n7. खरपतवार विकास: शुरुआती 20-30 दिन खरपतवार नियंत्रण के लिए बहुत महत्वपूर्ण हैं।\n8. सिंचाई: उड़द में अधिक पानी न भरें अन्यथा जड़ें सड़ सकती हैं; फूल व फल बनते समय नमी बनाए रखें।\n9. कीट प्रबंधन: फली छेदक और रस चूसक कीटों के लिए नीम के तेल का नियमित छिड़काव करें।\n10. पीला मोज़ेक (YMV): सफेद मक्खी इस रोग को फैलाती है; उसे नियंत्रित करें और रोग रोधी किस्में बोएं।\n11. सूक्ष्म पोषक तत्व: दलहनी फसलों में मोलिब्डेनम और बोरॉन का प्रयोग उपज बढ़ाने में सहायक है।\n12. अंतःफसल: इसे मक्का, कपास या ज्वार के साथ मिश्रित खेती के रूप में भी उगाया जा सकता है।\n13. विरलीकरण: जमाव के 2 सप्ताह बाद अतिरिक्त पौधों को हटाकर पौधों की सही संख्या बनाए रखें।\n14. कटाई: जब 80-90% फलियां काली पड़कर सूख जाएं, तब पूरे पौधे की कटाई करें या फलियां तोड़ें।\n15. भंडारण: मड़ाई के बाद अनाज को साफ करके नमी 10% से कम होने तक सुखाएं।"
                    },
                    "green_gram": {
                        "name": "मूंग",
                        "season": "खरीफ/रबी",
                        "desc": "सुपाच्य बहुमुखी दलहन फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छी जल निकासी वाली उपजाऊ दोमट या बलुई दोमट मिट्टी (pH 6.5-7.5) मूंग के लिए आदर्श है।\n2. बुवाई का समय: खरीफ में मानसून के साथ (जुलाई) और जायद (ग्रीष्मकालीन) में मार्च के महीने में।\n3. बीज दर: खरीफ के लिए 15-20 किलो और जायद के लिए 20-25 किलो प्रति हेक्टेयर।\n4. बीज उपचार: बीजों को 'थीरम' या 'कार्बेंडाजिम' और राइजोबियम कल्चर से उपचारित करें।\n5. दूरी: कतारों के बीच 30 सेमी और पौधों के बीच 10 सेमी की दूरी रखें।\n6. उर्वरक: 20:40:20 किलो NPK प्रति हेक्टेयर; सल्फर का प्रयोग दाल की पोषण गुणवत्ता बढ़ाता है।\n7. सिंचाई: जायद मूंग में 10-12 दिन के अंतराल पर सिंचाई की जरूरत होती है; खरीफ में वर्षा आधारित खेती हो सकती है।\n8. खरपतवार प्रबंधन: बुवाई के 30-35 दिन बाद तक निराई-गुड़ाई कर खेत साफ रखें।\n9. पीला मोज़ेक वायरस (YMV): यह मूंग की सबसे बड़ी समस्या है; प्रतिरोधी किस्में जैसे IPM 02-3 आदि चुनें।\n10. कीट प्रबंधन: थ्रिप्स और फली छेदक के प्रति सावधान रहें और जैविक कीटनाशकों को प्राथमिकता दें।\n11. मृदा सुधार: दलहनी फसल होने के कारण मूंग मिट्टी में नाइट्रोजन बढ़ाती है; फसल चक्र अपनाएं।\n12. जल भराव से बचाव: मूंग जल भराव बिल्कुल सहन नहीं कर सकती, इसलिए जल निकासी का उत्तम प्रबंध रखें।\n13. फलियों का पकना: मूंग की फलियां एक साथ नहीं पकती हैं, इसलिए इन्हें 2-3 बार में तोड़ना पड़ता है।\n14. कटाई: जब फलियां भूरी या काली हो जाएं, तब तुड़ाई शुरू करें।\n15. भंडारण: दानों को धूप में अच्छी तरह सुखाकर नमी 9% तक ले आएं।"
                    },
                    "tea": {
                        "name": "चाय",
                        "season": "बारहमासी",
                        "desc": "दुनिया की सबसे लोकप्रिय पेय फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. जलवायु: चाय के लिए 20-30°C तापमान और 150-300 सेमी वार्षिक वर्षा वाली नम जलवायु आवश्यक है।\n2. मिट्टी: गहरी, अम्लीय मिट्टी (pH 4.5-5.5) जिसमें जैविक पदार्थ प्रचुर हों और लोहा/एल्युमीनियम मौजूद हो।\n3. ढलान प्रबंधन: पहाड़ी ढलानों पर खेती करें ताकि जल भराव न हो (चाय की जड़ों को पानी का ठहराव पसंद नहीं है)।\n4. चाय की नर्सरी: चाय का रोपण प्रमाणित पौधों या कलियों (Cuttings) के माध्यम से करें।\n5. रोपण की दूरी: आमतौर पर 1.05x0.6 मीटर या 1.2x0.6 मीटर की दूरी पर पौधे लगाएं।\n6. छायादार पेड़: तेज धूप से बचाने के लिए चाय के बागानों में सिल्वर ओक या अल्बिजिया जैसे छायादार पेड़ लगाएं।\n7. छंटाई (Pruning): झाड़ी के आकार और नई कोमल पत्तियों के विकास के लिए समय-समय पर छंटाई अनिवार्य है।\n8. टिपिंग (Tipping): छंटाई के बाद झाड़ी की सतह को समतल करने के लिए 'टिपिंग' की प्रक्रिया अपनाएं।\n9. उर्वरक प्रबंधन: नाइट्रोजन, फास्फोरस और पोटाश (NPK) का संतुलित प्रयोग उत्पादकता बढ़ाता है।\n10. सिंचाई: शुष्क महीनों के दौरान फव्वारा (Sprinkler) सिंचाई का उपयोग करें।\n11. तुड़ाई (Plucking): चाय की गुणवत्ता के लिए 'दो पत्ती और एक कली' की ही तुड़ाई करें।\n12. प्लकिंग चक्र: मौसम के अनुसार तुड़ाई हर 7-10 दिनों के अंतराल पर की जाती है।\n13. खरपतवार नियंत्रण: मल्चिंग और नियमित हाथ से निराई कर बागान साफ रखें।\n14. रोगों की रोकथाम: 'ब्लिस्टर ब्लाइट' जैसे रोगों के लिए बोर्डो मिश्रण या कवकनाशी का प्रयोग करें।\n15. प्रोसेसिंग: तुड़ाई के बाद पत्तियों को तुरंत प्रसंस्करण (Withering, Rolling, Fermenting) के लिए फैक्ट्री भेजें।"
                    },
                    "pigeon_pea": {
                        "name": "अरहर (तुअर)",
                        "season": "खरीफ",
                        "desc": "सूखा सहिष्णु दलहन फसल, प्रोटीन का मुख्य स्रोत।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छी जल निकासी वाली बलुई दोमट मिट्टी (pH 6.5-7.5) अरहर के लिए सर्वोत्तम है।\n2. बुवाई का समय: मानसून के आगमन के साथ जून-जुलाई में बुवाई करें।\n3. बीज दर: शुद्ध फसल के लिए 12-15 किलो प्रति हेक्टेयर बीज पर्याप्त है।\n4. बीज उपचार: बीजों को 'कार्बेंडाजिम' और 'राइजोबियम' कल्चर से अवश्य उपचारित करें।\n5. किस्मों का चयन: उकठा (Wilt) रोग रोधी किस्में जैसे BDN 711 या ICPH 2740 चुनें।\n6. दूरी: पौधों के बीच 15-20 सेमी और कतारों के बीच 60-90 सेमी की दूरी रखें।\n7. उर्वरक प्रबंधन: 20 किलो नाइट्रोजन और 50 किलो फास्फोरस प्रति हेक्टेयर बुवाई के समय दें।\n8. खरपतवार नियंत्रण: शुरुआती 60 दिनों तक खेत को साफ रखें; 30 और 60 दिन पर निराई करें।\n9. सिंचाई: यदि मानसून के बाद वर्षा न हो, तो फूल आने और फली बनते समय सिंचाई अवश्य करें।\n10. कीट प्रबंधन: फली छेदक (Pod Borer) सबसे बड़ा दुश्मन है; फेरोमोन ट्रैप और नीम तेल का उपयोग करें।\n11. उकठा रोग: इससे बचने के लिए फसल चक्र अपनाएं और जल भराव न होने दें।\n12. विरलीकरण: बुवाई के 3 सप्ताह बाद घने पौधों को निकालकर सही दूरी सुनिश्चित करें।\n13. पोषक तत्व: गंधक (Sulphur) का उपयोग दाल की चमक और गुणवत्ता बढ़ाता है।\n14. कटाई: जब 80% फलियां सूखकर भूरी हो जाएं, तब फसल की कटाई करें।\n15. भंडारण: मड़ाई के बाद अनाज को अच्छी तरह सुखाकर 10-12% नमी पर सुरक्षित रखें।"
                    },
                    "lentil": {
                        "name": "मसूर",
                        "season": "रबी",
                        "desc": "छोटा, लेंस के आकार का पौष्टिक दलहन।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: मसूर के लिए मटियार दोमट या हल्की दोमट मिट्टी (pH 7.0-8.0) उत्तम है।\n2. जलवायु: ठंडी जलवायु की फसल है; पाला और जल भराव के प्रति संवेदनशील है।\n3. बुवाई का समय: 15 अक्टूबर से 15 नवंबर तक का समय बुवाई के लिए आदर्श है।\n4. बीज दर: छोटे दानों के लिए 30-35 किलो और बड़े दानों के लिए 40-45 किलो प्रति हेक्टेयर।\n5. बीज उपचार: 'बाविस्टिन' और राइजोबियम कल्चर (Rhizobium leguminosarum) का प्रयोग करें।\n6. दूरी: कतार से कतार 25-30 सेमी और पौधे से पौधे 5 सेमी की दूरी रखें।\n7. उर्वरक: 20 किलो नाइट्रोजन और 40 किलो फास्फोरस प्रति हेक्टेयर बुवाई के समय दें।\n8. सिंचाई: सामान्यतः 2 सिंचाई की आवश्यकता होती है: पहली शाखाएं बनते समय और दूसरी फली भरते समय।\n9. खरपतवार: बुवाई के 45 दिन तक खेत को खरपतवार मुक्त रखें; पेंडिमिथालिन का उपयोग कर सकते हैं।\n10. कीट प्रबंधन: माहू (Aphids) का प्रकोप होने पर नीम आधारित कीटनाशकों का छिड़काव करें।\n11. रोगों की रोकथाम: उकठा और जड़ सड़न से बचाव के लिए उचित जल निकासी सुनिश्चित करें।\n12. विरलीकरण: पौधों के बीच 5 सेमी की दूरी बनाए रखने के लिए विरलीकरण करें।\n13. जस्ता की कमी: यदि पत्तियां पीली पड़ें, तो जिंक सल्फेट का छिड़काव करें।\n14. कटाई: जब फलियां सुनहरी भूरी हो जाएं और हिलाने पर आवाज करें, तब कटाई करें।\n15. सुखाना: कटाई के बाद फसल को खलिहान में 3-4 दिन सुखाएं फिर मड़ाई करें।"
                    },
                    "cabbage": {
                        "name": "पत्तागोभी",
                        "season": "रबी",
                        "desc": "विभिन्न व्यंजनों में उपयोग की जाने वाली ठंडी जलवायु की सब्जी।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: जैविक पदार्थ से भरपूर बलुई दोमत मिट्टी (pH 6.0-7.0) श्रेष्ठ है।\n2. जलवायु: 15-20°C तापमान आदर्श है; अधिक गर्मी में गोभी का सिर (Head) नहीं बनता।\n3. नर्सरी: बीजों को उठी हुई क्यारियों में बोएं और 4-5 सप्ताह पुराने पौधों का रोपण करें।\n4. उन्नत किस्में: पूसा ड्रम हेड या हाइब्रिड किस्मों का चयन करें।\n5. रोपण की दूरी: मध्यम किस्मों के लिए 60x45 सेमी और अगेती के लिए 45x45 सेमी।\n6. उर्वरक: अधिक पोषण की आवश्यकता—150 किलो N, 100 किलो P और 100 किलो K प्रति हेक्टेयर।\n7. सिंचाई: मिट्टी में नमी बनाए रखें लेकिन पानी जमा न होने दें; दरारें पड़ने से बचाएं।\n8. मल्चिंग: नमी बनाए रखने और खरपतवार नियंत्रण के लिए जैविक मल्च का प्रयोग करें।\n9. कीट प्रबंधन: डायमंड बैक मोथ (Diamondback Moth) प्रमुख कीट है; फेरोमोन ट्रैप लगाएं।\n10. रोग प्रबंधन: क्लब रूट (Clubroot) से बचने के लिए मिट्टी का pH संतुलित रखें।\n11. बोरान का उपयोग: सिर के अंदर खोखलापन रोकने के लिए सुहागा (Borax) का छिड़काव करें।\n12. मिट्टी चढ़ाना: सिर का वजन बढ़ने पर पौधों के चारों ओर मिट्टी अवश्य चढ़ाएं।\n13. खरपतवार नियंत्रण: शुरुआती 60 दिनों तक निराई-गुड़ाई कर खेत साफ रखें।\n14. कटाई: जब पत्तागोभी का सिर सख्त और ठोस हो जाए, तब उसकी कटाई करें।\n15. भंडारण: ठंडी और हवादार जगह पर इसे 1 सप्ताह तक सुरक्षित रखा जा सकता है।"
                    },
                    "cauliflower": {
                        "name": "फूलगोभी",
                        "season": "रबी",
                        "desc": "सफेद फूल (Curd) वाली पौष्टिक सब्जी।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: उपजाऊ दोमट मिट्टी (pH 6.0-7.0) फूलगोभी के लिए सबसे अच्छी है।\n2. संवेदनशीलता: यह जलवायु के प्रति बहुत संवेदनशील है; मौसम के अनुसार सही किस्म चुनें।\n3. तापमान: फूल बनने के लिए 15-20°C तापमान आवश्यक है; अधिक गर्मी से फूल 'बटन' जैसे छोटे हो जाते हैं।\n4. नर्सरी प्रबंधन: 5-6 सप्ताह पुराने स्वस्थ पौधों को ही खेत में लगाएं।\n5. रोपण: कतारों के बीच 60 सेमी और पौधों के बीच 45 सेमी की दूरी रखें।\n6. उर्वरक: 120 किलो नाइट्रोजन, 80 किलो फास्फोरस और 80 किलो पोटाश प्रति हेक्टेयर दें।\n7. मोलिब्डेनम की कमी: अम्लीय मिट्टी में 'व्हिपटेल' (Whiptail) रोग होता है; सोडियम मोलिब्डेट का उपयोग करें।\n8. ब्लांचिंग (Blanching): फूल को सीधा धूप से बचाने के लिए पत्तियों से ढंक दें ताकि वह सफेद रहे।\n9. सिंचाई: नियमित अंतराल पर पर्याप्त नमी बनाए रखें; फूल बनते समय पानी की कमी न होने दें।\n10. कीट प्रबंधन: माहू और गोभी की सूंडी के लिए नीम के तेल का प्रयोग करें।\n11. रोगों की रोकथाम: काली सड़न (Black Rot) के प्रति सावधान रहें; बीजोपचार अवश्य करें।\n12. कटाई: जब फूल ठोस और पर्याप्त आकार का हो जाए, तब डंठल सहित काटें।\n13. संभाल: फूलों पर दाग न पड़े, इसके लिए उन्हें सावधानी से टोकरियों में रखें।\n14. गुणवत्ता: केवल ठोस, मटमैलेपन से मुक्त और सफेद फूलों का ही चयन करें।\n15. कटाई के बाद: ताजगी बनाए रखने के लिए गोभी को जल्दी ठंडा करना (Pre-cooling) लाभदायक है।"
                    },
                    "carrot": {
                        "name": "गाजर",
                        "season": "रबी",
                        "desc": "विटामिन ए से भरपूर चटकीली जड़ों वाली सब्जी।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी, अच्छी जल निकासी वाली बलुई दोमट मिट्टी (pH 6.0-7.0) गाजर के लिए आदर्श है।\n2. जलवायु: 15-20°C तापमान में गाजर का रंग और स्वाद सबसे अच्छा होता है।\n3. भूमि की तैयारी: मिट्टी को 20-25 सेमी गहराई तक अच्छी तरह जोतें ताकि जड़ें सीधी बढ़ सकें।\n4. उन्नत किस्में: पूसा रुधिरा (लाल) या नैनटेस (Nantes) किस्मों का उपयोग करें।\n5. बुवाई विधि: बेहतर बढ़वार के लिए गाजर को मेढ़ों (Ridges) पर बोएं।\n6. बीज दर: 4-6 किलो प्रति हेक्टेयर; बीजों को रेत में मिलाकर समान रूप से बोएं।\n7. दूरी: मेढ़ों के बीच 30 सेमी और पौधों के बीच 5-10 सेमी की दूरी रखें।\n8. उर्वरक प्रबंधन: 60 किलो N, 40 किलो P और 100 किलो K प्रति हेक्टेयर की दर से खाद दें।\n9. विरलीकरण (Thinning): बुवाई के 20-30 दिन बाद घने पौधों को हटा दें ताकि जड़ें सही आकार ले सकें।\n10. जल प्रबंधन: नमी एक समान रखें; सूखा और फिर अधिक पानी देने से जड़ें फट (Splitting) सकती हैं।\n11. खरपतवार नियंत्रण: गाजर के पौधे शुरुआती दौर में धीरे बढ़ते हैं, इसलिए निराई बहुत महत्वपूर्ण है।\n12. कीट प्रबंधन: गाजर की मक्खी से बचाव के लिए खेत में स्वच्छता रखें।\n13. रोगों की रोकथाम: अल्टरनेरिया लीफ ब्लाइट से बचाव के लिए उचित कवकनाशी का प्रयोग करें।\n14. कटाई: जब जड़ें ऊपर से 2-3 सेमी मोटी हो जाएं, तब उन्हें खोदकर निकालें।\n15. भंडारण: कटाई के बाद पत्तियां तुरंत हटा दें और ठंडी जगह या गीली रेत में रखें।"
                    },
                    "brinjal": {
                        "name": "बैंगन",
                        "season": "रबी/खरीफ",
                        "desc": "विभिन्न प्रकार की किस्मों वाली बहुमुखी सब्जी।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छी जल निकासी वाली उपजाऊ दोमट मिट्टी बैंगन के लिए सर्वोत्तम है।\n2. जलवायु: यह गर्म जलवायु की फसल है (21-30°C); पाले के प्रति संवेदनशील है।\n3. किस्म चयन: मिट्टी और बाजार की मांग के अनुसार गोल या लंबे बैंगन का चयन करें।\n4. नर्सरी: बीजों को प्रो-ट्रे या नर्सरी बेड में बोएं और 30-35 दिन बाद रोपण करें।\n5. रोपण: किस्म के आधार पर 60x60 सेमी या 75x60 सेमी की दूरी पर पौधे लगाएं।\n6. उर्वरक: 100 किलो N, 80 किलो P और 60 किलो K प्रति हेक्टेयर दें।\n7. सिंचाई: नियमित सिंचाई करें लेकिन तने के पास पानी जमा न होने दें।\n8. मल्चिंग: खरपतवार रोकने और मिट्टी का तापमान बनाए रखने के लिए प्लास्टिक मल्च का उपयोग करें।\n9. कीट प्रबंधन: तना एवं फल छेदक प्रमुख समस्या है; फेरोमोन ट्रैप और प्रभावित टहनियों की छंटाई करें।\n10. रोग प्रबंधन: जीवाणु उकठा (Bacterial Wilt) के लिए प्रतिरोधी किस्में उगाएं।\n11. छंटाई: नीचे की पुरानी और पीली पत्तियों को हटा दें ताकि हवा का संचार बना रहे।\n12. सूक्ष्म पोषक तत्व: बैंगन की त्वचा में चमक के लिए जस्ता (Zinc) और मैंगनीज का प्रयोग करें।\n13. कटाई: जब फल चमकीले और ठोस हों (बीज कड़ा होने से पहले), तब तुड़ाई करें।\n14. पैदावार: नियमित तुड़ाई करने से पौधों में अधिक फल लगते रहते हैं।\n15. भंडारण: बैंगन को 10-12°C पर रखें; 5°C से कम तापमान पर ये खराब हो सकते हैं।"
                    },
                    "papaya": {
                        "name": "पपीता",
                        "season": "बारहमासी",
                        "desc": "तेजी से बढ़ने वाला और उच्च उपज देने वाला उष्णकटिबंधीय फल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अच्छी जल निकास वाली गहरी बलुई दोमट या जलोढ़ मिट्टी (pH 6.0-7.0) उत्तम है।\n2. जलवायु: उष्णकटिबंधीय जलवायु पसंद है; पाला और तेज हवाओं से बचाव जरूरी है।\n3. जल निकासी: पपीता जल भराव के प्रति अत्यंत संवेदनशील है; तना सड़न (Collar rot) का खतरा रहता है।\n4. किस्म: पूसा नन्हा, रेड लेडी या मधु बिंदु जैसी उन्नत किस्में लगाएं।\n5. गड्ढे तैयार करना: 45x45x45 सेमी के गड्ढे खोदें और 2x2 मीटर की दूरी रखें।\n6. रोपण: नर्सरी से 2 महीने पुराने स्वस्थ पौधों का चुनाव करें।\n7. उर्वरक: प्रति पौधा प्रति वर्ष 250 ग्राम N, 250 ग्राम P और 500 ग्राम K को 3-4 बार में दें।\n8. सिंचाई: नियमित पानी दें; ड्रिप सिंचाई (Drip irrigation) पपीते के लिए सबसे अच्छी है।\n9. फल विरलीकरण: यदि बहुत अधिक फल लगें हों, तो कुछ फलों को हटा दें ताकि शेष बड़े हो सकें।\n10. सहारा देना: छोटे पेड़ों को तेज हवा से बचाने के लिए डंडों का सहारा दें।\n11. कीट प्रबंधन: मिलीबग और मकड़ी के लिए साबुन के घोल या नीम तेल का छिड़काव करें।\n12. विषाणु रोग: पपीते का रिंग स्पॉट वायरस (PRSV) मुख्य समस्या है; प्रभावित पौधों को उखाड़कर नष्ट कर दें।\n13. लिंग अनुपात: जिन किस्मों में नर-मदा अलग होते हैं, वहां 10 मादा के लिए 1 नर पौधा रखें।\n14. कटाई: जब फल का छिलका हल्का पीला पड़ना शुरू हो जाए (Color break stage), तब तोड़ें।\n15. संभाल: फलों को अखबार या पुआल में लपेटकर रखें ताकि उन पर खरोंच न आए।"
                    },
                    "pomegranate": {
                        "name": "अनार",
                        "season": "बारहमासी",
                        "desc": "शुष्क क्षेत्रों के लिए उपयुक्त कठोर फल फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: अनार गहरी दोमट मिट्टी में अच्छा होता है; यह खारी और क्षारीय मिट्टी भी सहन कर सकता है।\n2. जलवायु: गर्म और शुष्क गर्मियां तथा ठंडी सर्दियां अनार के लिए सबसे अच्छी होती हैं।\n3. प्रवर्धन: अनार को कलम (Hard-wood cutting) या गुटी द्वारा लगाया जाता है।\n4. रोपण: 60x60x60 सेमी के गड्ढे खोदें और 4.5x4.5 मीटर या 5x5 मीटर की दूरी रखें।\n5. सधाई (Training): भारत में अनार को 3-4 तनों (Multi-stem system) पर बढ़ाना अच्छा माना जाता है।\n6. छंटाई (Pruning): सर्दियों में वार्षिक छंटाई करें; बेकार की टहनियों और 'सकर्स' को हटाते रहें।\n7. बहार प्रबंधन: आवश्यकतानुसार अम्बे बहार (जनवरी), मृग बहार (जून) या हस्त बहार (सितंबर) लें।\n8. सिंचाई: ड्रिप सिंचाई अनिवार्य है; पानी की मात्रा में एकदम से उतार-चढ़ाव न होने दें।\n9. फल फटना (Cracking): सिंचाई में निरंतरता रखें और बोरॉन का छिड़काव करें ताकि फल न फटें।\n10. उर्वरक: परिपक्व वृक्ष को 600 ग्राम N, 250 ग्राम P और 500 ग्राम K प्रति वर्ष दें।\n11. सूक्ष्म पोषक तत्व: सुहागा (Borax) और जिंक सल्फेट के छिड़काव से फलों की चमक बढ़ती है।\n12. कीट प्रबंधन: अनार की तितली (Anar Butterfly) मुख्य कीट है; फलों को जालीदार बैग से ढंकें।\n13. रोग प्रबंधन: तैलीय धब्बा रोग (Bacterial Blight) सबसे गंभीर है; इसके लिए स्ट्रेप्टोसाइक्लिन का छिड़काव करें।\n14. कटाई: अनार तब पकता है जब उसे थपथपाने पर धात्विक (Metallic) आवाज आए।\n15. भंडारण: अनार को 5°C पर 2 महीने तक सुरक्षित रखा जा सकता है।"
                    },
                    "coffee": {
                        "name": "कॉफी",
                        "season": "बारहमासी",
                        "desc": "छाया में उगाई जाने वाली उच्च मूल्य की बागवानी फसल।",
                        "guidelines": "व्यापक खेती के दिशा-निर्देश:\n1. मिट्टी: गहरी, भुरभुरी, कार्बनिक पदार्थों से भरपूर अम्लीय मिट्टी (pH 5.0-6.0)।\n2. जलवायु: उष्णकटिबंधीय (15-28°C); कॉफी को निश्चित शुष्क और गीले मौसम की आवश्यकता होती है।\n3. ऊंचाई: अरेबिका (1000-1500 मीटर) और रोबस्टा (500-1000 मीटर) की ऊंचाई पर उगाई जाती है।\n4. छाया प्रबंधन: कॉफी को हमेशा दो-स्तरी छाया (स्थायी और अस्थायी) के नीचे ही बोना चाहिए।\n5. भूमि की तैयारी: पहाड़ी ढलानों पर मिट्टी के कटाव को रोकने के लिए 'टेरेसिंग' (सीढ़ीनुमा खेती) करें।\n6. रोपण: 45x45x45 सेमी के गड्ढे खोदें; अरेबिका के लिए 2x2 मीटर और रोबस्टा के लिए 3x3 मीटर दूरी रखें।\n7. उर्वरक: मानसून से पहले और मानसून के बाद दो किस्तों में NPK खाद दें।\n8. छंटाई (Pruning): पौधे के आकार को बनाए रखने के लिए शीर्ष टहनी काटना (Topping) और सकर्स हटाना जरूरी है।\n9. ब्लॉसम शावर: फूल आने के लिए पहली बारिश या कृत्रिम सिंचाई (Blossom Showers) आवश्यक है।\n10. मल्चिंग: नए बागानों में नमी के संरक्षण के लिए मल्चिंग बहुत महत्वपूर्ण है।\n12. कीट प्रबंधन: कॉफी बेरी बोरर और सफेद तना छेदक के प्रति सतर्क रहें।\n13. रोग प्रबंधन: 'लीफ रस्ट' (Leaf Rust) से बचने के लिए सहनशील किस्में जैसे S-795 उगाएं।\n14.Picking: केवल पकी हुई लाल चेरी की ही तुड़ाई करें (Selective picking)।\n15. प्रोसेसिंग: सुखाने और नमी को 10-11% तक रखने से ही कॉफी की गुणवत्ता तय होती है।"
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
                "search_button": "தேடு",
                "no_data_found": "தரவு கிடைக்கவில்லை"
            },
            "dashboard": {
                "title": "பண்ணை மேலாண்மை",
                "subtitle": "உங்கள் விவசாயச் சொத்துக்களின் நிகழ்நேர மேலோட்டம்.",
                "add_crop": "புதிய பயிரைச் சேர்",
                "my_crops": "எனது பயிர்கள்",
                "verified": "சரிபார்க்கப்பட்ட விவசாயி",
                "location_details": "இருப்பிட விவரங்கள்",
                "not_set": "இருப்பிடம் அமைக்கப்படவில்லை",
                "details_not_set": "விவரங்கள் அமைக்கப்படவில்லை",
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
                    "humidity": "ஈரப்பதம்",
                    "rain_today": "இன்று மழை",
                    "none": "இல்லை",
                    "wind_speed": "காற்றின் வேகம்",
                    "tomorrow_rain": "நாளை மழை",
                    "chance": "{{percent}}% வாய்ப்பு",
                    "set_location": "வானிலை பார்க்க உங்கள் இருப்பிடத்தை அமைக்கவும்"
                },
                "ai_recommendation": {
                    "title": "பரிந்துரைகள்",
                    "desc": "{{district}} க்கான உள்ளூர் பகுப்பாய்வு மண் நிலமைகள் சீராக இருப்பதைக் காட்டுகிறது. சரியான வளர்ச்சிக்கு தற்போதைய {{crop}} மேலாண்மை திட்டத்தைத் தொடரவும்.",
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
                    "hyderabad": "ஹைதராபாத்",
                    "farmer": "விவசாயி"
                }
            },
            "home": {
                "hero_quote": "\"விவசாயத்தின் கண்டுபிடிப்பு நாகரிக வாழ்க்கையை நோக்கிய முதல் பெரிய அடி.\"",
                "hero_sub": "AI-இயக்கப்படும் நுண்ணறிவுகளுடன் விவசாயிகளை மேம்படுத்துதல்.",
                "crops_btn": "பயிர்கள்",
                "get_started": "தொடங்குங்கள்",
                "info_title": "திட்ட தகவல்",
                "info_desc": "AgriSmartAI என்பது AI மற்றும் ML இல் சமீபத்திய முன்னேற்றங்களுடன் விவசாயிகளை மேம்படுத்த வடிவமைக்கப்பட்ட நவீன தளம். எங்கள் அமைப்பு நிகழ்நேர நுண்ணறிவுகள், துல்லியமான பயிர் நோய் கண்டறிதல் மற்றும் தனிப்பயனாக்கப்பட்ட விவசாய ஆலோசனை வழங்குகிறது.",
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
            "crop_status": {
                "no_crops_title": "பயிர்கள் தேர்ந்தெடுக்கப்படவில்லை",
                "no_crops_message": "நீங்கள் இன்னும் எந்தப் பயிரையும் தேர்ந்தெடுக்கவில்லை. தயவுசெய்து உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்.",
                "boost_yield": "விளைச்சலை அதிகரிக்க",
                "prevention": "பாதுகாப்பு",
                "monitoring": "உங்கள் பயிரை கண்காணித்து வருகிறோம்...",
                "heavy_rain_threat": "கனமழை எதிர்பார்க்கப்படுகிறது",
                "heavy_rain_suggestion": "உரம் போடுவதைத் தள்ளிப்போடுங்கள்.",
                "high_temp_threat": "அதிக வெப்பநிலை எச்சரிக்கை",
                "high_temp_suggestion": "மாலை நேரத்தில் தண்ணீர் பாய்ச்சவும்.",
                "paddy_suggestion": "2-5 செ.மீ தேங்கிய நீரைப் பராமரிக்கவும்.",
                "cotton_suggestion": "வெள்ளை ஈ தாக்குதலைக் கண்காணிக்கவும்.",
                "prod_tip_default": "மண் வளத்தைப் பேண பயிர் சுழற்சி முறையைப் பின்பற்றவும்.",
                "prod_tip_paddy": "விளைச்சலை 15-20% அதிகரிக்க அசோலாவை உயிர் உரமாகப் பயன்படுத்தவும்.",
                "prod_tip_cotton": "அதிக விளைச்சலுக்கு அடர் நடவு முறையைச் செயல்படுத்தவும்.",
                "prod_tip_maize": "நைட்ரஜன் அளவை மேம்படுத்த சோயாபீனுடன் ஊடு பயிர் செய்யவும்.",
                "history_advice_default": "உள்ளூர் நிலவரப்படி தொடர்ந்து பூச்சி தாக்குதலைக் கண்காணிக்கவும்.",
                "history_advice_fungal": "முன்பு பூஞ்சை பாதிப்பு கண்டறியப்பட்டது. அதிக நைட்ரஜனைத் தவிர்த்து வயலை உலர வைக்கவும்.",
                "history_advice_pest": "முன்பு பூச்சி தாக்குதல் இருந்தது. இந்த பருவத்தின் தொடக்கத்திலேயே இனக்கவர்ச்சி பொறிகளை வைக்கவும்.",
                "history_advice_recurrence": "மீண்டும் வருவதைத் தடுக்கிறோம்: {{disease}}"
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
                "ai_label": "AgriSmart AI",
                "voice_unsupported": "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
                "start_listening": "குரல் உள்ளீட்டைத் தொடங்கவும்",
                "stop_listening": "கேட்பதை நிறுத்து"
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
                "market_contact": "சந்தை தொடர்பு",
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
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண் தேர்வு: நீர் தேங்கும் களிமண் அல்லது வண்டல் மண் நெல் சாகுபடிக்கு மிகவும் ஏற்றது (pH 5.5-6.5).\n2. நிலம் தயாரித்தல்: கோடை உழவு மேற்கொண்டு, தொழுவுரத்தை பரப்பி, நிலத்தை நன்கு சேறாக்க வேண்டும்.\n3. விதை நேர்த்தி: விதைகளை சூடோமோனாஸ் அல்லது அசோஸ்பைரில்லம் கொண்டு நேர்த்தி செய்வது அவசியம்.\n4. நாற்றங்கால்: நடவுக்கு 21-25 நாட்களுக்கு முன்பு நாற்றுகளைத் தயார் செய்ய வேண்டும்.\n5. நடவு முறை: வரிசை நடவு முறையைப் பின்பற்றுவது நல்ல காற்றோட்டத்திற்கும் களை மேலாண்மைக்கும் உதவும்.\n6. இடைவெளி: ரகத்தைப் பொறுத்து 20x15 செ.மீ அல்லது 20x10 செ.மீ இடைவெளி விட வேண்டும்.\n7. நீர் மேலாண்மை: நடவு செய்த முதல் வாரத்தில் 2 செ.மீ ஆழத்திற்கும், பின்னர் 5 செ.மீ ஆழத்திற்கும் நீர் நிறுத்த வேண்டும்.\n8. உரம்: மண் பரிசோதனைப்படி NPK உரங்களை இட வேண்டும்; தழைச்சத்தை மூன்று முறைகளாகப் பிரித்து இடவும்.\n9. களைக் கட்டுப்பாடு: நடவு செய்த 3-5 நாட்களில் களைக்கொல்லி இட வேண்டும் அல்லது கோனோ வீடர் பயன்படுத்தவும்.\n10. துத்தநாகக் குறைபாடு: இலைகள் துரு நிறமாக மாறினால் ஜிங்க் சல்பேட் தெளிக்க வேண்டும்.\n11. பூச்சி மேலாண்மை: தண்டு துளைப்பான் மற்றும் இலை சுருட்டுப் புழுவைக் கண்காணிக்க இனக்கவர்ச்சி பொறிகளை வைக்கவும்.\n12. நோய் கட்டுப்பாடு: குலை நோய் மற்றும் இலை கருகல் நோய்க்குத் தகுந்த பூசணக்கொல்லிகளைப் பயன்படுத்தவும்.\n13. கதிர் முதிர்ச்சி: கதிரில் 80% மணிகள் வைக்கோல் நிறமாக மாறும்போது நீர் பாய்ச்சுவதை நிறுத்த வேண்டும்.\n14. அறுவடை: கதிர்கள் நன்கு காய்ந்த பிறகு அறுவடை செய்யவும்.\n15. அறுவடைக்கு பின்: நெல்லை 14% ஈரப்பதம் வரும் வரை உலர்த்திச் சேமிக்க வேண்டும்."
                    },
                    "wheat": {
                        "name": "கோதுமை",
                        "season": "ரபி",
                        "desc": "கோதுமை நடுநிலை pH கொண்ட நன்கு வடிகட்டிய வண்டல் மண்ணில் சிறப்பாக வளரும்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: வளர்ச்சியின் போது குளிர்ந்த காலநிலையும் (10-20°C) முதிர்ச்சியின் போது வெயிலான காலநிலையும் தேவை.\n2. நிலம் தயாரித்தல்: நிலத்தை 3-4 முறை நன்கு உழுது, மண்ணைப் பொடி செய்து சமப்படுத்த வேண்டும்.\n3. விதைப்பு காலம்: நவம்பர் முதல் வாரம் விதைப்புக்கு மிகச் சிறந்த காலமாகும்.\n4. விதை அளவு: ஏக்கருக்கு சுமார் 40-50 கிலோ விதைகள் தேவைப்படும்.\n5. விதை நேர்த்தி: வேர் அழுகல் நோயைத் தடுக்க கார்பெண்டசிம் கொண்டு விதை நேர்த்தி செய்யவும்.\n6. விதைக்கும் முறை: விதைகளை 4-5 செ.மீ ஆழத்தில் வரிசையாக விதைக்க வேண்டும்.\n7. நீர் மேலாண்மை: முடிவளர்ச்சி பருவம் (CRI) மற்றும் பூக்கும் பருவத்தில் நீர் பாய்ச்சுவது மிக முக்கியம்.\n8. உரம்: 120:60:40 என்ற விகிதத்தில் NPK உரங்களை இட வேண்டும்.\n9. தழைச்சத்து மேலாண்மை: தழைச்சத்தை விதைக்கும் போதும், முதல் மற்றும் இரண்டாவது நீர் பாய்ச்சும் போதும் பிரித்து இடவும்.\n10. களை மேலாண்மை: விதைத்த 30-35 நாட்களில் களைகளைக் கட்டுப்படுத்த வேண்டும்.\n11. நுண்ணூட்டச் சத்து: துத்தநாகக் குறைபாட்டை நீக்க ஜிங்க் சல்பேட் பயன்படுத்தவும்.\n12. பூச்சி கட்டுப்பாடு: அசுவினி தாக்குதலைக் கண்காணிக்க மஞ்சள் ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.\n13. நோய் மேலாண்மை: துரு நோய் தாக்காமல் இருக்க கந்தகத் தூள் அல்லது பூசணக்கொல்லி தெளிக்கவும்.\n14. அறுவடை: இலைகள் மற்றும் கதிர்கள் நன்கு உலர்ந்து பொன்னிறமாகும்போது அறுவடை செய்யவும்.\n15. சேமிப்பு: தானியங்களை நன்கு உலர்த்தி 10-12% ஈரப்பதத்தில் சேமிக்க வேண்டும்."
                    },
                    "cotton": {
                        "name": "பருத்தி",
                        "season": "காரிஃப்",
                        "desc": "பருத்திக்கு ஆழமான, வளமான மண் மற்றும் வெப்பமான வெப்பநிலை தேவை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: ஆழமான களிமண் (கருப்பு மண்) பருத்திக்கு மிகவும் ஏற்றது, இது ஈரப்பதத்தை நன்கு தக்கவைக்கும்.\n2. விதைப்பு காலம்: பொதுவாக ஜூன் முதல் ஆகஸ்ட் வரை விதைப்பு செய்யலாம்.\n3. விதை நேர்த்தி: விதைகளை அமிலம் கொண்டு நேர்த்தி செய்து பஞ்சு ரோமங்களை நீக்க வேண்டும்.\n4. இடைவெளி: வீரிய ஒட்டு ரகங்களுக்கு 90x60 செ.மீ அல்லது 120x60 செ.மீ இடைவெளி தேவை.\n5. உரம்: பரிந்துரைக்கப்பட்ட NPK உரங்களுடன் ஏக்கருக்கு 5 டன் தொழுவுரம் இட வேண்டும்.\n6. மேலுரம்: பூக்கும் போது மற்றும் காய் பிடிக்கும் போது மேலுரம் இடுவது மகசூலை அதிகரிக்கும்.\n7. நீர் மேலாண்மை: காய் பிடிக்கும் பருவத்தில் வறட்சி ஏற்படாதவாறு நீர் பாய்ச்ச வேண்டும்.\n8. களைக் கட்டுப்பாடு: முதல் 2 மாதங்கள் களைகள் இல்லாமல் வைத்திருப்பது அவசியம்; பின்னர் மண் அணைத்தல் செய்யவும்.\n9. பூச்சி மேலாண்மை (IPM): காய்ப்புழு மற்றும் தத்துப்பூச்சிகளைக் கட்டுப்படுத்த இனக்கவர்ச்சி பொறிகளை வைக்கவும்.\n10. வேப்ப எண்ணெய்: இயற்கை முறையில் பூச்சிகளைக் கட்டுப்படுத்த வேப்ப எண்ணெய் தெளிக்கவும்.\n11. வளர்ச்சி ஊக்கி: சத்துக்கள் உதிர்வதைத் தடுக்க 'பிளானோபிக்ஸ்' போன்ற வளர்ச்சி ஊக்கிகளைப் பயன்படுத்தலாம்.\n12. நோய் கட்டுப்பாடு: இலைப்புள்ளி மற்றும் வாடல் நோயைக் கண்காணிக்கவும்.\n13. அறுவடை: நன்கு வெடித்த பருத்திப் பஞ்சுகளை காலை வேளையில் பறிப்பது சிறந்தது.\n14. தரம் பிரித்தல்: கறை படிந்த அல்லது உடைந்த இதழ்கள் கொண்ட பருத்தியைத் தனித்தனியாகப் பிரித்து வைக்கவும்.\n15. உலர்த்துதல்: பருத்தியை சூரிய ஒளியில் காய வைத்து ஈரப்பதத்தை அகற்ற வேண்டும்."
                    },
                    "maize": {
                        "name": "சோளம்",
                        "season": "காரிஃப்/ரபி",
                        "desc": "பல இந்திய காலநிலைகளுக்கு ஏற்ற பல்துறை பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: சோளம் 21°C முதல் 27°C வரையிலான வெப்பநிலையில் சிறப்பாக வளரும்.\n2. மண்: கரிமச் சத்துக்கள் நிறைந்த நன்கு வடிகட்டிய வண்டல் மண் சிறந்தது.\n3. விதைப்பு பருவம்: காரிஃப் (ஜூன்-ஜூலை) அல்லது ரபி (அக்டோபர்-நவம்பர்) மாதங்களில் பயிரிடலாம்.\n4. விதை அளவு: ஏக்கருக்கு சுமார் 8-10 கிலோ வீரிய ஒட்டு விதைகள் தேவை.\n5. இடைவெளி: 60x20 செ.மீ அல்லது 45x20 செ.மீ இடைவெளியைப் பின்பற்றலாம்.\n6. விதை நேர்த்தி: பூஞ்சான் கொல்லி மற்றும் ரைசோபியம் கொண்டு விதைகளை நேர்த்தி செய்யவும்.\n7. உரம்: சோளம் ஒரு ஊட்டச்சத்து அதிகம் தேவைப்படும் பயிர்; அதிக தழைச்சத்து இடுவது அவசியம்.\n8. நீர் மேலாண்மை: கதிர் வரும் பருவம் மற்றும் பால் பிடிக்கும் பருவம் நீர் பாசனத்திற்கு மிக முக்கியமானவை.\n9. களை மேலாண்மை: விதைத்த 3-வது நாளில் களைக்கொல்லி இடுவது மற்றும் கைக்களை எடுப்பது அவசியம்.\n10. பூச்சி மேலாண்மை: குருத்து ஈ மற்றும் தண்டு துளைப்பான் தாக்குதலைக் கவனிக்கவும்.\n11. படைப்புழு கட்டுப்பாடு: சமீபகாலமாக அதிகம் தாக்கும் 'படைப்புழு'வைக் கட்டுப்படுத்த வேப்பங்கொட்டை கரைசல் தெளிக்கவும்.\n12. மண் அணைத்தல்: செடிகள் 2 அடி வளர்ந்த பிறகு மண் அணைப்பது வேர் வளர்ச்சிக்கு உதவும்.\n13. அறுவடை: சோளக் கருதுகளின் மேலுறைகள் காய்ந்து, தானியங்கள் கடினமாக இருக்கும்போது அறுவடை செய்யவும்.\n14. உலர்த்துதல்: மணிகளைப் பிரித்த பிறகு சூரிய ஒளியில் 12% ஈரப்பதம் வரும் வரை உலர்த்தவும்.\n15. பதப்படுத்துதல்: பூச்சிகள் தாக்காமல் இருக்க சேமிப்புக் கிடங்குகளைத் தூய்மையாக வைத்திருக்கவும்."
                    },
                    "chilli": {
                        "name": "மிளகாய்",
                        "season": "ரபி/காரிஃப்",
                        "desc": "மிளகாய் நன்கு வடிகட்டிய செம்மண் நிலத்தை விரும்புகிறது.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நாற்றங்கால்: நிழலான இடத்தில் 40-45 நாட்கள் வயதுடைய ஆரோக்கியமான நாற்றுகளைத் தயார் செய்ய வேண்டும்.\n2. நிலம்: நன்கு உழுது, ஏக்கருக்கு 10 டன் தொழுவுரம் மற்றும் வேப்பம் புண்ணாக்கு இட வேண்டும்.\n3. நடவு: நாற்றுகளை மாலை வேளையில் 60x45 செ.மீ அல்லது 45x45 செ.மீ இடைவெளியில் நடவும்.\n4. நீர் மேலாண்மை: செடி வாடாத வகையில் அடிக்கடி லேசான நீர் பாசனம் செய்ய வேண்டும்.\n5. உரம்: பூக்கும் மற்றும் காய் பிடிக்கும் பருவங்களில் மேலுரமாக பொட்டாஷ் உரங்களை இடவும்.\n6. நுண் ஊட்டச்சத்து: பூக்கள் உதிர்வதைத் தடுக்க 'ட்ரைக்கோன்டால்' அல்லது நுண் ஊட்டச்சத்து கலவை தெளிக்கவும்.\n7. களைக் கட்டுப்பாடு: முதல் 2 மாதங்கள் வரை களைகளை நீக்கி செடியின் வேர் வளர்ச்சிக்கு மண் அணைக்கவும்.\n8. பூச்சி கட்டுப்பாடு: இலைப்பேன் மற்றும் வெள்ளை ஈ கட்டுப்படுத்த மஞ்சள் ஒட்டும் பொறிகளை வைக்கவும்.\n9. நோய் மேலாண்மை: சாம்பல் நோய் மற்றும் கருகல் நோய்க்குத் தகுந்த பூசணக்கொல்லிகளைப் பயன்படுத்தவும்.\n10. வைரஸ் நோய்: இலை சுருட்டு வைரஸைத் தவிர்க்க பூச்சிகளைக் கட்டுப்படுத்துவது அவசியம்.\n11. வளர்ச்சி ஊக்கி: பிளானோபிக்ஸ் தெளிப்பது காய் பிடிப்பதை அதிகரிக்கும்.\n12. காய் பறித்தல்: பச்சை மிளகாய்க்கு காய் நன்கு திரண்ட பிறகும், காய்ந்த மிளகாய்க்கு நன்கு பழுத்த பிறகும் பறிக்கவும்.\n13. காயவைத்தல்: மிளகாயை வெயிலில் காய வைக்கும்போது சிதறாமல் கவனமாகப் பரப்ப வேண்டும்.\n14. தரம் பிரித்தல்: பளபளப்பான சிவப்பு நிறம் கொண்ட மிளகாய்களைத் தனித்தனியாகப் பிரிப்பது அதிக லாபம் தரும்.\n15. சேமிப்பு: ஈரப்பதம் இல்லாத குளிர்ந்த இடங்களில் மிளகாயைச் சேமித்து வைக்கவும்."
                    },
                    "turmeric": {
                        "name": "மஞ்சள்",
                        "season": "காரிஃப்",
                        "desc": "சிறந்த மருத்துவ குணங்களைக் கொண்ட வாசனைப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண் தேர்வு: கரிமச் சத்து மிகுந்த நன்கு வடிகட்டிய வண்டல் மண் அல்லது செம்மண் நிலம் சிறந்தது.\n2. விதைப்பு காலம்: பொதுவாக மே-ஜூன் மாதங்கள் மஞ்சள் நடவுக்கு மிக ஏற்றது.\n3. விதை நேர்த்தி: கிழங்கு அழுகல் நோயைத் தவிர்க்க மேங்கோசெப் அல்லது கார்பெண்டசிம் கரைசலில் நனைத்து நடவும்.\n4. நடவு முறை: மேட்டுப் பாத்திகள் அமைத்து 30x15 செ.மீ அல்லது 45x15 செ.மீ இடைவெளியில் நடவு செய்ய வேண்டும்.\n5. விதை அளவு: ஏக்கருக்கு சுமார் 1000 கிலோ நன்கு முதிர்ந்த கிழங்குகள் தேவைப்படும்.\n6. உரம்: அதிக அளவு தொழுவுரம் மற்றும் பரிந்துரைக்கப்பட்ட NPK உரங்களை இட வேண்டும்.\n7. மூடாக்கு: நடவு செய்த உடனே இலைகளைக் கொண்டு மூடாக்கு இடுவது மண்ணின் ஈரப்பதத்தைப் பாதுகாக்கும்.\n8. நீர் மேலாண்மை: மண் வகையைப் பொறுத்து 7-10 நாட்களுக்கு ஒருமுறை நீர் பாசனம் செய்ய வேண்டும்.\n9. களை மேலாண்மை: மூன்று முறை களை எடுத்து, ஒவ்வொரு முறையும் செடிக்கு மண் அணைக்க வேண்டும்.\n10. பூச்சி மேலாண்மை: தண்டு துளைப்பானைக் கட்டுப்படுத்த வேப்பம் புண்ணாக்கு அல்லது மருந்துகளை இடவும்.\n11. நோய் கட்டுப்பாடு: இலைப்புள்ளி நோயைத் தடுக்கத் தகுந்த பூசணக்கொல்லிகளைத் தெளிக்கவும்.\n12. அறுவடை அறிகுறிகள்: 7-9 மாதங்களில் இலைகள் மஞ்சள் நிறமாகி காயத் தொடங்கும் போது அறுவடை செய்யலாம்.\n13. அறுவடை: கிழங்குகள் உடையாதவாறு நிலத்தைத் தோண்டி மஞ்சளைச் சேகரிக்க வேண்டும்.\n14. பதப்படுத்துதல்: மஞ்சளைச் சுடுநீரில் வேகவைத்து, பின்னர் வெயிலில் உலர்த்தி மெருகூட்ட வேண்டும்.\n15. சேமிப்பு: நன்கு உலர்ந்த மஞ்சளைக் குளிர்ந்த மற்றும் உலர்ந்த இடங்களில் சேமிக்கவும்."
                    },
                    "tomato": {
                        "name": "தக்காளி",
                        "season": "ரபி",
                        "desc": "நன்கு வடிகட்டிய மணல் கலந்த வண்டல் நிலத்திற்கு ஏற்றது.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நாற்றங்கால்: 25-30 நாட்கள் வயதுடைய வீரியமுள்ள நாற்றுகளைத் தயார் செய்ய வேண்டும்.\n2. நிலம் தயாரித்தல்: நிலத்தை நன்கு உழுது, ஏக்கருக்கு 10 டன் தொழுவுரம் மற்றும் சூப்பர் பாஸ்பேட் இட வேண்டும்.\n3. நடவு: நாற்றுகளை 60x45 செ.மீ அல்லது 60x60 செ.மீ இடைவெளியில் நடவு செய்ய வேண்டும்.\n4. முட்டுக்கொடுத்தல்: செடிகள் சாயாமல் இருக்க கம்பு அல்லது குச்சிகள் கொண்டு முட்டுக்கொடுப்பது மிகவும் அவசியம்.\n5. நீர் மேலாண்மை: பூக்கும் மற்றும் காய் பிடிக்கும் போது சீரான நீர் பாசனம் தேவை; தரை வழி நீர் பாசனம் சிறந்தது.\n6. உரம்: தழைச்சத்து மற்றும் பொட்டாஷ் உரங்களை இரண்டு அல்லது மூன்று முறை மேலுரமாக இட வேண்டும்.\n7. நுண் ஊட்டச்சத்து: பழம் வெடிப்பதைத் தவிர்க்க போராக்ஸ் 0.2% தெளிப்பது நல்லது.\n8. களைக் கட்டுப்பாடு: இரண்டு முறை களை எடுத்து மண் அணைக்க வேண்டும்.\n9. பூச்சி மேலாண்மை: காய்ப்புழுவைக் கட்டுப்படுத்த தக்காளி வயலைச் சுற்றி ஆமணக்கு அல்லது செண்டுமல்லி நடவும்.\n10. இலை சுருட்டு நோய்: வெள்ளை ஈ மூலம் பரவும் இந்நோயைத் தவிர்க்க மஞ்சள் ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.\n11. கருகல் நோய்: பூசணத் தாக்குதலைத் தவிர்க்க மேங்கோசெப் அல்லது காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.\n12. கவாத்து: அதிகப்படியான பக்கக் கிளைகளை நீக்குவது பழங்களின் அளவை அதிகரிக்கும்.\n13. அறுவடை: உள்ளூர் சந்தைக்கு எனில் நன்கு பழுத்த பிறகும், தூரத்து சந்தைக்கு எனில் பாதி பழுத்த நிலையிலும் பறிக்கவும்.\n14. தரம் பிரித்தல்: பழங்களை அளவு மற்றும் நிறத்திற்கு ஏற்ப தரம் பிரித்து கூடைகளில் அடுக்கவும்.\n15. சேமிப்பு: பழங்களை நிழலான மற்றும் காற்றோட்டமான இடங்களில் வைக்க வேண்டும்."
                    },
                    "sugarcane": {
                        "name": "கரும்பு",
                        "season": "பல்லாண்டு",
                        "desc": "அதிக நீர் தேவைப்படும் பயிர், வளமான வண்டல் மண்ணுக்கு ஏற்றது.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நிலம் தயாரித்தல்: நிலத்தை ஆழமாக உழுது, ஏக்கருக்கு 10 டன் தொழுவுரம் இட்டு பாத்திகள் அமைக்க வேண்டும்.\n2. கரும்பு கரணைகள்: நோய் இல்லாத 6-8 மாத வயதுடைய கரும்பு கரணைகளைப் பயன்படுத்த வேண்டும்.\n3. கரணை நேர்த்தி: கரணைகளை கார்பெண்டசிம் மற்றும் மாலத்தியான் கரைசலில் 15 நிமிடம் நனைத்து நட வேண்டும்.\n4. நடவு முறை: பார்களில் 90 செ.மீ முதல் 120 செ.மீ இடைவெளி விட்டு கரணைகளை நட வேண்டும்.\n5. விதை அளவு: ஏக்கருக்கு சுமார் 30,000 முதல் 40,000 இரண்டு கண் கரணைகள் தேவைப்படும்.\n6. நீர் மேலாண்மை: முளைப்புப் பருவம் மற்றும் வளர்ச்சிப் பருவத்தில் நீர் பாசனம் மிக முக்கியம்.\n7. உரம்: அதிக அளவு தழைச்சத்து தேவை; உரங்களை 30, 60 மற்றும் 90-வது நாட்களில் பிரித்து இடவும்.\n8. களை மேலாண்மை: ஆரம்ப 90 நாட்களுக்கு வயலை களைகள் இல்லாமல் வைத்திருக்க வேண்டும்.\n9. மண் அணைத்தல்: நட்ட 90-வது நாளில் ஒரு முறையும், 120-வது நாளில் ஒரு முறையும் மண் அணைக்க வேண்டும்.\n10. சோகை உரித்தல்: 5-வது மற்றும் 7-வது மாதங்களில் உலர்ந்த சோகைகளை உரித்து விடுவது காற்றோட்டத்தை அதிகரிக்கும்.\n11. செண்டு கட்டுதல்: கரும்பு சாய்வதைத் தவிர்க்க இரண்டு வரிசை கரும்புகளைச் சேர்த்து கட்டி விட வேண்டும்.\n12. பூச்சி மேலாண்மை: இடைக்கணு துளைப்பான் மற்றும் நுனித் துளைப்பான் தாக்குதலைக் கவனிக்கவும்.\n13. நோய் கட்டுப்பாடு: செவ்வழுகல் நோய் வராமல் இருக்க நோய் எதிர்ப்பு ரகங்களைப் பயன்படுத்தவும்.\n14. அறுவடை: கரும்பில் சர்க்கரைச் சத்து (Brix) 18-20% வரும்போது அறுவடை செய்ய வேண்டும்.\n15. கத்தி வெட்டு: கரும்பை தரைமட்டத்திற்கு வெட்டி எடுக்க வேண்டும், இது மறுதாம்பு பயிருக்கு உதவும்."
                    },
                    "groundnut": {
                        "name": "நிலக்கடலை",
                        "season": "காரிஃப்/ரபி",
                        "desc": "மண்ணில் தழைச்சத்தை நிலைப்படுத்தும் எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண் தேர்வு: மணல் கலந்த வண்டல் மண் அல்லது செம்மண் நிலம் நிலக்கடலைக்கு மிகவும் ஏற்றது.\n2. நிலம் தயாரித்தல்: நிலத்தை நன்கு உழுது, ஏக்கருக்கு 5 டன் தொழுவுரம் மற்றும் ஜிப்சம் இட வேண்டும்.\n3. விதைப்பு காலம்: காரிஃப் (ஜூன்-ஜூலை) அல்லது ரபி (டிசம்பர்-ஜனவரி) மாதங்களில் பயிரிடலாம்.\n4. விதை தேர்வு: நன்கு முதிர்ந்த, உடைக்கப்படாத பருப்புகளைத் தேர்வு செய்ய வேண்டும்.\n5. விதை நேர்த்தி: விதைகளை 'ட்ரைக்கோடெர்மா விரிடி' அல்லது கார்பெண்டசிம் கொண்டு நேர்த்தி செய்யவும்.\n6. இடைவெளி: 30x10 செ.மீ அல்லது 30x15 செ.மீ இடைவெளியைப் பின்பற்ற வேண்டும்.\n7. உரம்: 10:20:40 என்ற விகிதத்தில் NPK உரங்களுடன் நுண்ணூட்டச் சத்துக்களும் இட வேண்டும்.\n8. ஜிப்சம் மேலாண்மை: பூக்கும் பருவத்தில் (45-வது நாள்) ஏக்கருக்கு 200 கிலோ ஜிப்சம் இட்டு மண் அணைக்க வேண்டும்.\n9. நீர் மேலாண்மை: பூ கவ்வி மண்ணுக்குள் இறங்கும் பருவம் மற்றும் காய் பிடிக்கும் பருவத்தில் ஈரப்பதம் அவசியம்.\n10. களை மேலாண்மை: விதைத்த 25-வது நாளில் ஒரு கைக் களை எடுப்பது அவசியமாகும்.\n11. பூச்சி கட்டுப்பாடு: சுருள் பூச்சி மற்றும் வேர் புழு தாக்குதலைக் கவனிக்கவும்.\n12. நோய் மேலாண்மை: டிக்கா இலைப்புள்ளி நோயைக் கட்டுப்படுத்த பூசணக்கொல்லி தெளிக்கவும்.\n13. அறுவடை அறிகுறிகள்: இலைகள் மஞ்சள் நிறமாகி விழுவதும், காயின் உட்புறம் கருப்பாக மாறுவதும் அறுவடைக்கான அறிகுறியாகும்.\n14. அறுவடை முறை: நிலத்தில் போதிய ஈரப்பதம் இருக்கும்போது செடிகளை வேருடன் பிடுங்கி எடுக்க வேண்டும்.\n15. உலர்த்துதல் மற்றும் சேமிப்பு: காய்களை நன்கு உலர்த்தி 8-9% ஈரப்பதத்தில் சேமிக்க வேண்டும்."
                    },
                    "mustard": {
                        "name": "கடுகு",
                        "season": "ரபி",
                        "desc": "வட இந்தியாவின் முக்கிய எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: கடுகு பயிருக்கு 10°C முதல் 25°C வரையிலான குளிர்ந்த காலநிலை தேவை.\n2. மண்: நன்கு வடிகட்டிய வண்டல் மண் அல்லது களிமண் நிலம் ஏற்றது.\n3. விதைப்பு காலம்: செப்டம்பர் இறுதி முதல் அக்டோபர் வரை விதைப்பு செய்ய சிறந்தது.\n4. நிலம் தயாரித்தல்: நிலத்தைப் பொடி பட உழுது, சமப்படுத்தி பாத்திகள் அமைக்க வேண்டும்.\n5. விதை அளவு: ஏக்கருக்கு சுமார் 1.5 முதல் 2 கிலோ விதைகள் போதுமானது.\n6. விதை நேர்த்தி: பூஞ்சான் நோயைத் தவிர்க்க மருந்து கொண்டு நேர்த்தி செய்யவும்.\n7. விதைக்கும் முறை: 30 செ.மீ இடைவெளியில் வரிசையாக விதைத்து, பின் 10 செ.மீ இடைவெளியில் செடிகளைக் கலைக்க வேண்டும்.\n8. நீர் மேலாண்மை: பூக்கும் பருவத்திலும், காய் பிடிக்கும் பருவத்திலும் நீர் பாசனம் செய்வது மகசூலை அதிகரிக்கும்.\n9. உரம்: தழைச்சத்து, மணிச்சத்து மற்றும் சாம்பல் சத்துடன் கந்தகச் சத்து (Sulphur) இடுவது அவசியம்.\n10. களைக் கட்டுப்பாடு: முதல் 30-45 நாட்களில் ஒரு முறை களை எடுப்பது அவசியமாகும்.\n11. பூச்சி மேலாண்மை: அசுவினி தாக்குதலைக் கவனிக்கவும்; ஆரம்ப நிலையிலேயே வேப்ப எண்ணெய் தெளிக்கவும்.\n12. நோய் கட்டுப்பாடு: வெண்மை துரு நோய் மற்றும் இலைப்புள்ளி நோயைக் கண்காணிக்கவும்.\n13. அறுவடை: செடிகள் மற்றும் காய்கள் பொன்னிறமாக மாறும் போது அறுவடை செய்ய வேண்டும்.\n14. மணிகளைப் பிரித்தல்: அறுவடை செய்த செடிகளை நன்கு உலர்த்தி, பின் தடிகளால் அடித்து மணிகளைப் பிரிக்க வேண்டும்.\n15. சேமிப்பு: கடுகை நன்கு உலர்த்தி ஈரம் இல்லாத இடங்களில் சேமிக்கவும்."
                    },
                    "onion": {
                        "name": "வெங்காயம்",
                        "season": "ரபி/காரிஃப்",
                        "desc": "அனைத்து சமையலறைகளிலும் பயன்படுத்தப்படும் அத்தியாவசியப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நல்ல வடிகால் வசதியுள்ள வண்டல் மண் அல்லது செம்மண் நிலம் வெங்காயத்திற்கு ஏற்றது (pH 6.0-7.0).\n2. நாற்றங்கால்: 45-50 நாட்கள் வயதுடைய நாற்றுகளைத் தயார் செய்ய வேண்டும்.\n3. நிலம் தயாரித்தல்: நிலத்தை 3-4 முறை உழுது, ஏக்கருக்கு 10 டன் தொழுவுரம் இட வேண்டும்.\n4. நடவு முறை: பாத்திகளில் 15x10 செ.மீ இடைவெளியில் நாற்றுகளை நட வேண்டும்.\n5. நீர் மேலாண்மை: நடவு செய்தவுடன் ஒரு தண்ணீரும், பின் 3-7 நாட்களுக்கு ஒருமுறை தண்ணீரும் பாய்ச்ச வேண்டும்.\n6. உரம்: தழைச்சத்து, மணிச்சத்து மற்றும் சாம்பல் சத்தை பரிந்துரைக்கப்பட்ட அளவில் இட வேண்டும்.\n7. மேலுர மேலாண்மை: நட்ட 30-வது நாளில் தழைச்சத்தை மேலுரமாக இட வேண்டும்.\n8. களைக் கட்டுப்பாடு: வெங்காயத்தின் ஆரம்ப வளர்ச்சி நிலையில் 2 முறை களை எடுப்பது அவசியம்.\n9. பூச்சி மேலாண்மை: இலைப்பேன் தாக்குதலைக் கட்டுப்படுத்த தகுந்த மருந்துகளைத் தெளிக்கவும்.\n10. நோய் மேலாண்மை: ஊதா நிற இலைப்புள்ளி நோயைக் கண்காணிக்கவும்.\n11. காயின் தரம்: கந்தகச் சத்து (Sulphur) இடுவது வெங்காயத்தின் காரத்தன்மையை அதிகரிக்கும்.\n12. நீர் நிறுத்தம்: அறுவடைக்கு 10-15 நாட்களுக்கு முன்பே நீர் பாய்ச்சுவதை நிறுத்தி விட வேண்டும்.\n13. அறுவடை அறிகுறிகள்: 50% வெங்காயத் தாள்கள் சரிந்து கீழே விழும் போது அறுவடை செய்யலாம்.\n14. காயவைத்தல் (Curing): அறுவடை செய்த வெங்காயத்தை வயலிலேயே 3-4 நாட்கள் நிழலில் உலர்த்த வேண்டும்.\n15. சேமிப்பு: வெங்காயத்தைத் தரம் பிரித்து, நல்ல காற்றோட்டமுள்ள பரண்களில் சேமிக்கவும்."
                    },
                    "potato": {
                        "name": "உருளைக்கிழங்கு",
                        "season": "ரபி",
                        "desc": "உலகளவில் மிக முக்கியமான காய்கறிப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: உருளைக்கிழங்கிற்கு பகலில் 20-25°C மற்றும் இரவில் 15-20°C வெப்பநிலை தேவை.\n2. மண்: காற்றோட்டம் உள்ள மணல் கலந்த வண்டல் மண் மிகவும் சிறந்தது.\n3. விதைப்பு பருவம்: மலைப்பகுதிகளில் கோடையிலும், சமவெளி பகுதிகளில் குளிர்காலத்திலும் பயிரிடலாம்.\n4. விதை கிழங்குகள்: நோய் இல்லாத, முளைப்பு வந்த 40-50 கிராம் எடையுள்ள கிழங்குகளைப் பயன்படுத்தவும்.\n5. விதை நேர்த்தி: கிழங்குகளைப் பூசணக்கொல்லி கரைசலில் நனைத்து நட வேண்டும்.\n6. நடவு முறை: பார்களில் 45-60 செ.மீ இடைவெளியும், கிழங்குகளுக்கு இடையே 15-20 செ.மீ இடைவெளியும் இருக்க வேண்டும்.\n7. உரம்: அதிக அளவு தொழுவுரம் மற்றும் பரிந்துரைக்கப்பட்ட NPK உரங்களை இட வேண்டும்.\n8. மண் அணைத்தல்: நட்ட 30 மற்றும் 60-வது நாட்களில் கிழங்குகளுக்கு மேல் மண் அணைப்பது அவசியம்.\n9. நீர் மேலாண்மை: மண் எப்போதும் ஈரப்பகமாக இருக்குமாறு பார்த்துக் கொள்ள வேண்டும்.\n10. களை மேலாண்மை: மண் அணைக்கும் போது களைகளையும் சேர்த்து நீக்கி விட வேண்டும்.\n11. பூச்சி மேலாண்மை: உருளைக்கிழங்கு அந்துப்பூச்சி மற்றும் அசுவினிகளைக் கண்காணிக்கவும்.\n12. நோய் கட்டுப்பாடு: பின் கருகல் (Late blight) நோயைத் தவிர்க்கத் தகுந்த பூசணக்கொல்லிகளைத் தெளிக்கவும்.\n13. தாள்களைக் கிள்ளுதல் (Haulm cutting): அறுவடைக்கு 10 நாட்களுக்கு முன் தாள்களை வெட்டி விடுவது தோலை உறுதிப்படுத்தும்.\n14. அறுவடை: தாள்கள் காய்ந்த பிறகு கிழங்குகள் காயமடையாதவாறு கவனமாகத் தோண்டி எடுக்க வேண்டும்.\n15. சேமிப்பு: கிழங்குகளை நிழலில் உலர்த்தி, குளிர்ந்த கிடங்குகளில் சேமிக்க வேண்டும்."
                    },
                    "guava": {
                        "name": "கொய்யா",
                        "season": "பல்லாண்டு",
                        "desc": "வைட்டமின் சி நிறைந்த பழப்பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நிலம் தயாரித்தல்: குழிகளை 1x1x1 மீட்டர் அளவில் தோண்டி, மண் மற்றும் தொழுவுரம் கொண்டு நிரப்ப வேண்டும்.\n2. நடவு காலம்: ஜூன் முதல் டிசம்பர் வரை நடவு செய்ய ஏற்ற காலம்.\n3. இடைவெளி: 5x5 மீட்டர் அல்லது 6x6 மீட்டர் இடைவெளியைப் பின்பற்றலாம்.\n4. கவாத்து: செடியின் வடிவத்தைப் பராமரிக்கவும் புதிய கிளைகள் வளரவும் பிப்ரவரி அல்லது ஆகஸ்ட் மாதங்களில் கவாத்து செய்யவும்.\n5. நீர் மேலாண்மை: பழம் வளரும் காலங்களில் வழக்கமான நீர் பாசனம் அவசியம், குறிப்பாக கோடை காலத்தில்.\n6. உரம்: செடி ஒன்றுக்கு ஆண்டுக்கு 50 கிலோ தொழுவுரம் மற்றும் பரிந்துரைக்கப்பட்ட NPK உரங்களை இட வேண்டும்.\n7. மேலுர மேலாண்மை: உரங்களை ஜூன் மற்றும் அக்டோபர் மாதங்களில் இரண்டு முறையாகப் பிரித்து இடவும்.\n8. பூச்சி கட்டுப்பாடு: பழ ஈ முக்கிய பூச்சியாகும்; இதைக் கட்டுப்படுத்த இனக்கவர்ச்சி பொறிகளைப் பயன்படுத்தவும்.\n9. நோய் மேலாண்மை: வாடல் நோயைத் தவிர்க்க சூடோமோனாஸ் அல்லது ட்ரைக்கோடெர்மா விரிடி இட வேண்டும்.\n10. பயிற்சி செய்தல்: இளம் செடிகளை 60-90 செ.மீ உயரம் வரை ஒற்றைத் தண்டாக வளர்க்கப் பயிற்சி அளிக்கவும்.\n11. களை மேலாண்மை: வட்டப்பாத்திகளை எப்போதும் களைகள் இல்லாமல் சுத்தமாக வைத்திருக்க வேண்டும்.\n12. காய் பிடிப்பு: காய் பிடிப்பை அதிகரிக்க 0.3% போராக்ஸ் தெளிப்பது நல்லது.\n13. காய் மெலித்தல் (Fruit thinning): தரமான பழங்கள் கிடைக்க அதிகப்படியான பிஞ்சுகளை நீக்க வேண்டும்.\n14. அறுவடை: பழங்கள் கரும்பச்சை நிறத்திலிருந்து இளம் பச்சை அல்லது மஞ்சள் நிழலுக்கு மாறும் போது அறுவடை செய்யவும்.\n15. சேமிப்பு: பழங்களை அதிக அழுத்தம் இல்லாமல் கூடைகளில் அடுக்கி காற்றோட்டமான இடத்தில் வைக்கவும்."
                    },
                    "mango": {
                        "name": "மாம்பழம்",
                        "season": "பல்லாண்டு",
                        "desc": "பழங்களின் ராஜா, இந்தியாவின் முக்கிய ஏற்றுமதிப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. ரகம் தேர்வு: வணிக ரீதியிலான லாபத்திற்கு அல்போன்சா, பங்கனப்பள்ளி அல்லது மல்கோவா போன்ற ரகங்களைத் தேர்வு செய்யவும்.\n2. குழி தயாரித்தல்: பருவமழைக்கு முன் 1x1x1 மீட்டர் குழிகளைத் தோண்டி மண், தொழுவுரம் மற்றும் எலும்புத் தூள் கொண்டு நிரப்பவும்.\n3. நடவு: ஒட்டுச் செடிகளை ஜூன் முதல் அக்டோபர் வரை நடவு செய்யலாம்.\n4. இடைவெளி: ரகத்தைப் பொறுத்து 8x8 மீட்டர் முதல் 10x10 மீட்டர் இடைவெளி விட வேண்டும்.\n5. நீர் மேலாண்மை: முதல் 3 ஆண்டுகளில் மற்றும் பழம் வளரும் பருவங்களில் நீர் பாசனம் மிகவும் அவசியம்.\n6. ஊட்டச்சத்து: பூக்கள் மற்றும் பிஞ்சுகள் உதிர்வதைத் தடுக்க துத்தநாகம் மற்றும் போரான் பயன்படுத்த வேண்டும்.\n7. உரம்: மரங்களின் வயதுக்கு ஏற்ப NPK உரங்களை ஆண்டுக்கு ஒருமுறை பருவமழையின் தொடக்கத்தில் இடவும்.\n8. களைக் கட்டுப்பாடு: மரத்தைச் சுற்றி களைகளை எடுத்து எப்போதும் தூய்மையாக வைத்திருக்க வேண்டும்.\n9. பூச்சி மேலாண்மை: தத்துப்பூச்சி மற்றும் தண்டு துளைப்பான் தாக்குதலைக் கவனிக்கவும்.\n10. நோய் மேலாண்மை: சாம்பல் நோய் வராமல் இருக்கப் பூசணக்கொல்லி தெளிக்கவும்.\n11. கவாத்து: காய்ந்த மற்றும் நோயுற்ற கிளைகளை அவ்வப்போது நீக்கி சூரிய ஒளி நன்கு படுமாறு செய்ய வேண்டும்.\n12. பழம் வருதல்: நடவு செய்த 3-5 ஆண்டுகளில் காய்ப்புத் தொடங்கும்; 10 ஆண்டுகளுக்கு மேல் உச்ச மகசூல் கிடைக்கும்.\n13. அறுவடை முறை: பழங்களை காம்புடன் காயமடையாதவாறு வலையுடன் கூடிய நீண்ட தடியால் பறிக்க வேண்டும்.\n14. அறுவடைக்கு பின்: பழங்களை தரம் பிரித்து, பால் (sap) கறையாகாமல் இருக்க நன்கு கழுவிப் பராமரிக்கவும்.\n15. பழுக்க வைத்தல்: இயற்கையான முறையில் வைக்கோல் அல்லது காற்றோட்டமான பெட்டிகளில் வைத்துப் பழுக்க வைக்கவும்."
                    },
                    "banana": {
                        "name": "வாழை",
                        "season": "பல்லாண்டு",
                        "desc": "அதிக சத்துக்கள் கொண்ட வேகமாக வளரும் பழப்பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நடவுத் தேர்வு: ஆரோக்கியமான கிழங்குகளை அல்லது திசு வளர்ப்பு நாற்றுகளைப் பயன்படுத்த வேண்டும்.\n2. நிலம் தயாரித்தல்: நிலத்தை நன்கு உழுது, 45x45x45 செ.மீ குழிகள் எடுத்து இயற்கை உரமிட வேண்டும்.\n3. இடைவெளி: ரகத்தைப் பொறுத்து 1.8x1.8 மீட்டர் அல்லது 1.5x1.5 மீட்டர் இடைவெளியில் நடவும்.\n4. பக்கக் கன்றுகள் நீக்குதல்: தாய்ச் செடி நன்கு வளர அவ்வப்போது தோன்றும் பக்கக் கன்றுகளை நீக்க வேண்டும்.\n5. நீர் மேலாண்மை: வாழைக்கு அதிக நீர் தேவை; மண் ஈரப்பதமாக இருப்பதை எப்போதும் உறுதி செய்யவும்.\n6. உரம்: பொட்டாசியம் சத்து அதிகம் தேவை; நடவு செய்த 3-வது மாதத்திலிருந்து உரமிடவும்.\n7. மேலுர மேலாண்மை: உரங்களை நான்கு அல்லது ஐந்து முறைகளாகப் பிரித்து இட வேண்டும்.\n8. மூடாக்கு: ஈரப்பதம் காக்க காய்ந்த இலைகளைக் கொண்டு மூடாக்கு இடலாம்.\n9. முட்டுக்கொடுத்தல்: குலை தள்ளிய பிறகு மரம் சாய்வதைத் தவிர்க்க மூங்கில் அல்லது கயிறு கொண்டு முட்டுக்கொடுக்கவும்.\n10. நோய் மேலாண்மை: வாடல் நோய் மற்றும் சிிகடோகா இலைப்புள்ளி நோயைக் கண்காணிக்கவும்.\n11. பூச்சி கட்டுப்பாடு: கிழங்கு வண்டு மற்றும் தண்டு துளைப்பானைக் கட்டுப்படுத்த வேப்பம் புண்ணாக்கு இடவும்.\n12. மொக்கு நீக்கம் (Denavelling): குலை முழுமையாகத் தள்ளிய பிறகு நுனி மொக்கை நீக்குவது பழங்களின் வளர்ச்சியைத் தூண்டும்.\n13. பூ பூக்கும் காலம்: பொதுவாக 7-9 மாதங்களில் வாழை பூக்கத் தொடங்கும்.\n14. அறுவடை: பழத்தின் கோணங்கள் மறைந்து உருண்டையாக மாறும் போது குலையை அறுவடை செய்யவும்.\n15. அறுவடைக்கு பின்: குலைகளைக் காயமடையாமல் காற்றோட்டமான நிழலான இடங்களில் வைக்கவும்."
                    },
                    "grapes": {
                        "name": "திராட்சை",
                        "season": "பல்லாண்டு",
                        "desc": "உணவு மற்றும் ஒயின் தயாரிக்கப் பயிரிடப்படும் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நிலம்: நன்கு வடிகட்டிய மணல் கலந்த வண்டல் மண் சிறந்தது; சுண்ணாம்புச் சத்து இருப்பது நல்லது.\n2. பந்தல் முறை: நல்ல காற்று ஓட்டத்திற்கும் அறுவடைக்கும் வசதியாக பந்தல் முறையைப் பின்பற்றவும்.\n3. கவாத்து: விளைச்சலுக்கு அக்டோபர் மாதத்திலும், வளர்ச்சிக்கு ஏப்ரல் மாதத்திலும் கவாத்து செய்வது மிகவும் முக்கியம்.\n4. நடவு காலம்: ஜூன்-ஜூலை அல்லது டிசம்பர்-ஜனவரி மாதங்களில் நடவு செய்யலாம்.\n5. ஊட்டச்சத்து: பழங்கள் வளரும் போது பொட்டாஷ் மற்றும் மெக்னீசியம் சத்துக்கள் அதிகம் தேவை.\n6. நீர் மேலாண்மை: பூக்கும் போது நீர் பாசனத்தைக் குறைத்து, பழம் வளரும் போது அதிகரிக்க வேண்டும்.\n7. உரம்: பரிந்துரைக்கப்பட்ட உரங்களை கவாத்து செய்த உடனே இட வேண்டும்.\n8. களைத் தடுப்பு: பந்தலுக்குக் கீழுள்ள நிலப்பரப்பை எப்போதும் சுத்தமாக வைத்திருக்க வேண்டும்.\n9. நோய் மேலாண்மை: சாம்பல் நோய் மற்றும் அடிச்சாம்பல் நோயைத் தடுக்க போர்டோ கலவை தெளிக்கவும்.\n10. பூச்சி கட்டுப்பாடு: இலைச் சுருட்டுப் புழு மற்றும் வண்டுகளைக் கண்காணிக்கவும்.\n11. பழத் தரம்: பழங்கள் ஒரே சீராகப் பழுக்க ஜிப்ரலிக் அமிலம் (GA3) சிகிச்சையைப் பயன்படுத்தலாம்.\n12. பறவை பாதுகாப்பு: பழங்கள் பழுக்கும் போது பறவைகளிடமிருந்து காக்க வலைகளைப் பயன்படுத்தவும்.\n13. அறுவடை: திராட்சை செடியிலேயே நன்கு பழுத்த பிறகு அறுவடை செய்யவும், ஏனெனில் அது பறித்த பிறகு பழுக்காது.\n14. அறுவடை நேரம்: அதிகாலை அல்லது மாலை வேளைகளில் பழங்களை அறுவடை செய்வது புத்துணர்ச்சியைப் பாதுகாக்கும்.\n15. பேக்கிங்: பழங்களைச் சிறிய பெட்டிகளில் அடுக்கி, காயமடையாமல் சந்தைக்கு அனுப்பவும்."
                    },
                    "ginger": {
                        "name": "இஞ்சி",
                        "season": "காரிஃப்",
                        "desc": "மண்ணிற்கு அடியில் வளரும் வாசனைப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: கிழங்கு வளர்ச்சிக்கு அதிக கரிமச் சத்து கொண்ட நன்கு வடிகட்டிய மணல் கலந்த வண்டல் மண் அவசியம்.\n2. நடவு: ஆரோக்கியமான கிழங்குத் துண்டுகளை மே-ஜூன் மாதங்களில் பருவமழையின் தொடக்கத்தில் நடவும்.\n3. விதை நேர்த்தி: கிழங்குகளை மாங்கோசெப் கரைசலில் நனைத்து நடவு செய்வது அழுகல் நோயைத் தடுக்கும்.\n4. நடவு முறை: மேட்டுப் பாத்திகள் அமைத்து 20-25 செ.மீ இடைவெளியில் நடவு செய்ய வேண்டும்.\n5. மூடாக்கு: ஈரப்பதத்தைத் தக்கவைக்கவும் களைகளைக் கட்டுப்படுத்தவும் இலைகளைக் கொண்டு அதிக மூடாக்கு இடவும்.\n6. மேல் மூடாக்கு: 45 மற்றும் 90-வது நாட்களில் மீண்டும் மூடாக்கு இடுவது மகசூலை அதிகரிக்கும்.\n7. உரம்: அதிக அளவு தொழுவுரம் மற்றும் பரிந்துரைக்கப்பட்ட உரங்களை மண் அணைக்கும் போது இடவும்.\n8. நீர் மேலாண்மை: மழைக் காலங்களில் வடிகால் வசதி முக்கியம்; கோடையில் சீரான பாசனம் தேவை.\n9. களை மேலாண்மை: முளைப்பு வந்த 60-வது மற்றும் 90-வது நாட்களில் கைக் களை எடுக்க வேண்டும்.\n10. பூச்சி மேலாண்மை: தண்டு துளைப்பானைக் கட்டுப்படுத்த தகுந்த பூச்சிக்கொல்லிகளைப் பயன்படுத்தவும்.\n11. நோய் கட்டுப்பாடு: மென் அழுகல் நோயைத் தவிர்க்கத் தொடக்கத்திலேயே நடவடிக்கை எடுக்கவும்.\n12. பயிர் சுழற்சி: கிழங்கு அழுகல் நோயைத் தவிர்க்க இஞ்சிக்குப் பிறகு மற்ற கிழங்குப் பயிர்களைப் பயிரிடுவதைத் தவிர்க்கவும்.\n13. அறுவடை அறிகுறிகள்: 8-9 மாதங்களுக்குப் பிறகு இலைகள் மஞ்சள் நிறமாகி காய்ந்த பிறகு அறுவடை செய்யலாம்.\n14. காயவைத்தல்: இஞ்சியைத் தோண்டி எடுத்த பிறகு மண்ணைச் சுத்தம் செய்து நிழலில் உலர்த்த வேண்டும்.\n15. பதப்படுத்துதல்: சுக்கு தயாரிக்க இஞ்சியின் மேல் தோலை உரித்துச் சுண்ணாம்பு நீரில் நனைத்து உலர்த்த வேண்டும்."
                    },
                    "garlic": {
                        "name": "பூண்டு",
                        "season": "ரபி",
                        "desc": "சிறந்த மணம் கொண்ட பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: வளமான வண்டல் மண் சிறந்தது; களிமண் நிலத்தைத் தவிர்க்கவும், அது கிழங்கு வளர்ச்சியைத் தடுக்கும்.\n2. நிலம் தயாரித்தல்: நிலத்தை நன்கு உழுது, ஏக்கருக்கு 10 டன் தொழுவுரம் மற்றும் வேப்பம் புண்ணாக்கு இட வேண்டும்.\n3. நடவு காலம்: அக்டோபர் முதல் நவம்பர் வரை பயிரிட ஏற்ற காலம்.\n4. விதை தேர்வு: பெரிய மற்றும் ஆரோக்கியமான பூண்டுப் பற்களைத் தேர்வு செய்யவும்.\n5. நடவு முறை: தனித்தனிப் பூண்டுகளை 15x10 செ.மீ இடைவெளியில் நுனிப்பகுதி மேலே இருக்குமாறு நடவும்.\n6. காலநிலை: பூண்டு திரளத் தொடங்க குளிர் காலமும் முதிர்ச்சி அடைய வறண்ட காலமும் தேவை.\n7. நீர் மேலாண்மை: முளைக்கும் பருவம் மற்றும் கிழங்கு திரளும் பருவத்தில் சீரான ஈரப்பதம் அவசியம்.\n8. உரம்: தழைச்சத்தை இரண்டு அல்லது மூன்று முறையாகப் பிரித்து இடவும்; அதிக தாமதமாக இடுவதைத் தவிர்க்கவும்.\n9. களைக் கட்டுப்பாடு: பூண்டு பயிரில் களை எடுப்பது மிகவும் அவசியம்; இது வேர் வளர்ச்சிக்கு உதவும்.\n10. பூச்சி மேலாண்மை: இலைப்பேன் தாக்குதலைக் கட்டுப்படுத்த தகுந்த பூச்சிக்கொல்லிகளைப் பயன்படுத்தவும்.\n11. நோய் கட்டுப்பாடு: இலை கருகல் நோயைத் தவிர்க்கப் பூசணக்கொல்லி தெளிக்கவும்.\n12. நீர் நிறுத்தம்: அறுவடைக்கு 15 நாட்களுக்கு முன்பே நீர் பாய்ச்சுவதை நிறுத்தி விட வேண்டும்.\n13. அறுவடை அறிகுறிகள்: கீழ் இலைகள் 50-75% மஞ்சள் நிறமாக மாறும் போது அறுவடை செய்யலாம்.\n14. காயவைத்தல்: அறுவடை செய்த பூண்டுகளை வயலிலேயே 2-3 நாட்கள் உலர்த்தி, பின் நிழலில் தொங்கவிட்டு உலர்த்தவும்.\n15. சேமிப்பு: உலர்ந்த பூண்டுகளைக் காற்றோட்டமான இடங்களில் சேமிக்கவும்; ஈரப்பதம் இல்லாமல் பார்த்துக் கொள்ளவும்."
                    },
                    "soybean": {
                        "name": "சோயாபீன்",
                        "season": "காரிஃப்",
                        "desc": "அதிக புரதம் கொண்ட எண்ணெய் வித்துப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நன்கு வடிகட்டிய வண்டல் மண் சிறந்தது; நீர் தேங்கும் நிலத்தைத் தவிர்க்கவும்.\n2. விதை நேர்த்தி: தழைச்சத்தை நிலைப்படுத்த விதைகளை ரைசோபியம் மற்றும் பூஞ்சாணக்கொல்லி கொண்டு நேர்த்தி செய்யவும்.\n3. விதைப்பு காலம்: ஜூன்-ஜூலை (காரிஃப்) அல்லது அக்டோபர்-நவம்பர் (ரபி) மாதங்களில் பயிரிடலாம்.\n4. விதை அளவு: ஏக்கருக்கு சுமார் 25-30 கிலோ விதைகள் தேவைப்படும்.\n5. இடைவெளி: 45x10 செ.மீ அல்லது 30x10 செ.மீ இடைவெளியில் வரிசையாக விதைக்கவும்.\n6. உரம்: 10:20:20 என்ற விகிதத்தில் NPK உரங்களுடன் கந்தகச் சத்து (Sulphur) இடுவது அவசியம்.\n7. களை மேலாண்மை: களைகள் விளைச்சலை 50% வரை குறைக்கலாம், எனவே ஆரம்பத்திலேயே களைக்கொல்லிகளைப் பயன்படுத்தவும்.\n8. நீர் மேலாண்மை: பூக்கும் மற்றும் காய் பிடிக்கும் பருவங்களில் நீர் பாசனம் மகசூலை அதிகரிக்கும்.\n9. பூச்சி மேலாண்மை: புரோடீனியா புழு மற்றும் அசுவினிகளைக் கண்காணிக்கவும்.\n10. நோய் கட்டுப்பாடு: வேர் அழுகல் மற்றும் மஞ்சள் தேமல் நோயைக் கண்காணிக்கவும்.\n11. மண் அணைத்தல்: விதைத்த 30-வது நாளில் மண் அணைப்பது செடி சாயாமல் இருக்க உதவும்.\n12. நுண்ணூட்டச் சத்து: மகசூல் அதிகரிக்க 0.5% துத்தநாக சல்பேட் தெளிக்கலாம்.\n13. அறுவடை அறிகுறிகள்: இலைகள் மஞ்சள் நிறமாகி விழுந்து, காய்கள் பழுப்பு நிறமாக மாறும்போது அறுவடை செய்யவும்.\n14. அறுவடை முறை: செடிகளை வேருடன் பிடுங்கி அல்லது அறுத்து உலர்த்த வேண்டும்.\n15. சேமிப்பு: விதைகளை நன்கு உலர்த்தி 9% ஈரப்பதத்தில் சேமிக்கவும்."
                    },
                    "chickpea": {
                        "name": "கொண்டைக்கடலை",
                        "season": "ரபி",
                        "desc": "புரதச் சத்து நிறைந்த முக்கிய பருப்பு வகை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: வளர்ச்சிக்கு குளிர்ந்த காலநிலையும் (15-20°C), காய் பிடிக்க வெப்பமான காலநிலையும் தேவை.\n2. மண்: நன்கு வடிகட்டிய வண்டல் மண் அல்லது செம்மண் நிலம் சிறந்தது; உவர் நிலங்களைத் தவிர்க்கவும்.\n3. நிலம் தயாரித்தல்: நிலத்தை நன்கு உழுது, ஏக்கருக்கு 5 டன் தொழுவுரம் மற்றும் ஜிப்சம் இட வேண்டும்.\n4. விதை நேர்த்தி: ரைசோபியம் மற்றும் பூஞ்சாணக்கொல்லி கொண்டு விதை நேர்த்தி செய்வது அவசியம்.\n5. விதைப்பு காலம்: அக்டோபர் முதல் நவம்பர் வரை விதைக்க ஏற்ற காலம்.\n6. இடைவெளி: 30x10 செ.மீ இடைவெளியைப் பின்பற்ற வேண்டும்.\n7. நுனி கிள்ளுதல் (Nipping): அதிக கிளைகள் வளர விதைத்த 30-45 நாட்களில் நுனிப்பகுதியை கிள்ளவும்.\n8. நீர் மேலாண்மை: வறட்சியைத் தாங்கும் பயிர் என்றாலும், பூக்கும் போதும் காய் பிடிக்கும் போதும் நீர் பாய்ச்சுவது நல்லது.\n9. உரம்: தழைச்சத்து மற்றும் மணிச்சத்து உரங்களை விதைக்கும் போதே இட வேண்டும்.\n10. பூச்சி கட்டுப்பாடு: காய்ப்புழுவைத் தவிர்க்க இனக்கவர்ச்சி பொறிகளை மற்றும் வேப்ப எண்ணெய் பயன்படுத்தவும்.\n11. நோய் மேலாண்மை: வாடல் நோயைத் தவிர்க்க நோய் எதிர்ப்பு ரகங்களைப் பயன்படுத்தவும்.\n12. களை மேலாண்மை: ஆரம்ப நிலையில் கைக்களை எடுப்பது வேர் வளர்ச்சிக்கு உதவும்.\n13. அறுவடை அறிகுறிகள்: செடிகள் மஞ்சள் நிறமாகி, காய்கள் காய்ந்த நிலைக்கு வரும்போது அறுவடை செய்யலாம்.\n14. அறுவடை முறை: செடிகளைப் பிடுங்கி நன்கு உலர்த்திய பின் மணிகளைப் பிரிக்க வேண்டும்.\n15. சேமிப்பு: பருப்புகளை நன்கு காய வைத்து 10% ஈரப்பதத்தில் சேமிக்கவும்."
                    },
                    "black_gram": {
                        "name": "உளுந்து",
                        "season": "காரிஃப்/ரபி",
                        "desc": "ஊட்டச்சத்து நிறைந்த பயறு வகை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: களிமண் அல்லது வண்டல் மண் உளுந்து சாகுபடிக்கு ஏற்றது; நல்ல வடிகால் வசதி இருக்க வேண்டும்.\n2. நிலம் தயாரித்தல்: நிலத்தை 2-3 முறை உழுது சமப்படுத்த வேண்டும்.\n3. விதை நேர்த்தி: விதைகளை ரைசோபியம் மற்றும் பாஸ்போ பாக்டீரியா கொண்டு நேர்த்தி செய்யவும்.\n4. விதைப்பு பருவம்: காரிஃப் (ஜூன்-ஜூலை) அல்லது ரபி (ஜனவரி-பிப்ரவரி) மாதங்களில் பயிரிடலாம்.\n5. இடைவெளி: 30x10 செ.மீ இடைவெளியைப் பின்பற்ற வேண்டும்.\n6. ஊடுபயிர்: சோளம் அல்லது பருத்தியுடன் ஊடுபயிராகவும் பயிரிடலாம்.\n7. உரம்: 10:20:10 என்ற விகிதத்தில் NPK உரங்களை இட வேண்டும்.\n8. இலை வழி உரமிடுதல்: பூக்கும் பருவத்தில் 2% டி.ஏ.பி (DAP) தெளிப்பது மகசூலை அதிகரிக்கும்.\n9. நீர் மேலாண்மை: பூக்கும் மற்றும் காய் பிடிக்கும் பருவங்களில் வறட்சி ஏற்படாமல் நீர் பாய்ச்ச வேண்டும்.\n10. நோய் மேலாண்மை: மஞ்சள் தேமல் நோயைக் (YMV) கண்காணிக்கவும்; வெள்ளை ஈயைக் கட்டுப்படுத்தவும்.\n11. பூச்சி கட்டுப்பாடு: அசுவினி மற்றும் காய்ப்புழு தாக்குதலைக் கவனிக்கவும்.\n12. களை மேலாண்மை: விதைத்த 20-25 நாட்களில் ஒரு முறை களை எடுப்பது அவசியமாகும்.\n13. அறுவடை அறிகுறிகள்: 80% காய்கள் கருப்பு நிறமாக மாறும்போது அறுவடை செய்ய வேண்டும்.\n14. அறுவடை முறை: காய்களை மட்டும் பறிக்கலாம் அல்லது செடியுடன் அறுவடை செய்யலாம்.\n15. சேமிப்பு: மணிகளை நன்கு உலர்த்தி 9-10% ஈரப்பதத்தில் சேமிக்கவும்."
                    },
                    "green_gram": {
                        "name": "பாசிப்பயறு",
                        "season": "காரிஃப்/ரபி",
                        "desc": "எளிதில் செரிமானம் ஆகக்கூடிய பயறு வகை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நன்கு வடிகட்டிய வண்டல் மண் அல்லது செம்மண் நிலம் ஏற்றது (pH 6.5-7.5).\n2. நிலம் தயாரித்தல்: நிலத்தைப் பொடி பட உழுது ஏக்கருக்கு 5 டன் தொழுவுரம் இட வேண்டும்.\n3. விதை நேர்த்தி: ரைசோபியம் கல்ச்சர் கொண்டு விதை நேர்த்தி செய்வது வேர் முடிச்சுகள் பெருக உதவும்.\n4. விதைப்பு காலம்: காரிஃப் (ஜூன்) மற்றும் கோடை (மார்ச்-ஏப்ரல்) பயிராகப் பயிரிடலாம்.\n5. இடைவெளி: 30x10 செ.மீ இடைவெளியைப் பின்பற்றவும்.\n6. உரம்: மணிச்சத்து உரங்களை விதைக்கும் போதே இட வேண்டும்.\n7. இலை வழி உரம்: 2% டி.ஏ.பி கரைசலை பூக்கும் பருவம் மற்றும் 15 நாள் கழித்துத் தெளிக்கவும்.\n8. நீர் மேலாண்மை: பாசிப்பயறு வறட்சியைத் தாங்கும் என்றாலும், முக்கியமான வளர்ச்சி நிலைகளில் நீர் தேவை.\n9. களை மேலாண்மை: 20-வது நாளில் களை எடுத்து மண் அணைக்க வேண்டும்.\n10. நோய் மேலாண்மை: மஞ்சள் தேமல் நோய் வராமல் இருக்க நோய் எதிர்ப்பு ரகங்களைத் தேர்வு செய்யவும்.\n11. பூச்சி மேலாண்மை: அசுவினி மற்றும் இலைப்பேன் தாக்குதலைக் கண்காணிக்கவும்.\n12. தண்டு அழுகல்: நீர் தேங்குவதைத் தவிர்ப்பது தண்டு அழுகல் நோயைத் தடுக்கும்.\n13. அறுவடை அறிகுறிகள்: காய்கள் நன்கு உலர்ந்து கருப்பு அல்லது பழுப்பு நிறமாக மாறும் போது அறுவடை செய்யவும்.\n14. அறுவடை முறை: காய்கள் வெவ்வேறு நேரங்களில் முதிர்வதால், இரண்டு அல்லது மூன்று முறை பறிக்க வேண்டியிருக்கும்.\n15. சேமிப்பு: மணிகளை நன்கு காய வைத்து ஈரம் இல்லாத கோணிகளில் சேமிக்கவும்."
                    },
                    "tea": {
                        "name": "தேயிலை",
                        "season": "பல்லாண்டு",
                        "desc": "உலகின் மிகவும் பிரபலமான பானப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: அதிக ஈரப்பதம், அதிக மழை (150-300 செ.மீ) மற்றும் 20-30°C வெப்பநிலை தேவை.\n2. மண்: 4.5-5.5 pH கொண்ட அமிலத்தன்மை வாய்ந்த கரிமச் சத்துக்கள் நிறைந்த மண் சிறந்தது.\n3. நிலம் தேர்வு: மலைச்சரிவுகளில் பயிரிடுவது நீர் தேங்குவதைத் தவிர்க்க உதவும்.\n4. நடவு முறை: விதைப் செடிகள் அல்லது தண்டுத் துண்டுகள் மூலம் நடவு செய்யலாம்.\n5. இடைவெளி: ரகத்தைப் பொறுத்து 105x60 செ.மீ அல்லது 120x60 செ.மீ இடைவெளியில் நடவும்.\n6. கவாத்து: செடிகளை 1-1.5 மீட்டர் உயரத்தில் பராமரிக்கவும் புதிய தளிர் வரவும் அவ்வப்போது கவாத்து செய்ய வேண்டும்.\n7. மேலுரம்: தழைச்சத்து மற்றும் பொட்டாஷ் உரங்களை ஆண்டுக்கு மூன்று அல்லது நான்கு முறைகளாகப் பிரிக்கி இட வேண்டும்.\n8. நிழல் மேலாண்மை: நிலத்தின் ஈரப்பத்தைப் பாதுகாக்க நிழல் தரும் மரங்களை (எ.கா. வெள்ளி ஓக்) நடவும்.\n9. நீர் மேலாண்மை: வறண்ட காலங்களில் தெளிப்பு நீர் பாசனம் (Sprinkler) செய்வது நல்லது.\n10. களைக் கட்டுப்பாடு: தேயிலைத் தோட்டத்தை எப்போதும் களைகள் இல்லாமல் சுத்தமாக வைத்திருக்க வேண்டும்.\n11. நுனி கிள்ளுதல் (Tipping): கவாத்து செய்த பிறகு புதிய தளிர்கள் ஒரே சீராக வளர முனைகளைக் கிள்ள வேண்டும்.\n12. பறித்தல் முறை: 7-10 நாட்களுக்கு ஒருமுறை 'இரண்டு இலைகள் மற்றும் ஒரு மொட்டு' என்ற முறையில் பறிக்கவும்.\n13. பூச்சி மேலாண்மை: தேயிலைக் கொசு மற்றும் சிலந்திப் பூச்சிகளைக் கண்காணிக்கவும்.\n14. நோய் கட்டுப்பாடு: இலை கருகல் (Blister blight) நோயைத் தடுக்கப் பூசணக்கொல்லி தெளிக்கவும்.\n15. பதப்படுத்துதல்: பறித்த இலைகளை உடனே தொழிற்சாலைக்கு அனுப்பி பதப்படுத்த வேண்டும் (Withering, Rolling, Fermenting)."
                    },
                    "pigeon_pea": {
                        "name": "துவரை",
                        "season": "காரிஃப்",
                        "desc": "வறட்சியைத் தாங்கி வளரக்கூடிய புரதச்சத்து நிறைந்த பயறு வகை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நல்ல வடிகால் வசதியுள்ள செம்மண் அல்லது கரிசல் மண் ஏற்றது (pH 7.0-8.5).\n2. விதைப்பு காலம்: ஆடிப் பட்டம் (ஜூன்-ஜூலை) அல்லது புரட்டாசிப் பட்டம் ஏற்றது.\n3. விதை நேர்த்தி: கார்பென்டாசிம் மற்றும் ரைசோபியம் கொண்டு விதை நேர்த்தி செய்யவும்.\n4. இடைவெளி: ரகத்தைப் பொறுத்து 60x30 செ.மீ அல்லது 90x30 செ.மீ இடைவெளி விட வேண்டும்.\n5. உரம்: ஏக்கருக்கு 10 கிலோ தழைச்சத்து மற்றும் 20 கிலோ மணிச்சத்து உரங்களை இடவும்.\n6. நீர் மேலாண்மை: பூக்கும் பருவம் மற்றும் காய் பிடிக்கும் பருவத்தில் நீர் பாசனம் மிகவும் அவசியம்.\n7. களைக் கட்டுப்பாடு: விதைத்த 20 மற்றும் 45-வது நாட்களில் களை எடுத்து மண் அணைக்க வேண்டும்.\n8. நுனி கிள்ளுதல்: செடியின் கிளைகளை அதிகரிக்க 60-வது நாளில் நுனியைக் கிள்ள வேண்டும்.\n9. பூச்சி மேலாண்மை: காய்ப்புழு தாக்குதலைக் கட்டுப்படுத்த இனக்கவர்ச்சி பொறிகளை வைக்கவும்.\n10. நோய் மேலாண்மை: வாடல் நோயைத் தவிர்க்கப் பயிர் சுழற்சி முறையைப் பின்பற்றவும்.\n11. கந்தகச் சத்து: பருப்பு உருவாவதற்கு ஜிப்சம் மூலம் கந்தகச் சத்து அளிப்பது நல்லது.\n12. ஊடு பயிர்: சோளம் அல்லது கம்புடன் ஊடு பயிராகப் பயிரிடுவது அதிக லாபம் தரும்.\n13. அறுவடை அறிகுறிகள்: 80% காய்கள் காய்ந்து கரகரவெனச் சத்தம் வரும்போது அறுவடை செய்யலாம்.\n14. மடித்தல்: அறுவடை செய்த செடிகளை நன்கு காய வைத்து அடித்து மணிகளைப் பிரிக்க வேண்டும்.\n15. சேமிப்பு: மணிகளில் 10% ஈரப்பதம் இருக்கும்படி காய வைத்துச் சேமிக்கவும்."
                    },
                    "lentil": {
                        "name": "மசூூர் பருப்பு",
                        "season": "ரபி",
                        "desc": "சிறிய அளவிலான அதிகச் சத்துள்ள பயறு வகை.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: குளிர்ந்த காலநிலை மற்றும் மிதமான மழைப்பொழிவு தேவை.\n2. மண்: வண்டல் அல்லது களிமண் கலந்த நிலம் சிறந்தது; நீர் தேங்குவதை தவிர்க்க வேண்டும்.\n3. விதைப்பு காலம்: அக்டோபர் முதல் நவம்பர் வரை நடவு செய்ய ஏற்ற சமயம்.\n4. விதை அளவு: ஏக்கருக்கு 12-15 கிலோ விதை தேவைப்படும்.\n5. விதை நேர்த்தி: பூஞ்சாணக் கொல்லி மற்றும் ரைசோபியம் கொண்டு சிகிச்சை அளிக்கவும்.\n6. இடைவெளி: 25 செ.மீ வரிசை இடைவெளி மற்றும் 5 செ.மீ செடி இடைவெளி விடவும்.\n7. உரம்: நடவின் போது குறைந்த அளவு தழைச்சத்து மற்றும் அதிக மணிச்சத்து இட வேண்டும்.\n8. நீர் பாசனம்: நிலத்தின் ஈரப்பத்தைப் பொறுத்து 2 முதல் 3 முறை பாசனம் தேவை.\n9. களை மேலாண்மை: தொடக்கக் காலத்தில் களை வளர்ச்சி அதிகம் இருக்கும் என்பதால் 30-வது நாளில் களை எடுக்கவும்.\n10. பூச்சி கட்டுப்பாடு: அசுவினிப் பூச்சிகளைத் தடுக்க வேப்ப எண்ணெய் தெளிக்கவும்.\n11. நோய் கட்டுப்பாடு: வேர் அழுகல் நோயைத் தவிர்க்க வடிகால் வசதியை உறுதி செய்யவும்.\n12. மண் வள மேம்பாடு: பயிருக்குத் தேவையான துத்தநாகச் சத்தை உறுதி செய்யவும்.\n13. அறுவடை: இலைகள் மற்றும் காய்கள் பழுப்பு நிறமாக மாறும் போது அறுவடை செய்யவும்.\n14. காயவைத்தல்: செடிகளைப் பிடுங்கி 2-3 நாட்கள் களத்தில் காய வைக்க வேண்டும்.\n15. சுத்தப்படுத்துதல்: மணிகளைச் சுத்தப்படுத்தி தூசு இல்லாமல் சேமிக்கவும்."
                    },
                    "cabbage": {
                        "name": "முட்டைக்கோஸ்",
                        "season": "ரबी",
                        "desc": "குளிர் காலத்தில் வளரும் சத்தான காய்கறிப் பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: 15-20°C வெப்பநிலை வளர்ச்சிக்கு ஏற்றது; கடும் வெப்பத்தைத் தவிர்க்கவும்.\n2. மண்: அதிக கரிமச் சத்துள்ள மணல் கலந்த வண்டல் மண் சிறந்தது (pH 6.0-7.0).\n3. நாற்றங்கால்: மேட்டுப் பாத்திகளில் விதைகளை விதைத்து 30-40 நாள் நாற்றுகளை நடவும்.\n4. இடைவெளி: 45x45 செ.மீ அல்லது 60x45 செ.மீ இடைவெளியில் நடவு செய்யவும்.\n5. நீர் மேலாண்மை: மண் எப்போதும் ஈரமாக இருக்க வேண்டும், ஆனால் நீர் தேங்கக் கூடாது.\n6. உரம்: தழைச்சத்து அதிகம் தேவைப்படும் பயிர்; அடியுரம் மற்றும் மேலுரமாக இட வேண்டும்.\n7. மூடாக்கு: ஈரப்பதம் காக்கவும் களைகளைக் குறைக்கவும் வைக்கோல் மூடாக்கு இடலாம்.\n8. பூச்சி மேலாண்மை: வைர முதுகு அந்துப்பூச்சிக்கு (DBM) வேப்பங்கொட்டை கரைசல் தெளிக்கவும்.\n9. நோய் மேலாண்மை: கரு அழுகல் நோயைத் தவிர்க்க விதை நேர்த்தி அவசியம்.\n10. மண் அணைத்தல்: செடிகள் வளரும் போது வேர் பகுதியில் மண் அணைப்பது அவசியம்.\n11. போராக்ஸ் பயன்பாடு: கோஸ் வெடிப்பதைத் தவிர்க்க 0.5% போராக்ஸ் தெளிக்கவும்.\n12. களை மேலாண்மை: நாற்று நட்ட முதல் 60 நாட்கள் களை இல்லாமல் பார்த்துக் கொள்ளவும்.\n13. அறுவடை: கோஸின் தலைப்பகுதி நன்கு கடினமாகவும் பெரியதாகவும் ஆனவுடன் அறுவடை செய்யவும்.\n14. தரம் பிரித்தல்: நோயுற்ற அல்லது பூச்சி தாக்கிய இலைகளை அகற்றிச் சந்தைக்கு அனுப்பவும்.\n15. சேமிப்பு: குளிர்ச்சியான மற்றும் காற்றோட்டமான இடத்தில் 4-5 நாட்கள் வரை வைக்கலாம்."
                    },
                    "cauliflower": {
                        "name": "காலிஃபிளவர்",
                        "season": "ரபி",
                        "desc": "வெள்ளை நிறப் பூ தொகுப்பைக் கொண்ட குளிர் காலக் காய்கறி.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. ரகம் தேர்வு: மலைப் பகுதிகள் மற்றும் சமவெளிப் பகுதிகளுக்கு ஏற்ற ரகங்களைத் தேர்வு செய்யவும்.\n2. காலநிலை: பூ உருவாவதற்கு 15-20°C வெப்பநிலை மிகவும் அவசியம்.\n3. நாற்றங்கால்: நாற்றுகளைச் சொம்புப் பைகளில் அல்லது நாற்றங்காலில் தயாரித்து நடவும்.\n4. இடைவெளி: 60x45 செ.மீ இடைவெளியில் நாற்றுகளை நடவு செய்ய வேண்டும்.\n5. உரம்: தொழுவுரத்துடன் NPK மற்றும் மைக்ரோ நியூட்ரியன்ட்ஸ் இட வேண்டும்.\n6. பிளான்ச்சிங் (Blanching): சூரிய ஒளியால் பூ மஞ்சள் நிறமாக மாறுவதைத் தவிர்க்க இலைகளால் பூவை மூடி வைக்க வேண்டும்.\n7. நீர் பாசனம்: சீரான இடைவெளியில் நீர் பாய்ச்ச வேண்டும்; வறட்சி ஏற்பட்டால் பூவின் தரம் குறையும்.\n8. மலிப்டினம் குறைபாடு: 'விப்டெயில்' நோயைத் தவிர்க்க சோடியம் மலிப்டேட் தெளிக்கவும்.\n9. பூச்சி கட்டுப்பாடு: கோஸ் புழு மற்றும் அசுவினிகளைக் கவனிக்கவும்.\n10. நோய் கட்டுப்பாடு: இலைப்புள்ளி நோய்க்குப் பூசணக்கொல்லி பயன்படுத்தவும்.\n11. மண் அணைத்தல்: நட்ட 30-வது நாளில் மண் அணைப்பது அவசியம்.\n12. தரம்: பூக்கள் இறுக்கமாகவும், வெண்மையாகவும் இருப்பதை உறுதி செய்யவும்.\n13. அறுவடை: பூக்கள் தளர்வடைவதற்கு முன்பாகவே அறுவடை செய்து விட வேண்டும்.\n14. கையாளுதல்: பூக்கள் சேதமடையாமல் இருக்க இதழ்களைச் சுற்றி சில இலைகளுடன் அறுவடை செய்யவும்.\n15. பேக்கிங்: மூங்கில் கூடைகள் அல்லது அட்டைப் பெட்டிகளில் அடுக்கிக் காற்றோட்டமாக வைக்கவும்."
                    },
                    "carrot": {
                        "name": "கேரட்",
                        "season": "ரபி",
                        "desc": "வைட்டமின் ஏ நிறைந்த கிழங்கு வகை காய்கறி.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: ஆழமான, கல் இல்லாத மணல் கலந்த வண்டல் மண் வேர் வளர்ச்சிக்கு ஏற்றது.\n2. நிலம் தயாரித்தல்: 30 செ.மீ ஆழம் வரை உழுது மண்ணைப் பொடி படச் செய்ய வேண்டும்.\n3. விதைப்பு காலம்: மலைகளில் மார்ச்-ஜூலை, சமவெளியில் அக்டோபர்-நவம்பர்.\n4. விதைப்பு முறை: மேட்டுப் பாத்திகளில் அல்லது வரப்புகளில் விதைக்க வேண்டும்.\n5. விதை அளவு: ஏக்கருக்கு 2-3 கிலோ விதை தேவைப்படும்; மணலுடன் கலந்து விதைக்கவும்.\n6. கலைத்தல் (Thinning): விதைத்து 20-30 நாட்களில் செடிகளை 5-10 செ.மீ இடைவெளியில் கலைக்கவும்.\n7. நீர் மேலாண்மை: சமச்சீரான நீர் பாசனம் தேவை; அதிக வறட்சிக்கு பின் தண்ணீர் பெய்தால் கேரட் வெடிக்கும்.\n8. உரம்: பொட்டாசியம் சத்து வேர் திரட்சிக்கும் நிறத்திற்கும் அவசியம்.\n9. களை மேலாண்மை: தொடக்கக் காலத்தில் களைக் கட்டுப்பாடு மிக முக்கியம்.\n10. பூச்சி மேலாண்மை: கேரட் ஈ மற்றும் நூற்புழுக்களைக் கவனிக்கவும்.\n11. நோய் கட்டுப்பாடு: இலை கருகல் நோயைத் தவிர்க்கப் பூசணக்கொல்லி தெளிக்கவும்.\n12. மண் அணைத்தல்: கேரட்டின் மேல்பகுதி சூரிய ஒளியால் பச்சை நிறமாவதைத் தவிர்க்க மண் அணைக்க வேண்டும்.\n13. அறுவடை அறிகுறிகள்: வேர்கள் குறிப்பிட்ட அளவு தடித்தவுடன் அறுவடை செய்யலாம்.\n14. கழுவுதல்: அறுவடை செய்த கேரட்டைக் குளிர்ந்த நீரில் கழுவி மண்ணைப் போக்க வேண்டும்.\n15. தரம் பிரித்தல்: உடைந்துள்ள அல்லது நோயுற்ற கேரட்டுகளை நீக்கிவிட்டுச் சந்தைக்கு அனுப்பவும்."
                    },
                    "brinjal": {
                        "name": "கத்தரிக்காய்",
                        "season": "ஆண்டு முழுவதும்",
                        "desc": "அதிக விளைச்சல் தரும் பல்வேறு ரகங்களைக் கொண்ட காய்கறி.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. மண்: நல்ல வடிகால் வசதியுள்ள அனைத்து மண் வகைகளிலும் வளரும் (pH 5.5-6.5).\n2. நாற்றங்கால்: 30-35 நாள் ஆரோக்கியமான நாற்றுகளை நடவுக்குப் பயன்படுத்தவும்.\n3. நடவு காலம்: ஜூன்-ஜூலை அல்லது ஜனவரி-பிப்ரவரி மாதங்கள் ஏற்றது.\n4. இடைவெளி: ரகத்தைப் பொறுத்து 60x60 செ.மீ அல்லது 75x60 செ.மீ இடைவெளி விடவும்.\n5. உரம்: ஏக்கருக்கு 10 டன் தொழுவுரம் மற்றும் குறிப்பிட்ட அளவு NPK உரமிட வேண்டும்.\n6. நீர் பாசனம்: வாரத்திற்கு ஒருமுறை அல்லது கோடையில் 5 நாட்களுக்கு ஒருமுறை பாசனம் செய்யவும்.\n7. மைக்ரோ நியூட்ரியன்ஸ்: இரும்பு மற்றும் ஜிங்க் சத்து குறைபாட்டைப் போக்க நுண்ணூட்ட உரமிடுங்கள்.\n8. களைக் கட்டுப்பாடு: இரண்டு அல்லது மூன்று முறை கைக் களை எடுக்க வேண்டும்.\n9. பூச்சி மேலாண்மை: தண்டு மற்றும் காய் துளைப்பான் பெரிய பாதிப்பை ஏற்படுத்தும்; வேப்ப எண்ணெய் பயன்படுத்தவும்.\n10. நோய் மேலாண்மை: சிறு இலை நோய் மற்றும் வாடல் நோயைக் கண்காணிக்கவும்.\n11. கிளைக் கவாத்து: அதிக விளைச்சலுக்குத் தேவையற்ற பக்கக் கிளைகளை அகற்றலாம்.\n12. காய் பிடிப்பு: பூத்துக் குலுங்கவும் காய் பிடிக்கவும் பூ மொட்டு ஊக்கிகளைத் தெளிக்கலாம்.\n13. அறுவடை: காய் அதன் மென்மையை இழப்பதற்கு முன் மற்றும் விதைகள் முற்றுவதற்கு முன் அறுவடை செய்யவும்.\n14. கையாளுதல்: காய்களைக் காம்புடன் மென்மையாகப் பறிக்க வேண்டும்.\n15. சேமிப்பு: பறித்த பின் குளிர்ச்சியான இடத்தில் வைத்தால் 3-4 நாட்கள் வரை வாடாமல் இருக்கும்."
                    },
                    "papaya": {
                        "name": "பப்பாளி",
                        "season": "பல்லாண்டு",
                        "desc": "விரைவாக வளர்ந்து அதிக மகசூல் தரும் பழப்பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: வெப்பமண்டல மற்றும் மிதவெப்ப மண்டல காலநிலை (25-30°C) சிறந்தது.\n2. மண்: நீர் தேங்காத ஆழமான வண்டல் மண் அல்லது செம்மண் ஏற்றது.\n3. ரகம்: ரெட் லேடி, கோ-7 அல்லது தவாங் போன்ற நல்ல ரகங்களைத் தேர்வு செய்யவும்.\n4. நடவு: 2x2 மீட்டர் இடைவெளியில் 45 செ.மீ அளவு குழிகளில் நடவும்.\n5. நீர் பாசனம்: பப்பாளிக்குத் தேங்கி நிற்கும் நீர் ஆகாது; சொட்டு நீர் பாசனம் மிகவும் சிறந்தது.\n6. உரம்: ஒவ்வொரு 2 மாதங்களுக்கு ஒருமுறை சமச்சீரான NPK உரங்களை இட வேண்டும்.\n7. பாலின விகிதம்: ஒருபால் ரகங்களுக்கு 10 பெண் செடிகளுக்கு ஒரு ஆண் செடி இருப்பது அவசியம்.\n8. வேர் அழுகல்: நீர் தேங்குவதைத் தடுத்தால் தண்டு மற்றும் வேர் அழுகல் நோயைத் தவிர்க்கலாம்.\n9. கோமாளி நோய் (Virus): அசுவினிப் பூச்சிகள் பரப்பும் வைரஸ் நோயைக் கட்டுப்படுத்த வேண்டும்.\n10. களை மேலாண்மை: பப்பாளி மரத்தைச் சுற்றி எப்போதும் களைகள் இல்லாமல் இருக்க வேண்டும்.\n11. முட்டுக்கொடுத்தல்: அதிக காய்கள் இருக்கும் போது மரம் சாய்வதைத் தவிர்க்க முட்டுக் கொடுக்கவும்.\n12. அறுவடை அறிகுறிகள்: பழத்தின் தோல் நிறம் பச்சையிலிருந்து மஞ்சள் நிறமாக மாறத் தொடங்கும் போது பறிக்கவும்.\n13. அறுவடை முறை: பழத்தைக் காயமடையாமல் மென்மையாகத் திருகிப் பறிக்க வேண்டும்.\n14. பால் வடிதல்: பறித்த பின் பால் வடியும் வரை பழத்தைக் குப்புற வைக்கவும்.\n15. பேக்கிங்: பழங்களை காகிதங்களில் சுற்றி காற்றோட்டமான பெட்டிகளில் அடுக்கிச் சந்தைக்கு அனுப்பவும்."
                    },
                    "pomegranate": {
                        "name": "மாதுளை",
                        "season": "பல்லாண்டு",
                        "desc": "வறண்ட நிலங்களுக்கு ஏற்ற அதிகப் பொருளாதார மதிப்பு கொண்ட பழம்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. காலநிலை: அதிக வெப்பம் மற்றும் குறைந்த ஈரப்பதம் கொண்ட இடங்கள் சிறந்தது.\n2. மண்: நன்கு வடிகட்டிய ஆழமான வண்டல் அல்லது கரிசல் மண் ஏற்றது (pH 6.5-7.5).\n3. ரகம்: பகவா, மிருதுளா அல்லது சூப்பர் பகவா போன்ற ரகங்களை நடலாம்.\n4. இடைவெளி: 4x3 மீட்டர் அல்லது 5x4 மீட்டர் இடைவெளியைப் பின்பற்றவும்.\n5. நடவு முறை: வேர் விட்ட குச்சிகள் அல்லது திசு வளர்ப்பு நாற்றுகளைப் பயன்படுத்தலாம்.\n6. கவாத்து: செடியை 3-4 முக்கியத் தண்டுகளுடன் புதர் வடிவில் வளர்ப்பது அதிக விளைச்சல் தரும்.\n7. நீர் மேலாண்மை: பூக்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் சீரான நீர் பாசனம் இருக்க வேண்டும்.\n8. பழம் வெடித்தல்: ஈரப்பத மாற்றம் மற்றும் போரான் குறைபாட்டால் பழம் வெடிக்கும்; இதைத் தடுக்க 0.2% போராக்ஸ் தெளிக்கவும்.\n9. உரம்: ஆண்டுக்கு இருமுறை பருவமழை காலங்களில் உரமிட வேண்டும்.\n10. அந்துப்பூச்சி: மாதுளை பட்டாம்பூச்சி பாதிப்பைக் குறைக்கப் பழங்களை வலைப் பைகள் கொண்டு மூடலாம்.\n11. நோய் மேலாண்மை: பாக்டீரியா இலைப்புள்ளி நோயைக் கட்டுப்படுத்த செப்பு ஆக்ஸிகுளோரைடு தெளிக்கவும்.\n12. மண் வள மேம்பாடு: மண்புழு உரம் மற்றும் அசோஸ்பைரில்லம் இடுவது நன்மை பயக்கும்.\n13. அறுவடை அறிகுறிகள்: பழத்தின் தோல் நிறம் மஞ்சளாக மாறி தட்டையாகத் தெரியும்போது அறுவடை செய்யலாம்.\n14. ஒலி சோதனை: பழத்தைத் தட்டும்போது உலோகச் சத்தம் வந்தால் அது முதிர்ச்சியைக் குறிக்கும்.\n15. சேமிப்பு: மாதுளையைச் சாதாரண அறையிலேயே 15-20 நாட்கள் வரை வைத்திருக்கலாம்."
                    },
                    "coffee": {
                        "name": "காபி",
                        "season": "பல்லாண்டு",
                        "desc": "நிழலில் வளரக்கூடிய அதிக தேவையுள்ள பணப்பயிர்.",
                        "guidelines": "விரிவான சாகுபடி வழிகாட்டுதல்கள்:\n1. நிலம்: மலைச்சரிவுகளில் வடிகால் வசதி கொண்ட கரிமச் சத்துக்கள் நிறைந்த மண் சிறந்தது.\n2. காலநிலை: மிதமான வெப்பநிலை (15-25°C) மற்றும் பரவலான மழைப்பொழிவு தேவை.\n3. நிழல் மேலாண்மை: காபிக்கு நிழல் மிக முக்கியம்; எனவே நிழல் தரும் மரங்களை (எ.கா: சில்வர் ஓக்) வளர்க்க வேண்டும்.\n4. ரகம்: அராபிகா (உயர்ந்த மலைப்பகுதி) அல்லது ரோபஸ்டா (தாழ்வான மலைப்பகுதி) நடலாம்.\n5. இடைவெளி: அராபிகாவுக்கு 2x2 மீட்டர், ரோபஸ்டாவுக்கு 3x3 மீட்டர் இடைவெளி விடவும்.\n6. நடவு: ஜூன் அல்லது செப்டம்பர் மாதங்களில் குழிகள் எடுத்து நடவு செய்யலாம்.\n7. கவாத்து: செடிகளின் வளர்ச்சியைச் சீராக வைத்திருக்கவும் அதிக கிளைகள் வரவும் அவ்வப்போது கவாத்து அத்தியாவசியமானது.\n8. உரம்: கவாத்து செய்த பிறகு மற்றும் மழை காலங்களில் உரமிட வேண்டும்.\n9. நீர் பாசனம்: பூக்கும் பருவத்தில் (Blossom showers) மழை அல்லது பாசனம் மிக முக்கியம்.\n10. களை மேலாண்மை: தோட்டத்தை எப்போதும் களை இல்லாமல் சுத்தமாக வைத்திருக்க வேண்டும்.\n11. பூச்சி மேலாண்மை: தண்டு துளைப்பான் மற்றும் முட்டைப் பூச்சிகளைக் கவனிக்கவும்.\n12. நோய் கட்டுப்பாடு: இலை துரு நோயைத் தடுக்கப் போர்டோ கலவை தெளிக்கவும்.\n13. அறுவடை: பழங்கள் நன்கு சிவந்த பிறகு (Cherry stage) கைமுறையாகப் பறிக்க வேண்டும்.\n14. பதப்படுத்துதல்: பறித்த பழங்களை நீரில் கழுவி அல்லது வெயிலில் உலர்த்தி மணிகளைப் பிரிக்க வேண்டும்.\n15. தரக் கட்டுப்பாடு: ஈரப்பதம் 10-11% இருக்கும்படி நன்கு உலர்த்திச் சேமிக்க வேண்டும்."
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
