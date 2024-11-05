import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { GuestType, LIISMAIIL_STATUS_ENUM, PROFILE_STATUS_ENUM } from '@/app/api/graphql/profile/profile.types';
import prisma from "@/lib/prisma-db";
import { COOKIE_NAME } from '@/store/constants/constants';
import { FLAG_FILES } from '@/store/constants/flagArray';
import { DocumentData } from '@google-cloud/firestore';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { cookies } from 'next/headers';
import "server-only";


const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!

export function getGuestFromCookies(): GuestType | null {
  try {
    const token = cookies().get(COOKIE_NAME)
    if (typeof token !== 'undefined') {
      const _guest = jwt.verify(token.value, SECRET)
      console.log({ _guest });
      //  const guest = await getGuestFromTokenPrisma(_guest?.tokenId!)
      return _guest as GuestType
    }
    return null
  } catch (e) {
    console.error(e)
    return null
    //redirect(`/liismaiil/${slug(data.host)}`)
  }
}

export const createTokenForGuest = ({ tokenId, host, collaboratorId, country, flag, status, onLine
}: {
  tokenId: number, host: number, collaboratorId: string, country: string, flag: string, status: string, onLine: boolean
}) => {
  const token = jwt.sign({ tokenId, host, collaboratorId, country, flag, status, onLine }, SECRET, { expiresIn: '1d' });
  return token
}

export const logoutGuestFromPrisma = async (tokenId: number) => {
  try {
    console.log({ tokenGetGuestFromToken: tokenId });

    //const tokenId = jwt.verify(token,SECRET)

    const updatedOnline = await prisma.guest.update({
      where: { tokenId: tokenId },
      data: {
        onLine: false
      },
    })
    return { success: true }

  } catch (error) {
    console.log({ error });
    return { success: false }
  }
}

export const getGuestFromFirestoreGuestId = async (token: string) => {
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

export const signinPrisma = async ({ tokenId, password, host }: {
  tokenId: number,
  password: string,
  host: number
}): Promise<{
  success: boolean,
  tokenId: number,
  flag: string,
  host: number,
  collaboratorId: string
} | undefined> => {
  console.log({
    tokenId,
    password,
    host
  });

  const _guest = await prisma.guest.findFirst({ where: { tokenId } });
  try {
    if (_guest) {
      console.log({ _guest });

      const { tokenId, collaboratorId, flag, host, password: dbPassword } = _guest;
      const verif = await verifyPassword(password, dbPassword)
      if (verif) {

        return { success: true, tokenId, collaboratorId, flag, host, }
      };

    } else {
      return {
        tokenId: -1, collaboratorId: '', flag: '', host: -1, success: false,
      }
    }

  } catch (error: any) {
    console.log({ error });

    return {
      tokenId: -1, collaboratorId: '', flag: '', host: -1, success: false,
    }
  }
}

export const registerPrisma = async ({
  host,
  tokenId,
  country,
  status,
  password,
  flag,
  collaboratorId, startDate, endDate
}: {
  tokenId: number,
  password: string,
  host: number,
  country: string,
  flag: string,
  collaboratorId: string,
  status: string,
  startDate: string,
  endDate: string,

}): Promise<{ success: boolean } | undefined> => {

  const guestInDb = await prisma.guest.findFirst({ where: { tokenId: tokenId } });
  console.log({ regPrisma: tokenId });
  try {
    if (!guestInDb) {
      const statusVerif = tokenId >= 100 && tokenId < 1000 ? LIISMAIIL_STATUS_ENUM.HOST as string :
        LIISMAIIL_STATUS_ENUM.GUEST as string;
      const countryTmp = country ? country : 'OM';
      const newGuest = await prisma.guest.create({
        data: {
          tokenId: tokenId,
          host: host,
          password,
          collaboratorId: collaboratorId,
          country: country ?? countryTmp,
          flag,
          guestPassword: '123',
          status: statusVerif === status ? statusVerif : status,
          onLine: true,
          startDate,
          endDate,
        }
      })
      console.log({ newGuest });
      cookies().set(COOKIE_NAME, createTokenForGuest({
        tokenId, host, collaboratorId, country: country ?? countryTmp, flag, status: statusVerif === status ? statusVerif as string : status as string,
        onLine: true
      }))
      return ({
        success: true,
      })
    } else {
      return { success: false }
    }
  } catch (error: any) {
    console.error(error);
    return { success: false }

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
