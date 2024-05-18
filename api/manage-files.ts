import express from 'express';
import fs, { readFile } from 'fs';

//^ File process stream
import mime from 'mime';
const jsonfile = require('jsonfile')

const { chain } = require('stream-chain');

const { parser } = require('stream-json');
const { pick } = require('stream-json/filters/Pick');
const { ignore } = require('stream-json/filters/Ignore');
const { streamValues } = require('stream-json/streamers/StreamValues');

const zlib = require('zlib');

const app = express();
app.use(express.json({ limit: '5mb' }));

export const config = {
  api: {
    bodyParser: false
  }
};

app.post('/api/download-sprints', async (req, res) => {
  try {
    const cwd = process.cwd()
    console.log({ cwd });

    const sprint = req.body.input
    console.log({ sprint });
    const filename = `${process.cwd()}/grids/${sprint.title}.json`
    const mimetype = mime.getType(filename);
    //    console.log({ filename, mimetype });
    try {
      jsonfile.readFile(filename)
        .then(obj => {
          //now it an object
          console.log({ obj });
          /*  obj.push(sprint); //add some data
           jsonfile.writeFile(filename, obj, { spaces: 2 }, function (err) {
             if (err) {
               console.error({ err })
             }
             res.setHeader('Content-disposition', 'attachment; filename=' + filename);
             res.setHeader('Content-type', mimetype ? mimetype : 'text/json');
             const filestream = fs.createReadStream(filename);
             return filestream.pipe(res);
           }) */

          res.setHeader('Content-type', 'text/json');
          const filestream = fs.createReadStream(filename);
          return filestream.pipe(res);

        }).catch(error => {
          // console.error({ error })
          jsonfile.writeFile(filename, [sprint], function (err) {
            if (err) console.error({ errWrite: err })
          })
        })
    } catch (error) {
      console.log({ error });

      jsonfile.writeFile(filename, [sprint], function (err) {
        if (err) console.error(err)
      })
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype ? mimetype : 'text/json');
      const filestream = fs.createReadStream(filename);
      return filestream.pipe(res);
    }

  }
  catch (err) {
    console.error(err);
    res.status(400).send('Bad request');
    return res.writeHead(err?.httpCode || 400, { 'Content-Type': 'application/json' });
  };
});
app.get('/api/download-sprints', async (req, res) => {
  try {

    const filename = `${process.cwd()}/sprints/tiwal.json`

    const stream = await readFile(filename, 'utf8', (err, data) => {
      if (err) return { err }
      console.log({ data });

      return res.json(JSON.parse(data))
    });

  } catch (err) {
    console.error(err);
    res.writeHead(err?.httpCode || 400, { 'Content-Type': 'text/plain' });
    res.status(400).send('Bad request');
    return;
  }
});
//      const s3Client = new S3Client({ region: 'eu-central-1' });

export default app;
