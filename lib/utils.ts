export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

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
