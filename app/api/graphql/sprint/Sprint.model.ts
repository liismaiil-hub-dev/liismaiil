import { SprintType } from 'app/api/sprint/sprint.types';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sprintSchema = new Schema<SprintType>(
  {
    _id: String,
    title: String,
    startDate: String,
    endDate: String,
    description: String,
    author: String,
    stages: [
      {
        id: Number,
        title: String,
        section: String,
        guests: [String],
        grids: [
          {
            id: Number,
            author: String,
            title: String,
            description: String,
            souraNb: Number,
            arabName: String,
            souraName: String,
            tabletWords: [
              {
                word: String,
                comment: String,
                index: Number,
                ayah: Number,
                lang: String
              }
            ],
            grid: Number,
            group: [Number],
            ayahs: [[{ order: Number, text: String, juz: Number, slice: String }]]
          }
        ],
      }
    ]
  },

  {
    timestamps: true
  }
);


export default mongoose.models ? mongoose.models.Sprint || mongoose.model<SprintType>('Sprint', sprintSchema) : mongoose.model<SprintType>('Sprint', sprintSchema);
