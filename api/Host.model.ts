import mongoose from 'mongoose';
import { HostTypeData } from './host.types'
const Schema = mongoose.Schema;

//const geocoder = require('@/lib/nodeGeoCoder')

export const hostSchema = new Schema<HostTypeData>(
  {
    uid: String,

    flag: String,
    token: String,


    cha3bi: {
      type: Number,
      default: 10
    },

    guests: [String],


    coords: {
      long: Number,
      lat: Number
    },
    addressGeo: String,
    contact: String,
    country: String,

  },
  {
    timestamps: true
  }
);
hostSchema.index({ uid: 1 }, { unique: true });
export default mongoose.models ? mongoose.models.Host ||
  mongoose.model('Host', hostSchema) : mongoose.model<HostTypeData>('Host', hostSchema);
