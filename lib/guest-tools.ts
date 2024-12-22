/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
/* import randToken from 'rand-token';
 */
export const createToken = (guest:GuestPrismaType) => {
  return jwt.sign(
    {
      id: guest.id,
      tokenId: guest.tokenId,
      host: guest.host,
      iss: 'liismaiil',
      aud: 'liismaiil'
    },
    process.env.NEXT_PUBLIC_JWT_SECRE!,
    { algorithm: 'HS256', expiresIn: '5d' }
  );
};

export const verifyToken = async (token) => {
  // Sign the JWT
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const verifyPassword = (passwordAttempt:string, hashedPassword: string) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

export const requireAdmin = (req, res, next) => {
  if (!req.guest) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request'
    });
  }
  if (req.guest.role !== 'admin') {
    return res.status(401).json({ message: 'Insufficient role' });
  }
  next();
};
/* 
export const getRefreshToken = () => {
  return randToken.uid(64); 
};
 */
export const oneWeek = 7 * 24 * 3600 * 1000;

export const getDatePlusOneWeek = () => {
  const dateOnOneWeek = new Date(new Date().valueOf() + oneWeek);
  return dateOnOneWeek;
};
/* export const authorize= async (id, token, dbModel) => {
  try {
  const auth= await dbModel.findOne({_id:id, token}).lean().exec()
  return auth
} catch (error) {
  throw new Error(error)
}
} */
export const authorize = async (btoken, dbModel) => {
  try {
    if (btoken) {
      const token = btoken.split('Bearer ')[1];
      if (!token) return false;
      try {
        const auth = await dbModel.findOne({ refreshToken: token }).lean().exec();
        if (auth?.expiresAt?.toISOString() > new Date().toISOString()) {
          return auth.guest;
        } else return false;
      } catch (error) {
        throw new Error(error);
      }
    } else console.log('no token ');
    //return auth
  } catch (error) {
    throw new Error(error);
  }
};
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export const sortSouras = (sourasArray) => {
  return sourasArray.sort((a, b) => {
    return a._id - b._id;
  });
};
