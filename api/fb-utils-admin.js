/* eslint-disable no-undef */
import * as admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.ADMIN_FIREBASE_project_id,
  private_key_id: process.env.ADMIN_FIREBASE_private_key_id, //config.private_key_id, //,
  private_key: process.env.ADMIN_FIREBASE_private_key, //config.private_key,
  client_email: process.env.ADMIN_FIREBASE_client_email,
  client_id: process.env.ADMIN_FIREBASE_client_id, //config.client_id, //,
  auth_uri: process.env.ADMIN_FIREBASE_auth_uri,
  token_uri: process.env.ADMIN_FIREBASE_token_uri,
  auth_provider_x509_cert_url: process.env.ADMIN_FIREBASE_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.ADMIN_FIREBASE_client_x509_cert_url,
};

//const serviceAccount = require("./dashlim.json");
!admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://dashlim-5f43b.appspot.com',
    })
  : admin.app();

//import { initializeApp, cert, getApp, deleteApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
export const dbFirestore = getFirestore();
//export const dbFirestore = admin.firestore().settings({ ignoreUndefinedProperties: true })
//dbFirestore.settings({ ignoreUndefinedProperties: true })
export const auth = getAuth();
export const timeStamp = Timestamp.now().toMillis();
export const bucketAvatar = getStorage().bucket('avatar');
export const bucketSelections = getStorage().bucket('selection');
export const bucketProducts = getStorage().bucket('product');
//import config from '@/config/dashlim-firebase.json';
//import firebase from '@/lib/db/firebase';
//import serviceAccount from '@/config/dashlim-firebase';

//deleteApp(getApp())
//if(getApp() ==='undefined'){
/*const defaultApp =   initializeApp({  
    credential: cert(serviceAccount),
    projectId: process.env.ADMIN_FIREBASE_project_id 

  });
  console.log(defaultApp.name)
//}
console.log({getApp:getApp()})
console.log({applicationDefault:applicationDefault()})
 */
