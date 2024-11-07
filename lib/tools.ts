
import _ from 'lodash';

import { FLAG_FILES } from '@/store/constants/flagArray';
import fs from 'node:fs';

export const createUrl = (path: string) => {
  return window.location.origin + path
}
export const createGridsDir = async () => {
  try {

    fs.access('grids', fs.constants.F_OK, async (err) => {
      if (err) {
        await fs.promises.mkdir('grids', (err, data) => {
          if (err) console.log({ err });
          console.log({ data });

        });
      }
    });
  } catch (error) {
    console.log({ error });
    return null

  }
};

export const getReadableFileStream = async (filename: string) => {
  try {

    if (!fs.existsSync(filename)) {
      return
    } else {
      const fileStream = fs.createReadStream(filename);
      return fileStream;
    }
  } catch (error) {
    return
    // console.log({ error });

  }
};


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
export async function genRandomFlagUrl() {
  var randomNumber = Math.floor(Math.random() * FLAG_FILES.length);
  const flagUrl = FLAG_FILES[randomNumber];

  return flagUrl;
}

export async function calculateOrderAmount(cartItems: LineItemType[]) {
  return (
    cartItems.reduce((total, product: LineItemType) => {
      return total + product.price_data.unit_amount * product.quantity;
    }, 0) * 100
  );
}

export const deleteTypenameTool = (obj: {
  [x: string]: any;
  name?: string;
  destination?: string;
  building?: string;
  street?: string;
  city?: string;
  state?: string;
  contact?: string;
  country?: string;
  zip?: string;
  isdefault?: boolean;
}) => {
  const newObject = {};
  for (const property in obj) {
    if (property !== '__typename') {
      newObject[property] = obj[property];
    }
  }
  return newObject;
};
const arabic = /[\u0600-\u06FF]/;
export const deleteArabicPunctuation = (ayah: string): string[] | undefined => {
  const _words = _.words(ayah);
  const __words = _words.map((w) => {
    // length: 1, code: 1750 ode: 1751
    const arrayAnot = [1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758];
    if (arabic.test(w) && w.length > 0 && !arrayAnot.includes(w.charCodeAt(0))) {
      console.log({ w, length: w.length, code: w.charCodeAt(0) });
      return w;
    }
  });
  if (typeof __words !== 'undefined' && __words[0] !== null) {
    return __words as string[];
  }
};

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
export const createTenLiis = async () => {
  const liisSet = new Set();
  while (liisSet.size < 10) {
    liisSet.add(genPassCollaborator());
  }
  try {
    const monArrayliis = [];
    liisSet.forEach(async (value) => {
      await monArrayliis.push({ pass: value, flag: genRandomFlag() });
    });
    return monArrayliis;
  } catch (error) {
    throw new Error(error);
  }
};
export const createHundredLiis = async () => {
  const liisSet = new Set();
  while (liisSet.size < 100) {
    liisSet.add(genPassCollaborator());
  }
  try {
    const monArrayliis = [];
    liisSet.forEach(async (value) => {
      await monArrayliis.push({ pass: value, flag: genRandomFlag() });
    });
    return monArrayliis;
  } catch (error) {
    throw new Error(error);
  }
};

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
/* const createFlagSet = async () =>{
  const flagSet =  new Set()
  fs.readdir('public/assets/img/flags',(err, files) => {
  if (err){
    console.log(err);}
  else {
  
    files.forEach((file, index) => {
       if (path.extname(file) == ".png")
       flagSet.add(file)
       
    }) 
    return  Array.from(flagSet.values()) 
  }
})
  }
 */
/* try {
       fs.writeFile('tools/flags.js',JSON.stringify(flagSet.values()), (err, data) => {
        if (err) throw new Error(err) 
        console.log(data
          )
      })   
      const file = fs.createWriteStream('tools/flags');
file.on('error', function(err) { throw new Error(err)});
file.write(`[` + '\n')
flagSet.forEach(function(v) { 
  file.write(`'${v}',` + '\n'); 
  console.log({v})
});
file.write(`]` + '\n')
file.end();
     
    } catch (error) {
      console.log({ error})
    } */
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

export const isSameAs = (getValues, field) => (value) => {
  if (!value) return true;
  if (typeof value !== 'string') return false;

  const comparedValue = getValues()[field];

  return comparedValue === value;
};

export const snapShotLooper = (snapshot) => {
  let data = {};
  snapshot.forEach((doc) => {
    const id = doc.id;
    data[id] = doc.data();
  });
  return data;
};
export const callsnapShotLooper = (snapshot) => {
  let data = {};
  console.log({ snapshot: snapshot.docs });
  snapshot[0].forEach((doc) => {
    const id = doc.id;
    data[id] = doc.data();
  });
  return data;
};

export async function putFlag() {
  try {
    const filename = `${process.cwd()}/store/shares/guests.json`
    const mimetype = mime.getType(filename);
    console.log({ filename, mimetype });
    jsonfile.readFile(filename)
      .then(obj => {
        //now it an object
        console.log({ obj });
        const flaguedGuests = obj.map((gust, index) => {
          const ind = (Math.ceil(Math.random() * FLAG_FILES.length))

          return {
            ...gust, flag: FLAG_FILES[ind]
          }
        })
        // jsonfile.writeFile(filename, obj, { spaces: 2 }, function (err) {
        /* if (err) {
          console.error({ err })
        } */
        // const filestream = createReadStream(filename);
        jsonfile.writeFile(filename, [...flaguedGuests], { spaces: 2 }, function (err) {
          if (err) {
            console.error({ err })

          }

        }
        )
      }).catch(error => {
        console.log({ error });
      })


  } catch (error) {
    console.log(error);
  }
}
