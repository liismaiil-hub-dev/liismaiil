import mongoose from 'mongoose';
const { RateLimiterMongo } = require('rate-limiter-flexible');

const mongoOpts = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
};
const connectAtlas = async (url = process.env.NEXT_PUBLIC_DB_ATLAS) => {
  mongoose.set('debug', true);
 // mongoose.set('strictQuery', true);
  try {
    const mongoInstance  = await mongoose.connect(url );
    const connection = mongoose.connection;
  
    return connection.on('connected', () => {
      return mongoose;
    });
  } catch (error) {
    console.log( {error});
    return { error, message: error.message };
  }
}; 

const connectLocal = async (url = 'mongodb://127.0.0.1:27017/liismaiil') => {
  mongoose.set('debug', true);
 // mongoose.set('strictQuery', true);
  try {
    mongoose.connect(url );
    const connection = mongoose.connection;
    return connection.on('connected', () => {
      return mongoose;
    });
  } catch (error) {
    console.log( {error});
    return { error, message: error.message };
  }
};

const connectMongoose = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await connectAtlas();
    } else if (process.env.NODE_ENV === 'production') {
      return await connectAtlas();
    }else if (process.env.NODE_ENV === 'box') {
      return await connectLocal();
    }
  } catch (error) {
    console.log({errorToConnect:error})
    throw Error(error);
  }
};
export default connectMongoose
