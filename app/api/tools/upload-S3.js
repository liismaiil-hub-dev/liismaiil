import nc from 'next-connect';
 import { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";


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
    const sesConfig = {
  accessKeyId: process.env.AWS_ACCESS_DEV_ID,
  accessSecret: process.env.AWS_ACCESS_DEV_SECRET,
  region:'eu-central-1'
}
const s3Client = new S3Client({ region: 'eu-central-1' });
const {video} = req
const base64Data = new Buffer.from(video.data.replace(/^data:video\/\w+;base64,/,''), 'base64')
const params = {
  Bucket: "liismaiilvideos", // The name of the bucket. For example, 'sample_bucket_101'.
  Key: req.video.name, // The name of the object. For example, 'sample_upload.txt'.
  Body: base64Data, // The content of the object. For example, 'Hello world!".
  ACL:'public-read',
  ContentEncoding: 'base64',
  // ContentType:
};

  // Create an Amazon S3 bucket.
  try {
    const data = await s3Client.send(
        new CreateBucketCommand({ Bucket: params.Bucket })
    );
    console.log(data);
    console.log("Successfully created a bucket called ", data.Location);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}).delete((req, res) => {
   return 
  });

export default handler;
/**
 * import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import {path} from "path";
import {fs} from "fs";

const file = "OBJECT_PATH_AND_NAME"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file);

// Set the parameters
export const uploadParams = {
  Bucket: "BUCKET_NAME",
  // Add the required 'Key' parameter using the 'path' module.
  Key: path.basename(file),
  // Add the required 'Body' parameter
  Body: fileStream,
};


// Upload file to specified bucket.
export const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
 */