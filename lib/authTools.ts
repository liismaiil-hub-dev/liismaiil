import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { GuestType, LIISMAIIL_STATUS_ENUM, PROFILE_STATUS_ENUM } from '@/app/api/graphql/profile/profile.types';
import prisma from "@/lib/prisma-db";
import { COOKIE_NAME } from '@/store/constants/constants';
import { FLAG_FILES } from '@/store/constants/flagArray';
import { DocumentData } from '@google-cloud/firestore';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import moment from 'moment';
import { cookies } from 'next/headers';
import "server-only";


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
export const getGuestFromTokenPrisma = async (token: number) => {
  try {
    console.log({ tokenGetGuestFromToken: token });

    //const tokenId = jwt.verify(token,SECRET)

    const _guest = await prisma.guest.findFirst({ where: { tokenId: token } })
    try {
      if (_guest) {
        const randomFlag = _.random(FLAG_FILES.length)

        const { tokenId, collaboratorId, flag = FLAG_FILES[randomFlag], host, } = _guest
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

export const signinPrisma = async ({ tokenId, password }: {
  tokenId: number,
  password: string
  host: number
}) => {

  const _guest = await prisma.guest.findFirst({ where: { tokenId } });
  try {
    if (_guest) {
      console.log({ _guest });

      const { tokenId, collaboratorId, flag, host, password: dbPassword } = _guest;
      const verif = await verifyPassword(password, dbPassword)
      if (verif) {

        return { success: true, tokenId, collaboratorId, flag, host, message: 'true' }
      };

    } else {
      return {
        tokenId: 0, collaboratorId: 0, flag: '', host: 0, success: true,
        message: 'token dont exist '
      }
    }

  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}

export const registerPrisma = async ({
  host,
  tokenId,
  country,
  collaboratorId,
  password,
}: {
  tokenId: number,
  password: string,
  host: number,
  country: string,
  collaboratorId: string,
}): Promise<{ message: string } | undefined> => {
  const guestInDb = await prisma.guest.findFirst({ where: { tokenId: tokenId } });

  try {

    if (!guestInDb) {
      const randomFlag = FLAG_FILES[_.random(FLAG_FILES.length)]
      const hashedPass = await hashPassword(password) as string;

      const guestPassword = await hashPassword('123') as string;
      const newGuest = await prisma.guest.create({
        data: {
          tokenId: tokenId,
          host: host,
          password: hashedPass,
          collaboratorId: collaboratorId ? collaboratorId : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
          country: country ? country : 'OM',
          flag: randomFlag,
          guestPassword: guestPassword,
          status: collaboratorId === 'O6cKgXEsuPNAuzCMTGeblWW9sWI3' ? LIISMAIIL_STATUS_ENUM.HOST : LIISMAIIL_STATUS_ENUM.GUEST,
          onLine: true,
          startDate: new Date().toISOString(),
          endDate: moment(Date()).add(1, 'years').toISOString(),
        }
      })
      console.log({ newGuest });
      cookies().set(COOKIE_NAME, createTokenForGuest(tokenId))
      return {
        message: JSON.stringify({
          message: 'success registration',
          success: true,
          tokenId,
          country,
          host
        })
      }
    } else {
      const { tokenId, host, password: passRegistred } = guestInDb
      const verif = await verifyPassword(password, passRegistred)
      if (verif) {
        if (typeof tokenId != 'undefined') {
          return { message: JSON.stringify({ tokenId: 0, collaboratorId: 0, flag: '', host: 0, success: false, message: 'you already registred please sign in ' }) }
        } else {
          return {
            message: JSON.stringify({ success: false, message: 'already regIstred try to sign in again', tokenId: 0, collaboratorId: 0, flag: '', host: 0 })
          };
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    return {
      message: JSON.stringify({
        tokenId: 0, collaboratorId: 0, flag: '', host: 0
      })
    }
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
