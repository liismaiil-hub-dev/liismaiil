import { GuestType } from '@/api/graphql/sprint/sprint.types';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const GuestSchema = new Schema<GuestType>(
  {
    token: String,
    flag: String,
    price: Number,
    collaboratorId: String,
    enrollmentStatus: String,

    startDate: String,
    endDate: String,

    stages: [String]
  },
  {
    timestamps: true
  }
);

export default mongoose.models
  ? mongoose.models.Guest || mongoose.model<GuestType>('Guest', GuestSchema)
  : mongoose.model<GuestType>('Guest', GuestSchema);
