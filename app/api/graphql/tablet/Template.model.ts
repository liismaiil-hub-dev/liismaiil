import { TemplateInput } from '@/api/graphql/tablet/tablet.types';
import mongoose from 'mongoose';
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
