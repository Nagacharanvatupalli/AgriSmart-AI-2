import express from 'express';
import User from '../models/User';
import twilio from 'twilio';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;

// Helper to get weather data with robust geocoding retries
async function getWeatherData(location: { state: string, district: string, mandal: string }) {
    const segments = [
        `${location.mandal}, ${location.district}, ${location.state}`,
        `${location.mandal}, ${location.district}`,
        `${location.district}, ${location.state}`,
        location.mandal,
        location.district
    ].filter(Boolean);

    let results = [];
    let usedSegment = '';

    for (const segment of segments) {
        try {
            console.log(`[ADMIN] Geocoding attempt: ${segment}`);
            const geoResp = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(segment)}&count=1&language=en&format=json`, { timeout: 5000 });
            if (geoResp.data.results?.length) {
                results = geoResp.data.results;
                usedSegment = segment;
                break;
            }
        } catch (e) {
            console.warn(`[ADMIN] Geocoding failed for: ${segment}`);
        }
    }

    if (results.length === 0) return null;

    try {
        const { latitude, longitude, name } = results[0];
        console.log(`[ADMIN] Found location for ${usedSegment}: ${name} (${latitude}, ${longitude})`);

        const weatherResp = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability&forecast_hours=24&timezone=auto`,
            { timeout: 10000 }
        );

        const hourlyTemps = weatherResp.data.hourly.temperature_2m;
        const hourlyRainProbs = weatherResp.data.hourly.precipitation_probability;

        const maxTemp = Math.max(...hourlyTemps);
        const maxRainProb = Math.max(...hourlyRainProbs);

        return {
            temp: maxTemp,
            rainProb: maxRainProb,
            resolvedName: name
        };
    } catch (e) {
        console.error('[ADMIN] Weather fetch error after geocoding:', e);
        return null;
    }
}

router.post('/check-weather', async (req, res) => {
    console.log('[ADMIN] Starting global weather check...');
    try {
        const users = await User.find({});
        const results = [];
        const now = new Date();

        for (const user of users) {
            if (!user.location?.mandal) continue;

            const weather = await getWeatherData(user.location);
            if (!weather) continue;

            let triggerSms = false;
            let msg = '';

            const lastSent = user.lastSmsSent ? new Date(user.lastSmsSent) : new Date(0);
            const hoursSinceLast = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60);

            let smsStatus = 'Not needed';

            // Check if we need to trigger an SMS
            if (weather.rainProb > 60) {
                triggerSms = true;
                msg = `Alert: Heavy rain (${weather.rainProb}%) expected in your area in the next 24 hours. Please protect your ${user.cropDetails?.cropName || 'crops'}.`;
            } else if (weather.temp > 5) { // NOTE: condition left as-is from original code which seems low >5, keeping logic intact just moving order
                triggerSms = true;
                msg = `Alert: High temperature (${weather.temp}°C) detected. Ensure proper irrigation for your ${user.cropDetails?.cropName || 'crops'}.`;
            }

            if (triggerSms) {
                if (hoursSinceLast < 24) {
                    smsStatus = 'Throttled (Sent in last 24h)';
                } else {
                    if (twilioClient && TWILIO_PHONE) {
                        try {
                            await twilioClient.messages.create({
                                body: msg,
                                from: TWILIO_PHONE,
                                to: user.mobile.startsWith('+') ? user.mobile : `+91${user.mobile}`
                            });
                            user.lastSmsSent = now;
                            await user.save();
                            smsStatus = 'Sent';
                        } catch (err: any) {
                            console.error('Twilio error:', err.message);
                            smsStatus = `Failed: ${err.message}`;
                        }
                    } else {
                        smsStatus = 'Skipped (No Twilio Creds)';
                        // For demo purposes, we update the timestamp even if skipped so it doesn't log spam
                        user.lastSmsSent = now;
                        await user.save();
                    }
                }
            }

            results.push({
                mobile: user.mobile,
                location: `${user.location.mandal}, ${user.location.district}`,
                weather,
                status: smsStatus
            });
        }

        res.json({ success: true, results });
    } catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

export default router;
