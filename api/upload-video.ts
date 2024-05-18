import express from 'express';
import formidableMiddleware from 'express-formidable';
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { readFileSync} from 'fs'

const app = express()
app.use(express.json())

export const config = {
api:{
  bodyParser: false
}
}
app.use(formidableMiddleware());

app.post('/api/upload-video', async(req, res) => {

  try {
     const {files} = req; // contains files
     if(!files) {throw new Error('no file found')
    }else {
    

const file = files.video['path']; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = readFileSync(file);

 const s3Client = new S3Client({ region: 'eu-central-1' });
const newName = `${uuidv4().slice(0,5)}-${files.video['name']}`
 const params = {
  Bucket: "liismaiilvideos", // The name of the bucket. For example, 'sample_bucket_101'.
  Key: newName,//path.basename(fileStream) The name of the object. For example, 'sample_upload.txt'.
  Body: fileStream, // The content of the object. For example, 'Hello world!".
 ACL:'public-read',
  //ContentEncoding: 'base64',
   ContentType: files.video.type
};
 const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Success", data);
    return res.json({ data,name:newName})
   }
} catch (error) {
    throw new Error(error)
  }
 
});

app.delete('/api/upload-video', async (req, res) => {
 // contains non-file fields
  const {files} = req; // contains files
 const s3Client = new S3Client({ region: 'eu-central-1' });
const params = {
  Bucket: "liismaiilvideos", // The name of the bucket. For example, 'sample_bucket_101'.
  Key: `${uuidv4().slice(0, 5)}.${files.video['name']}`,//path.basename(fileStream) The name of the object. For example, 'sample_upload.txt'.
  Body:files.video[0]['path'], // The content of the object. For example, 'Hello world!".
 
  //ContentEncoding: 'base64',
  // ContentType:
};
try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.log("Success. Object deleted.", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
});
export default app