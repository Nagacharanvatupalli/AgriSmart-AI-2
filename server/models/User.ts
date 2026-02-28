import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  mobile: string;
  email?: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    age: number;
  };
  location: {
    state: string;
    district: string;
    mandal: string;
  };
  crops: {
    cropName: string;
    addedAt: Date;
  }[];
  cropDetails?: {
    cropName?: string;
    startDate?: Date;
    endDate?: Date;
  };
  lastSmsSent?: Date;
}

const UserSchema = new mongoose.Schema({
  mobile: { type: String, unique: true, sparse: true },
  email: { type: String },
  password: { type: String },
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
  },
  location: {
    state: String,
    district: String,
    mandal: String,
  },
  crops: [{
    cropName: String,
    addedAt: { type: Date, default: Date.now }
  }],
  cropDetails: {
    cropName: String,
    startDate: Date,
    endDate: Date
  },
  lastSmsSent: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
