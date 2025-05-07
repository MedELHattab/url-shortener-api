import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model<IUrl>('Url', UrlSchema);