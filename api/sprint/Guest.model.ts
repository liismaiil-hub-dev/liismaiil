import mongoose from 'mongoose';
import { Guest } from '@/api/sprint/sprint.types';
const Schema = mongoose.Schema;
export const GuestSchema = new Schema<Guest>(
  {
    token: String,
    cartId: String,
    flag: String,
    price: Number,
    uid: String,
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
  ? mongoose.models.Guest || mongoose.model<Guest>('Guest', GuestSchema)
  : mongoose.model<Guest>('Guest', GuestSchema);
