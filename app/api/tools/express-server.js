//const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
//TODO Verify
app.use(bodyParser.json({ limit: '2mb' }));
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    // upload products on cloudinary
    server.post('/api/upload', async (req, res) => {
      console.log({ body: req.body });

      try {
        cloudinary.uploader.upload(
          req.body,
          {
            public_id: `${Date.now()}`, // public name
            resource_type: 'auto',
            folder: 'lami1a/avatar'
          },
          function (error, result) {
            if (error) {
              console.log({ error });
            } else if (result) {
              res.send({ url: result.secure_url, public_id: result.public_id });
            }
          }
        );
      } catch (error) {
        throw new Error(error);
      }
    });
    server.delete('/api/upload', async (req, res) => {
      try {
        const image_id = req?.body?.public_id;
        //console.log({ body: req.body });
        cloudinary.uploader.destroy(image_id, (error, result) => {
          if (error) {
            res.json({ error });
          }
          res.send({ deleted: 'OK' });
        });
      } catch (error) {
        throw new Error(error);
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.DEV_PORT, (err) => {
      if (err) throw err;
      console.log(`ready to serve on ${process.env.LOCAL_API_URL}/${process.env.DEV_PORT} `);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
