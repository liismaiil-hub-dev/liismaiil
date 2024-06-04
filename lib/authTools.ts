import { GuestType } from '@/api/graphql/sprint/sprint.types'
import { ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import guestsRegistred from '@/store/shares/guests.json'
import organisations from '@/store/shares/organisations.json'

import jwt from 'jsonwebtoken'
import _ from 'lodash'
import 'server-only'
export type GuestRegistrd = {
  host: string,
  tokenId: string
}
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!

export const createTokenForGuest = (tokenId: string) => {
  const token = jwt.sign({ id: tokenId }, SECRET)
  return token
}

export const getGuestFromToken = async (token: string) => {
  const payload = jwt.verify(token, SECRET) as { id: string }

  console.log({ payload });
  const _guest = _.findIndex(guestsRegistred!, function (o: GuestRegistrd) { return o.tokenId === payload.id });

  return _guest
}

export const signin = async ({ tokenId, host, country }: {
  host: string
  tokenId: string
  country: string
}) => {
  console.log({
    tokenId, host, country
  });

  const organisation = _.findIndex(organisations as ViewerTypeData[], function (o: ViewerTypeData) {
    console.log({ login: o.uid, host });

    return o.uid === host
  });

  if (organisations[organisation]?.guests && organisations[organisation]?.guests.length > 0) {
    const { guests } = organisations[organisation]

    const guest = _.findIndex(guests, function (o: { token: string }) {
      console.log({ o, tokenId });

      return o.token === tokenId
    });
    console.log({ guest53: guest });

    if (typeof guest === 'undefined' || guest === -1 && (typeof guestsRegistred !== 'undefined' && guestsRegistred.length > 0)) {
      console.log({ guestsRegistred });
      const guest = _.findIndex(guestsRegistred, function (o: GuestType) { return o.tokenId === tokenId });
      console.log({ guest });

      if (typeof guest === 'undefined' || guestsRegistred[guest].host !== host) throw new Error('no token Id found for this guest')
      const token = createTokenForGuest(tokenId)
      return { tokenId, token }
    } else {
      const token = createTokenForGuest(tokenId)
      return { tokenId, token }

    }


  } else {
    throw new Error('No guest Found')
  }
}

export const signup = async ({
  host,
  tokenId,
  country,
}: {
  host: string
  tokenId: string
  country: string
}) => {
  const inscription = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/guests`, {
    method: 'POST',
    body: JSON.stringify({ host, tokenId }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log({ inscr: inscription.json() })

  const token = createTokenForGuest(tokenId)

  return { tokenId, token }
}
