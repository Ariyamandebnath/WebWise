import mongoose, { Document, Schema } from 'mongoose';

interface IBrowsingActivity extends Document {
  url: string;
  searchTerm: string;
  thumbnail?: string;
  timeSpent: number;
  timestamp: Date;
}

const BrowsingActivitySchema: Schema = new Schema({
  url: { type: String, required: true },
  searchTerm: { type: String, required: false },
  thumbnail: { type: String, required: false },
  timeSpent: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

export const BrowsingActivity = mongoose.model<IBrowsingActivity>('BrowsingActivity', BrowsingActivitySchema);
