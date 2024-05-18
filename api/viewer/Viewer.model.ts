import mongoose from 'mongoose';
import {ViewerTypeData} from './viewer.types'
const Schema = mongoose.Schema;

//const geocoder = require('@/lib/nodeGeoCoder')

export const viewerSchema = new Schema<ViewerTypeData>(
  {
    login:  String,
    bio: String,
    uid: String,
    email:  String,
    password: String,
    stripe_account_id: String,
    hasWallet: Boolean,
    phone: String,
    avatar: {
      public_id: String,
      url: String
    },
    flagToken: {
      flag:String,
      token:String
    },
    organisation: String,
    status: String,

    website: String,
    instagram: String,
    telegram: String,
    

    events: [
      {
        id: String,
        title: String,
        content: String,
        startDate: String,
        addressGeo: String,
        endDate: String,
        status: String,
        contact: String
      }
    ],
 

    cha3bi: {
      type: Number,
      default: 10
    },
    bookings: [
      {
        bookingStartDate: Date,
        bookingEndDate: Date
      }
    ],

    guestProfiles: [
      {
        token: String,
        title: String,
        profileEmail: String,
        profileId: String,
        price: Number,
        flag: String,
        startDate: String,
        endDate: String,
        status: String
      }
    ],
    
    liismaiilProfiles: [
      {
        token: String,
        title: String,
        profileEmail: String,
        profileId: String,
        price: Number,
        flag: String,
        startDate: String,
        endDate: String,
        status: String
      }
    ],
    libraryProfiles: [{
      token: String,
      title: String,
      profileEmail: String,
      profileId: String,
      price: Number,
      flag: String,
      startDate: String,
      endDate: String,
      status: String
    }
  ],
    
    organisatorProfiles: [
      {
        token: String,
        title: String,
        profileEmail: String,
        profileId: String,
        price: Number,
        flag: String,
        startDate: String,
        endDate: String,
        status: String
      }
    ],
  
    coords: {
      long: Number,
      lat: Number
    },
    addressGeo: String,
    contact: String,
    city: String,
    country: String,
    state: String,
    continent: String,
    rewards: [String],

  },
  {
    timestamps: true
  }
);
viewerSchema.index({ uid: 1 }, { unique: true });
export default mongoose.models ? mongoose.models.Viewer ||
 mongoose.model('Viewer', viewerSchema) : mongoose.model<ViewerTypeData>('Viewer', viewerSchema);
