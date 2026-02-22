import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  mobile: string;
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
  cropDetails: {
    cropName: string;
    startDate: Date;
    endDate: Date;
    soilReportUrl: string;
  };
}

const UserSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
  cropDetails: {
    cropName: String,
    startDate: Date,
    endDate: Date,
    soilReportUrl: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
