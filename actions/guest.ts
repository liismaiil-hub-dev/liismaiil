'use server'
import { GuestType, LIISMAIIL_STATUS_ENUM, ProfileTypeData } from '@/app/api/graphql/profile/profile.types';
import prisma from "@/api/lib/prisma-db";
import { COOKIE_NAME } from '@/store/constants/constants';

import jwt from 'jsonwebtoken';
import { memoize } from "nextjs-better-unstable-cache";
import { createTokenForGuest, hashPassword, verifyPassword } from '@/app/api/lib/authTools';
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Guest } from "@prisma/client";

import { z } from 'zod';
import { GuestPrismaType, SuccessMessageOutput } from '@/app/api/graphql/stage/stage.types';
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!
//import { GuestPrismaType} from "@/db/schema";


const GuestSignInSchema = z.object({
  tokenId: z.number().int({message:'must be integer'}),
  host: z.number().int().lt(1000,{message:'must be integer'}),
  password: z.string({message:'must be your phone number'}),
  country: z.string().max(3,{message:'must be less than three character'}),

});
export type FormStateSigninType = {
  message: string,
  success: boolean,
  errors: {
    tokenId?:string[],
    host?:string[],
    password?:string[],
    country?:string[],}
  
}
export const signinGuestLocal = async (formState:FormStateSigninType,formData: FormData):Promise<FormStateSigninType > => {
  console.log(
    {country:formData.get('country') }
  );
  
  const {success, data, error} = GuestSignInSchema.safeParse({
    tokenId: parseInt(formData.get('tokenId') as unknown as string),
    password: formData.get('password'),
    host: parseInt(formData.get('host') as unknown as string),
    country: formData.get('country') ,
  })
  if(success){
  let  _signed: Guest ;
  try {
  const { tokenId, host, password,  country } = data;
  _signed = await prisma.guest.findFirst({where:{
    tokenId
  }}) 
  // (passwordAttempt: string, hashedPassword: string) => {
    const verif = await verifyPassword(password, _signed.password!)
     if(verif){
      console.log({_signed});
  const _signedUpdated = await prisma.guest.update({
    where:{tokenId},data:{onLine:true}
  })
    await cookies().set(COOKIE_NAME, createTokenForGuest(
    { tokenId, host,  country, flag:_signed.flag, status:_signed.status,
       onLine:true}))
      return({success:true, message:JSON.stringify({tokenId, host,  country, flag:_signed.flag, status:_signed.status, onLine:true}), errors:{}})
    } else {
      return({success:false, message: 'Sorry you can not signin', errors:{}})
    }
} catch (error: unknown ) {
  if(error instanceof Error){
    return({success:false, message: error.message, errors:{}})
 }else {
    return({success:false, message: 'An error occured', errors:{}})
}}
//redirect(`/stages/${data?.tokenId}`) 
//revalidatePath('/')
}else{
  return{success:false,message:'',errors:error.flatten().fieldErrors}
   }
//redirect(`/stages/${data?.tokenId}`) 
//revalidatePath('/')
}

export const registerGuestLocal = async (formState:FormStateSigninType, formData: FormData) => {
  const {data, success, error} = GuestSignInSchema.safeParse({
    tokenId: parseInt(formData.get('tokenId') as unknown as string),
    password: formData.get('password'),
    host: parseInt(formData.get('host') as unknown as string),
    country: formData.get('country') as unknown as string,
  })
  console.log({tokenId:formData.get('tokenId') ,
    password: formData.get('password'),
    host:parseInt(formData.get('host') as unknown as string),
    country:formData.get('country')
  }
  );
  
  if(success)
{  try {
    if(data.tokenId > 1000 && data.tokenId < 100000 && data.host != 0){
    const docRef = dbFirestore.collection('guests').doc(`${data.tokenId}`);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      const guestPassword = await hashPassword(data.password) as unknown as string

      const { tokenId, host,country  } = snapshot.data()as GuestType; 
     
      const _newGuest=  await prisma.guest.create({
             data:{ host: data.host , 
              tokenId: data.tokenId,
              password: data?.password,
              guestPassword: guestPassword!,
              startDate:new Date().toISOString(),
               collaboratorId: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
                country: data.country,
                status: LIISMAIIL_STATUS_ENUM.GUEST , 
                flag:`${(data.country).toLowerCase()}.png`,
                endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() ,
            }})
            return {success: true, message:JSON.stringify(_newGuest) } 
      } else {
      return{success:false, message:'this tokenId is not provided'}
      }
  }else {
    if(data.host === 3  && data.tokenId >  100000  ){
            const _flag = data.country.toLowerCase()
          try {
            const guestPassword = await hashPassword(data.password) as unknown as string
        const _newGuest=  await prisma.guest.create({
                    data:{ host: data.host , 
                     tokenId: data.tokenId,
                     password: guestPassword,
                     startDate:new Date().toISOString(),
                      collaboratorId:'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
                      country: data.country,
                      status: LIISMAIIL_STATUS_ENUM.GUEST , 
                      flag:`${_flag}.png`,
                      endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() },
                    })
            console.log({  _newGuest}) ;
              return {success: true, message:JSON.stringify(_newGuest), errors:{} } 
            } catch (error) {
            console.log({error});
              return {success:false,message:`You can not register to rooming db ${error}`, errors:{}}
  }}
  } 
}catch (e: unknown) {
  if(e instanceof Error){
    return ({success: false, message: ` ${e.message}` , errors:{}})
  }else  {
    return ({success: false, message: `you cant register with that tokenId due to ${e}` , errors:{}})}
  }}else {
  return{success:false,message:'',errors:error.flatten().fieldErrors} 
}}


