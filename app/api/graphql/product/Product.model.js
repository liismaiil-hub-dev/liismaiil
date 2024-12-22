import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true
    },
    titleSlug: {
      type: String,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      trim: true
    },
    author: {
      type: String,
      required: true
    },
    author_stripe_account_id: {
      type: String,
      required: true
    },
    image: {
      public_id: String,
      url: String
    },

    productStatus: String,
    discount: {
      type: Number,
      default: 25
    },
    promotedBy: [
      {
        profile: String,
        rate: Number
      }
    ],

    selection: {
      type: String
    },
    stock: {
      type: Number,
      required: false
    },
    promo: Number,

    reviews: [
      {
        type: String
      }
    ]
  },
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    timestamps: true
  }
);
/* profilSchema.index({email:1},{unique: true})
 */

export default mongoose.models
  ? mongoose.models.Product || mongoose.model('Product', productSchema)
  : mongoose.model('Product', productSchema);
