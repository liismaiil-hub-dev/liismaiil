import mongoose from 'mongoose';
import { TemplateInput } from '@/api/tablet/tablet.types';
const Schema = mongoose.Schema;
export const TemplateSchema = new Schema<TemplateInput>(
  {
    souraNb: Number,
    souraName: String,
    arabName: String,
    ayahs: [
      {
        text: String,
        order: Number,
        juz: Number,
        souraName: String,
        slice: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.TabletTemplate || mongoose.model<TemplateInput>('TabletTemplate', TemplateSchema);
