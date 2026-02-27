import fs from 'fs';

const commodities = [
    'Ajwain Husk', 'Ajwan', 'Almond(Badam)', 'Aloe Vera', 'Alsandikai', 'Amaranthus', 'Ambat Chuka',
    'Ambady/Mesta/Patson', 'Amla(Nelli Kai)', 'Amranthas Red', 'Anthorium', 'Apple', 'Apricot(Jardalu/Khumani)',
    'Arecanut(Betelnut/Supari)', 'Arrowroot', 'Asalia', 'Asgand', 'Ashgourd', 'Ashoka', 'Ashwagandha',
    'Asparagus', 'Astera', 'Atis', 'Avocado', 'Baby Corn', 'Bael', 'Bajji chilli', 'Bajra(Pearl Millet/Cumbu)',
    'Balekai', 'balsam', 'Bamboo Shoot', 'Banana', 'Banana - Green', 'Banana flower', 'Banana Leaf',
    'Banana stem', 'Barley(Jau)', 'Barnyard Millet', 'basil', 'Beaten Rice', 'Beetroot', 'Ber(Zizyphus/Borehannu)',
    'Betal Leaves', 'Betelnuts', 'Bhindi(Ladies Finger)', 'Bilimbi', 'Binoula', 'Bitter gourd',
    'Black Currant', 'Black pepper', 'Blueberry', 'BOP', 'Borehannu', 'Bottle gourd', 'Bran',
    'Bread Fruit', 'Brinjal', 'Brocoli', 'Broken Rice', 'Browntop Millet', 'Bunch Beans', 'Cabbage',
    'Calendula', 'Camel Hair', 'Capsicum', 'Cardamoms', 'Carnation', 'Carissa(Karvand)', 'Carrot',
    'Cashew Kernnel', 'Cashew nuts', 'Castor Seed', 'Cauliflower', 'Chakhao(Black Rice)', 'Chakotha',
    'Chandrashoor', 'Chapparad Avare', 'Chhappan Kaddu', 'Cherry', 'Chicory(Chikori/Kasni)', 'Chikoos(Sapota)',
    'Chili Red', 'Chilly Capsicum', 'Chrysanthemum', 'Chrysanthemum(Loose)', 'Cinamon(Dalchini)', 'cineraria',
    'Clarkia', 'Cluster beans', 'Cloves', 'Coca', 'Cocoa', 'Coconut', 'Coconut Coir', 'Coconut Seed',
    'Coffee', 'Colacasia', 'Coleus', 'Copra', 'Coriander(Leaves)', 'Corriander seed', 'Cossandra',
    'Cotton', 'Cotton Seed', 'Cowpea(Veg)', 'Cucumbar(Kheera)', 'Cummin Seed(Jeera)', 'Curry Leaf',
    'Custard Apple(Sharifa)', 'Daila(Chandni)', 'Dates', 'Delha', 'dhawai flowers', 'Dhaincha',
    'Dhaincha(Seed)', 'dianthus', 'Double Beans', 'Dragon fruit', 'dried mango', 'Drumstick', 'Dry Chillies',
    'Dry Fodder', 'Dry Grapes', 'Duster Beans', 'Egypian Clover(Barseem)', 'Elephant Yam(Suran)/Amorphophallus',
    'Field Bean(Anumulu)', 'Field Pea', 'Fig (Dry)', 'Fig(Anjura/Anjeer)', 'Flax seeds', 'Flowers-Others',
    'Foxtail Millet(Navane)', 'French Beans(Frasbean)', 'Galgal(Lemon)', 'Gamphrena', 'Garcinia', 'Garlic',
    'Gerbera', 'Gherkin', 'Ghost Pepper(King Chilli)', 'Ginger Seed', 'Ginger(Dry)', 'Ginger(Green)',
    'Gladiolus Bulb', 'Gladiolus Cut Flower', 'Glardia', 'Goat Hair', 'golden rod', 'Goose berry(Nellikkai)',
    'Goosefoot', 'Gramflour', 'Gram Raw(Chholia)', 'Grapes', 'Green Avare(W)', 'Green Chilli',
    'Green Fodder', 'Green Tea', 'Grey Fruit', 'Ground Nut Seed', 'Groundnut', 'Groundnut pods(raw)',
    'Groundnut(Split)', 'Guar', 'Guava', 'Gur(Jaggery)', 'Gurellu', 'gypsophila', 'Haralekai', 'Heliconia species',
    'Hilsa', 'Hog Plum', 'Honey', 'Honge seed', 'hybrid Cumbu', 'hydrangea', 'Indian Beans(Seam)',
    'Indian Colza(Sarson)', 'Indian Sherbet Berry(Phalsa)', 'Irish', 'Isabgul(Psyllium)', 'Isbgol', 'Jack Fruit(Ripe)',
    'Jackfruit Seed', 'Jackfruit(Green/Raw/Unripe)', 'Jaee', 'Jaffri', 'Jaggery', 'Jamamkhan', 'Jamun(Narale Hannu)',
    'Jarbara', 'Jasmine', 'Javi', 'Jowar(Sorghum)', 'Jute', 'Kacholam', 'Kagda', 'Kakada', 'kakatan', 'Kankambra',
    'karanja seeds', 'Karbuja(Musk Melon)', 'Kartali(Kantola)', 'Kevda', 'Kharif Mash', 'Khirni', 'Khoya', 'Kinnow',
    'Kiwi Fruit', 'Knool Khol', 'Kodo Millet(Varagu)', 'Kuchur', 'Kuchur - Kusum Seed', 'Kutki', 'Ladies Finger',
    'Laha', 'Large Cardamom', 'Leafy Vegetable', 'Leek', 'Lemon', 'Lemongrass', 'Lesser Yam', 'Lilly', 'Lime',
    'Limonia(status)', 'Linseed', 'Lint', 'liquor turmeric', 'Litchi', 'Little gourd(Kundru)', 'Little Millet',
    'Long Melon(Kakri)', 'Lotus', 'Lotus Sticks', 'Lukad', 'Lupine', 'Ma.Inji', 'Mace', 'macoy', 'Mahedi', 'Mahua',
    'Maida Atta', 'Maize', 'Makhana(Foxnut)', 'mango powder', 'Mango', 'Mango(Raw-Ripe)', 'Mangosteen',
    'Maragensu', 'Marasebu', 'Marget', 'Marigold(Calcutta)', 'Marigold(loose)', 'Marikozhunthu', 'Mash', 'Mashrooms',
    'Meal Maker (Soya Chunks)', 'MENETC*3', 'Mentha Oil', 'Mentha(Mint)', 'Methi Seeds', 'Methi(Leaves)', 'Millets',
    'Mint(Pudina)', 'Mousambi(Sweet Lime)', 'Muesli', 'Muleti', 'Mulberry', 'Mustard', 'Muskmelon Seeds',
    'Myrobolan(Harad)', 'Nearle Hannu', 'Neem Fruits', 'Nelli Kai', 'Nerium', 'nigella', 'nigella seeds',
    'Niger Seed(Ramtil)', 'Nutmeg', 'Onion', 'Onion Green', 'Orange', 'Orchid', 'Other green and fresh vegetables',
    'Paddy(Basmati)', 'Paddy(Common)', 'Palash flowers', 'Papaya', 'Papaya(Raw)', 'Passion Fruit',
    'Patti Calcutta', 'Peach', 'Pea Pod/Pea Cod/हरी मटर', 'Pear(Marasebu)', 'Peas Wet', 'Pincushion Flower',
    'Pine Nut(Chilgoza /Niyoza)', 'Pineapple', 'pippali', 'Pista(Pistachio)', 'Plum', 'Pointed gourd(Parval)',
    'Pokcha Leafy Veg', 'Polherb', 'Pomegranate', 'Poppy capsules', 'poppy seeds', 'Potato', 'Proso Millet',
    'Pumpkin', 'Pundi', 'Pupadia', 'Purslane', 'Quince(Nakh)', 'Rab/Liquid Jaggery/Molasses', 'Raddish', 'Ragi(Finger Millet)',
    'Raibel', 'Rajgir', 'Rala', 'Rambutan', 'Ramphal', 'Rat Tail Radish(Mogari)', 'Raw Biomass(Agro Residue)',
    'Raya', 'Rayee', 'Red Cabbage', 'Red Gourd', 'Ribbed Celery', 'Riccbcan', 'Rice', 'Ridge Gourd(Permal/Hybrid Gourd)',
    'Ridgeguard(Tori)', 'Rose(Local)', 'Rose(Loose))', 'Rose(Tata)', 'Round Chilli', 'Round gourd', 'Rubber',
    'Sabu Dan', 'Safflower', 'Saffron', 'Sajje', 'Sal Seeds', 'salvia', 'Same/Savi', 'Sanai/Sunhemp', 'sanay',
    'Sarasum', 'Season Leaves', 'Seegu', 'Seemebadnekai', 'Seetapal', 'Sehuwan (Seed)', 'Sem', 'Sesamum(Sesame,Gingelly,Til)',
    'sevanti', 'Siddota', 'Siru Kizhagu', 'Skin And Hide', 'Snakeguard', 'Snow Mountain Garlic', 'Soanf', 'Soha',
    'Soji', 'Sompu', 'Soursop', 'Soyabean', 'Spinach', 'Sponge gourd', 'Squash(Chappal Kadoo)', 'Star Fruit(Kamraikh)',
    'stevia', 'stone pulverizer', 'Strawberry', 'Sugar', 'Sugar Snap Peas', 'Sugarcane', 'Sunflower', 'Sunflower Seed',
    'Suram', 'Surat Beans(Papadi)', 'Suva(Dill Seed)', 'Suvarna Gadde', 'Swan Phali(Flat Bean)', 'Swan Plant (Green Herb)',
    'Swanflower', 'Sweet Corn', 'Sweet Potato', 'Sweet Pumpkin', 'Sweet Saag', 'Sweet Sultan', 'sweet william',
    'T.V. Cumbu', 'Tapioca', 'Taramira', 'Taro (Arvi) Leaves', 'Taro (Arvi) Stem', 'Tea', 'Tender Coconut',
    'Tendu Leaves/Kendu leaves/Bidi Leaves', 'Thogrikai', 'Thondekai', 'Tinda', 'Tobacco', 'Tomato', 'Toria',
    'Tube Flower', 'Tube Rose(Double)', 'Tube Rose(Loose)', 'Tube Rose(Single)', 'Tulasi', 'tulip', 'Turmeric',
    'Turmeric(raw)', 'Turnip', 'vadang', 'Vatsanabha', 'Walnut', 'Water Apple', 'Water chestnut', 'Water Melon',
    'Water Plant(Kaseru)', 'Wheat', 'Wheat Atta', 'White Muesli', 'White Pumpkin', 'Wild Cucumber', 'Wild Garlic / Shoots',
    'Wild lemon', 'Wild Melon', 'Wild Spinach', 'Wood Apple', 'Wool', 'Yam', 'Yam Bean / Mexican Turnip(Bankla)',
    'Yam(Ratalu)'
]

async function translateText(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0].map(x => x[0]).join('');
    } catch (e) {
        console.error('Error translating', text, e);
        return text;
    }
}

async function run() {
    const langs = ['te', 'hi', 'ta'];
    const result = { te: {}, hi: {}, ta: {} };

    // Grouping items to avoid rate limiting
    const chunk = 5;
    for (let i = 0; i < commodities.length; i += chunk) {
        const batch = commodities.slice(i, i + chunk);
        console.log(`Translating batch ${i} to ${i + chunk}...`);

        for (const lang of langs) {
            const promises = batch.map(c => translateText(c, lang).then(t => { result[lang][c] = t; }));
            await Promise.all(promises);
        }
        await new Promise(r => setTimeout(r, 200)); // Sleep bit to not overwhelm API
    }

    fs.writeFileSync('src/data/commodity_translations.json', JSON.stringify(result, null, 2));
    console.log("Done!");
}

run();
