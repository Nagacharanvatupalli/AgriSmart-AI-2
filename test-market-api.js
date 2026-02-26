const axios = require('axios');

async function testMarketAPI() {
    const crop = 'Chilli';
    const market = 'Guntur';
    const url = `http://localhost:3000/api/market/prices?crop=${crop}&market=${market}`;

    console.log(`Testing Market API: ${url}`);
    try {
        const response = await axios.get(url);
        console.log('API Response:', JSON.stringify(response.data, null, 2));
        if (response.data.commodity && response.data.modal_price) {
            console.log('✅ Market API verification successful!');
        } else {
            console.log('❌ Market API verification failed: Missing expected fields.');
        }
    } catch (error) {
        console.error('❌ Market API verification failed:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testMarketAPI();
