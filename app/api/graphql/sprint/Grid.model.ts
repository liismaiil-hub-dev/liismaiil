import { GridTypeData } from '@/api/graphql/sprint/sprint.types';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const gridSchema = new Schema<GridTypeData>(
  {
    title: String,
    souraNb: Number,
    author: String,
    arabName: String,
    souraName: String,
    description: String,
    grid: Number,
    group: [Number],
    tabletWords: [
      {
        word: String,
        comment: String,
        index: Number,
        ayah: Number
      }
    ],
    ayahs: [
      [
        {
          text: String,
          order: Number,
          juz: Number,
          slice: String
        }
      ]
    ]
  },
  {
    timestamps: true
  }
);

//gridSchema.index({ title: 1 }, { unique: true });

export default mongoose.models.Grid || mongoose.model<GridTypeData>('Grid', gridSchema);
