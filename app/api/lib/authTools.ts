import { GuestType, LIISMAIIL_STATUS_ENUM, PROFILE_STATUS_ENUM } from '@/app/api/graphql/profile/profile.types';
import prisma from "@/api/lib/prisma-db";
import { COOKIE_NAME } from '@/store/constants/constants';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
//import "server-only";


const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!


export const createTokenForGuest = ({ tokenId, host,  country, flag, status, onLine}: {
  tokenId: number, host: number, 
   country: string, flag: string, status: string, onLine: boolean
}) => {
  const token = jwt.sign({ tokenId, host,  country, flag, status, onLine }, SECRET, { expiresIn: '1d' });
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
