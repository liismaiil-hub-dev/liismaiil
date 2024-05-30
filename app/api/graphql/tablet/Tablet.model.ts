import mongoose from 'mongoose';
export interface ITablet {
  id: string;
  title: string;
  description: string;
  arabName: string;
  soura: string;
  souraNumber: number;
  tabletWords: [
    {
      text: string;
      number: number;
    }
  ];
  ayahs: [
    {
      text: string;
      numberInSurah: number;
      number: number;
      juz: number;
      souraName: String;
    }
  ];
}
const Schema = mongoose.Schema;

export const tabletSchema = new Schema<ITablet>(
  {
    id: {
      type: String,
      trim: true,
      required: true
    },
    title: {
      type: String,
      trim: true,
      required: [true, ' You must give a title']
    },

    description: String,
    arabName: String,
    soura: String,
    souraNumber: Number,
    tabletWords: [
      {
        text: String,
        number: Number
      }
    ],
    ayahs: [
      {
        text: String,
        numberInSurah: Number,
        number: Number,
        juz: Number,
        souraName: String
      }
    ]
  },
  {
    timestamps: true
  }
);

tabletSchema.index({ id: 1 }, { unique: true });

export default mongoose.models.Tablet || mongoose.model<ITablet>('Tablet', tabletSchema);
