
import _ from 'lodash';

import { FLAG_FILES } from '@/store/constants/flagArray';


const arabic = /[\u0600-\u06FF]/;

export  function ayahWithoutPunct(ayah : string) {
  console.log({ayah});
  
  const _words = _.words(ayah);
  const __words = _words.map((w) => {
    // length: 1, code: 175
    //[1769, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758]0 ode: 1751
    const arrayAnot = [1769, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 65533,1758, 65279,1758, 1750 ,1754];
    console.log({word:w, code:w.charCodeAt(0)});
    
    let newWord: string = ''
    if (arabic.test(w) && w.length > 0) {

      for (let i = 0; i < w.length; i++) {
        if (arrayAnot.includes(w.charCodeAt(i))) {
          continue
        }

        newWord += w[i]
        //          console.log(newWord, w);
      }

      return newWord;
    }
  });
  console.log({__words});
  return __words
  
  
}

export async function genRandomToken() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 5;
  let token = '';
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    token += chars.substring(randomNumber, randomNumber + 1);
  }
  return token;
}

// fetch API
export const fetchFromApi = async (endpoint: RequestInfo | URL, opts: { method?: string; body: any }) => {
  const { method, body } = { method: 'POST', body: null, ...opts };
  const res = await fetch(endpoint, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.json();
};

export function genPassCollaborator() {
  //Math.random().toString(36).substr(2, 8)
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 5;
  let password = '';
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}
export function genRandomFlag() {
  var randomNumber = Math.floor(Math.random() * FLAG_FILES.length);
  return FLAG_FILES[randomNumber];
}

export function downloadJsonFile() {
  /*    try {
         const blob = new Blob([JSON.stringify(dataGetGridsByNb.getGridsByNb.grids)], { type: "text/json" });
         const link = document.createElement("a");
         const filename = `${dataGetGridsByNb.getGridsByNb.grids[0].souraName}.json`
 
         link.download = filename;
         link.href = window.URL.createObjectURL(blob);
         link.dataset.downloadurl = ["text/json", link.download, link.href].join("_");
 
         const evt = new MouseEvent("click", {
           view: window,
           bubbles: true,
           cancelable: true,
         });
 
         link.dispatchEvent(evt);
         link.remove()
       } catch (error) {
 
       } */

}
export function omitDeep(obj: any, key: string) {
  const keys = Object.keys(obj)
  const newObj: any = {}
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i]
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key)
      else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key)
      else newObj[i] = val
    }
  })
  return newObj
}

export function omitDeepArrayWalk(arr: [], key: string): any {
  return arr.map((val: any) => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key)
    else if (typeof val === 'object') return omitDeep(val, key)
    return val
  })
}
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};


export function omitIdDeep(obj: any, key: string) {
  const keys = Object.keys(obj)
  const newObj: any = {}
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i]
      if (Array.isArray(val)) newObj[i] = omitIdDeepArrayWalk(val, key)
      else if (typeof val === 'object' && val !== null) newObj[i] = omitIdDeep(val, key)
      else newObj[i] = val
    }
  })
  return newObj
}

export function omitIdDeepArrayWalk(arr: [], key: string): any {
  return arr.map((val: any) => {
    if (Array.isArray(val)) return omitIdDeepArrayWalk(val, key)
    else if (typeof val === 'object') return omitDeep(val, key)
    return val
  })
}

export const isValidImage = (value) => {
  if (!value) return true;
  if (typeof value !== 'string') return false;
  const img = ['jpg', 'jpeg', 'png', 'svg'];
  const ext = value.split('.').pop();
  return img.includes(ext);
};

