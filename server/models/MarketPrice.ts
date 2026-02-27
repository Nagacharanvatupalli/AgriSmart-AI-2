import mongoose, { Document } from 'mongoose';

interface IMarketPrice extends Document {
    commodity: string;
    market: string;
    district: string;
    state: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    date: Date;
    source: string;
}

const MarketPriceSchema = new mongoose.Schema({
    commodity: { type: String, required: true },
    market: { type: String, required: true },
    district: { type: String },
    state: { type: String },
    min_price: { type: Number },
    max_price: { type: Number },
    modal_price: { type: Number },
    date: { type: Date, required: true },
    source: { type: String },
}, { timestamps: true });

// Create a compound index for efficient querying
MarketPriceSchema.index({ commodity: 1, district: 1, date: -1 });

export default mongoose.models.MarketPrice || mongoose.model<IMarketPrice>('MarketPrice', MarketPriceSchema);
