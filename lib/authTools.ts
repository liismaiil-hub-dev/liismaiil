import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { GuestType } from '@/api/graphql/stage/stage.types';
import { PROFILE_STATUS_ENUM } from '@/app/api/graphql/profile/profile.types';
import { FLAG_FILES } from '@/store/constants/flagArray';
import { DocumentData } from '@google-cloud/firestore';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import 'server-only';

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!

export const createTokenForGuest = (tokenId: number) => {
  const token = jwt.sign({ id: tokenId }, SECRET)
  return token
}

export const getGuestFromToken = async (token: string) => {
  try {
    console.log({ tokenGetGuestFromToken: token });

    //const tokenId = jwt.verify(token,SECRET)

    const guestSnapshot = await dbFirestore.collection('guests').doc(`${parseInt(token)}`).get();
    try {
      if (guestSnapshot.exists) {
        const randomFlag = _.random(FLAG_FILES.length)

        const { tokenId, collaboratorId, flag = FLAG_FILES[randomFlag], host, } = guestSnapshot.data() as GuestType;
        if (typeof tokenId === 'undefined' || tokenId === 0) {
          return null
        } else {
          return ({ collaboratorId, flag, host, tokenId, status: PROFILE_STATUS_ENUM.GUEST });
        }
      } else {
        return null

      }

    } catch (error) {
      console.log({ error });
      return null
    }

  } catch (error) {
    console.log({ error });
    return null
  }
}

export const signin = async ({ tokenId, password }: {
  tokenId: string,
  password: string
}) => {

  const guestSnapshot = await dbFirestore.collection('guests').doc(`${parseInt(tokenId)}`).get();
  try {
    if (guestSnapshot.exists) {

      const { tokenId, collaboratorId, flag, host, password: dbPassword } = guestSnapshot.data() as GuestType;
      if (password === dbPassword) {

        if (typeof tokenId === 'undefined' || tokenId === 0) {
          return { tokenId: 0, collaboratorId: 0, flag: '', host: 0 }
        } else {
          return { tokenId, collaboratorId, flag, host }
        };
      }
    } else {
      return { tokenId: 0, collaboratorId: 0, flag: '', host: 0 }


    }
    return { tokenId: 0, collaboratorId: 0, flag: '', host: 0 }

  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}

export const signup = async ({
  host,
  tokenId,
  country,
  collaboratorId,
  password
}: {
  host: string,
  collaboratorId: string,
  tokenId: string,
  country: string,
  password: string,
}) => {
  const guestSnapshot = await dbFirestore.collection('guests').doc(`${parseInt(tokenId)}`).get();
  try {

    if (!guestSnapshot.exists) {
      const hashedPass = await hashPassword(password)
      await dbFirestore.collection('guests').doc(`${tokenId}`).set({
        collaboratorId: collaboratorId ? collaboratorId : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
        tokenId,
        country,
        host: parseInt(host),
        password: hashedPass
      }, { merge: true });
      return {
        message: JSON.stringify({
          collaboratorId: collaboratorId ? collaboratorId : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
          tokenId,
          country,
        })
      };
    } else {
      const { host: hostRegistred, country: countryRegistred,
        collaboratorId: collaboratorIdRegistred, password: passRegistred } = guestSnapshot.data as GuestType | DocumentData


      if (await verifyPassword(password, passRegistred) === true) {

        return {
          message: JSON.stringify({
            collaboratorId: collaboratorIdRegistred ? collaboratorIdRegistred : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
            tokenId,
            country: countryRegistred,
            host: parseInt(hostRegistred)
          })
        }
      } else {
        return { message: 'you havent credential' }
      }
    }

  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}


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

export const verifyPassword = (passwordAttempt: string, hashedPassword: string) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};
