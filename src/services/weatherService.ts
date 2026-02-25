import axios from 'axios';

interface WeatherData {
    current: {
        temperature: number;
        humidity: number;
        windSpeed: number;
        rain: number;
    };
    forecast: Array<{
        date: string;
        maxTemp: number;
        minTemp: number;
        rainChance: number;
        condition: string;
    }>;
}

export async function getWeatherData(locationQuery: string): Promise<WeatherData | null> {
    console.log('Fetching weather for:', locationQuery);
    try {
        let results = [];

        console.log('Geocoding attempt 1 (Full):', locationQuery);
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationQuery)}&count=1&language=en&format=json`, { timeout: 10000 });
        results = geoResponse.data.results || [];

        if (results.length === 0 && locationQuery.includes(',')) {
            const segments = locationQuery.split(',').map(s => s.trim());
            for (const segment of segments) {
                if (!segment) continue;
                console.log(`Retrying geocoding with segment: ${segment}`);
                try {
                    const retryResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(segment)}&count=1&language=en&format=json`, { timeout: 5000 });
                    if (retryResponse.data.results && retryResponse.data.results.length > 0) {
                        results = retryResponse.data.results;
                        break;
                    }
                } catch (e) {
                    console.warn(`Failed to geocode segment: ${segment}`);
                }
            }
        }

        if (results.length === 0) {
            console.warn('Location not found in geocoding API:', locationQuery);
            return null;
        }

        const { latitude, longitude, name } = results[0];
        console.log(`Found location: ${name} (${latitude}, ${longitude})`);

        // Fetch current AND daily forecast (7 days, we'll take top 5)
        const weatherResponse = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`,
            { timeout: 10000 }
        );

        const current = weatherResponse.data.current;
        const daily = weatherResponse.data.daily;

        if (!current || !daily) throw new Error('Incomplete weather data in response');

        // Map weather codes to simple descriptions for farmers
        const getCondition = (code: number) => {
            if (code === 0) return "Clear Sky (No Clouds)";
            if (code <= 3) return "Few Clouds";
            if (code <= 48) return "Foggy Day";
            if (code <= 67) return "Light Rain";
            if (code <= 77) return "Snow";
            if (code <= 82) return "Heavy Rain";
            return "Thunderstorm / Big Rain";
        };

        const forecast = daily.time.slice(1, 6).map((time: string, i: number) => ({
            date: time,
            maxTemp: daily.temperature_2m_max[i + 1],
            minTemp: daily.temperature_2m_min[i + 1],
            rainChance: daily.precipitation_probability_max[i + 1],
            condition: getCondition(daily.weathercode[i + 1])
        }));

        return {
            current: {
                temperature: current.temperature_2m,
                humidity: current.relative_humidity_2m,
                windSpeed: current.wind_speed_10m,
                rain: current.precipitation
            },
            forecast
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error fetching weather data:', error.message);
        } else {
            console.error('Unexpected error fetching weather data:', error);
        }
        return null;
    }
}
