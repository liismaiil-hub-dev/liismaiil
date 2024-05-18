// pages/api/hello.js
import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
//import { bucket} from '@/api/fb-utils-admin'
//import { authCheckMiddleware } from './utils-api';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});
const handler = nc(
  {
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end('Something broke!');
    },
    onNoMatch: (req, res, next) => {
      res.status(404).end('Page is not found');
    },
  }
);
//TODO .use(authCheckMiddleware)
handler
  .post(async (req, res) => {
    //console.log({ body: req.body });
    try {
        cloudinary.uploader.upload(
      req.body,{
        public_id:`${Date.now()}`, // public name
        resource_type:'auto',
        folder: 'lami1a/avatar'
      } ,
     function  (error, result) {
        if(error) {
          console.log({error})
        }else if(result) {
        res.send({ url: result.secure_url, public_id: result.public_id })
     }}
      
    );
    } catch (error) {
      throw new Error(error)
    }
      
  })
  .delete((req, res) => {
    try {
      const image_id = req.body.public_id;
    //console.log({ body: req.body });
    cloudinary.uploader.destroy(image_id, (error, result) => {
      if (error) {
        res.json({ error });
      }
      res.send({ deleted: 'OK' });
    });
    } catch (error) {
      throw new Error(error)
    }
    
  });

export default handler;
