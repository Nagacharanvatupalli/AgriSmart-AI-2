import mongoose, { Document } from 'mongoose';

interface IDiagnosis extends Document {
  userId: mongoose.Types.ObjectId;
  imageBase64: string;
  diagnosisResult: string;
  caseId: string;
  createdAt: Date;
}

const DiagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageBase64: { type: String, required: true },
  diagnosisResult: { type: String, required: true },
  caseId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Diagnosis || mongoose.model<IDiagnosis>('Diagnosis', DiagnosisSchema);
