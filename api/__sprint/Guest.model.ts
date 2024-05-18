import { SprintGuest } from '@/api/__sprint/sprint.types';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const GuestSchema = new Schema<SprintGuest>(
  {
    token: String,
    flag: String,
    uid: String,
    time: String,
    stages: [String]

  },
  {
    timestamps: true
  }
);

export default mongoose.models.Guest || mongoose.model<SprintGuest>('Guest', GuestSchema);