export const signinGuestPrisma = async (formData: FormData) => {
  console.log({ formData });

  const data = GuestSignInSchema.parse({
    tokenId: parseInt(formData.get('tokenId') as unknown as string),
    password: formData.get('password'),
    host: parseInt(formData.get('host') as unknown as string),
  })
  console.log({ data });
  let direction = '/'
  try {
    const { tokenId, collaboratorId, host, flag, success } = await signinPrisma(data)
    if (typeof success == 'boolean' && success) {
      console.log({ flag, success });
      
      if (tokenId !== -1 && collaboratorId !== -1 && host !== -1) {
        cookies().set(COOKIE_NAME, createTokenForGuest(tokenId).toString())
        direction = `/stages/${tokenId}`
        // return { message: JSON.stringify({ collaboratorId, flag, host, tokenId }) }
        revalidatePath('/')
      }
    } else {
      direction = '/signUp'
    }
  } catch (e) {
    console.error(e)

  } finally {
    redirect(direction)
  }
}
export const getCountGuestsPrisma = async () => {
  try {
    const _nextGuest = await prisma.guest.count({where: {
          tokenId: {
          
             gt: 1000 
            },
          },
        })
        console.log(_nextGuest);
        return _nextGuest
  } catch (error) {
    console.log({error});
    }
}
export const getFreeGuestsPrisma = async () => {
  try {
    const _nextGuest = await prisma.guest.findMany({where: {
          tokenId: {
          
             gt: 10000 
            },
          },
        })
        console.log(_nextGuest);
        return _nextGuest
  } catch (error) {
    console.log({error});
    }
}


export const getGuestFromCookies = memoize(async (): Promise<GuestType | undefined | null> => {
  try {
    const token = await cookies().get(COOKIE_NAME)
    if (typeof token !== 'undefined') {
      const _guest = jwt.verify(token.value, SECRET)
      if(_guest){
      console.log({ _guest });
      //  const guest = await getGuestFromTokenPrisma(_guest?.tokenId!)
      return _guest as GuestType
    }else {
      console.log('No _guest');  
       //   (await cookies()).delete(COOKIE_NAME)

    }
  }
    redirect('/stages')
  } catch (e) {
    
    if(e instanceof Error){
      if(e.message === 'jwt expired'){
     // (await cookies()).delete(COOKIE_NAME)

      console.log({message: e.message});
      console.log({cause: e});
      //redirect(`/signin`)
    } else  {
      redirect(`/space`)

      }
        }
   // return null
  }
}, {
  persist: true,
  revalidateTags: () => ['stages', 'hosts'],
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'getGuestFromCookies'
})


export const getPrismaGuests = async (min=0, max=1000000) => {
  try {
    //console.log({ tokenGetGuestFromToken: token });
    const _guests = await prisma.guest.findMany({
      skip: min,
      take:max
       })
    
      if (_guests) {
        // const randomFlag = _.random(FLAG_FILES.length)

          return ({success: true, guests:JSON.stringify(_guests) });
        }else {
          return {success: false, guests:JSON.stringify([''])}
        }
    } catch (error) {
      return {success: false, guests:JSON.stringify(error)}
      }

}

export const getGuestStats = async (tokenId: number) => {
  try {
    console.log({ tokenGetGustStats: tokenId });
    const _guest = await prisma.guest.findFirst({
      where : {
        tokenId        
      },
      select:{
onLine: true,startDate: true,
flag: true,country: true,
sprints: {
  select:{ sprintId:true,addedAt:true, guest:{
    select:{
      tokenId: true,
      onLine:true
    }
  },},
},
stages: {
  select:{ stageId:true,addedAt: true,guest: {
    select:{
      tokenId: true,
      onLine:true
    }
  }},}
      },
       })
    
      if (_guest) {
        // const randomFlag = _.random(FLAG_FILES.length)

          return ({success: true, guest:JSON.stringify(_guest) });
        }else {
          return {success: false, guest: ''}
        }
    } catch (error) {
      return {success: false, guest:JSON.stringify(error)}
      }

}

export const logoutGuest = async (tokenId: number) => {
  try {
    console.log({ tokenGetGuestFromToken: tokenId });
    const _guest = await prisma.guest.update({
      where: { tokenId: tokenId }, data: {
        onLine: false
      }
    })
  await   cookies().delete(COOKIE_NAME);
    return { success: true, message: 'deconnected' }
  } catch (error) {
    cookies().delete(COOKIE_NAME);
    return { success: false, message: `guest ${tokenId} cant be disconnected due to ${error}` }

  }
}