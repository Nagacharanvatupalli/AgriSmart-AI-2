import mongoose, { Document } from 'mongoose';

interface IMarketPrice extends Document {
    commodity: string;
    market: string;
    district: string;
    state: string;
    min_price: number;
    max_price: number;
    grade1_price?: number;
    grade2_price?: number;
    grade3_price?: number;
    modal_price: number;
    yesterday_modal_price?: number;
    is_primary_cache?: boolean;
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
    grade1_price: { type: Number },
    grade2_price: { type: Number },
    grade3_price: { type: Number },
    modal_price: { type: Number },
    yesterday_modal_price: { type: Number },
    is_primary_cache: { type: Boolean },
    date: { type: Date, required: true },
    source: { type: String },
}, { timestamps: true });

// Create a compound index for efficient querying
MarketPriceSchema.index({ commodity: 1, district: 1, date: -1 });

export default mongoose.models.MarketPrice || mongoose.model<IMarketPrice>('MarketPrice', MarketPriceSchema);
