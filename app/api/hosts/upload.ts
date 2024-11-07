import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs';
//import { bucket} from '@/api/fb-utils-admin'
//import { authCheckMiddleware } from './utils-api';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import path from 'path';
import slug from 'slug';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
export const config = {
    api: {
        externalResolver: true
    }
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {

        case 'POST': {
            try {

                const _req = await JSON.parse(req.body);
                const filename = _req.name.replaceAll(" ", "_");
                const _file = new File([_req._file], slug(filename), { type: 'application/pdf' })

                if (!_file) {
                    return NextResponse.json({ success: false })
                }

                /*         const bytes = await file.arrayBuffer();
                       const buffer = Buffer.from(bytes); 
                const _path = join('/tmp', '')
                writeFile(_path, file);
                console.log(`open ${_path} to see file`);
                return NextResponse.json({ success: true });
                 */


                ;        // const filename = file.name.replaceAll(" ", "_");
                // console.log(filename);
                //   let encoded;

                // Get the file from the form data

                //const file = await req.formData()
                //const file = _formData.get('file');
                //        console.log({ file });
                //const fileExt = file?.split('.').pop();

                const buffer = Buffer.from(await _file.arrayBuffer());
                console.log(filename);
                let _tempFile = await writeFile(
                    path.join(process.cwd(), "public/assets/" + filename),
                    buffer
                );
                cloudinary.uploader.upload(
                    _tempFile,
                    {
                        public_id: `${slug(filename) - Date.now()}`, // public name
                        folder: 'lami1a/lessons'
                    },
                    function (error, result) {
                        if (error) {
                            throw new Error(error);
                        } else if (result) {
                            console.log({ result });
                            return res.send({ url: result.secure_url, public_id: result.public_id });
                        }
                    }
                );
            } catch (error) {
                console.log({ error });

                throw new Error(error.message);
            }
            break;
        }
        case 'DELETE': {
            try {
                const image_id = req?.body?.public_id;
                //console.log({ body: req.body });
                cloudinary.uploader.destroy(image_id, (error) => {
                    if (error) {
                        return res.json({ error });
                    }
                    return res.send({ deleted: 'OK' });
                });
            } catch (error) {
                throw new Error(error);
            }
            break;
        }
        default: {
            //console.log({ body: req.body });
            res.send({ success: 'ok' });
        }
    }
}
//const router = createEdgeRouter<NextRequest, NextFetchEvent>();
/* router.get(async (_, res) => {
  res.send({ success: true })
})
  .post(async (req, res) => {
    
  })
  .delete((req, res) => {
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
      throw new Error(error)
    }
  })


export default router.handler({
  onError: (err,) => {
    console.error(err.stack);
    return new NextResponse("Something broke!", {
      status: err.statusCode || 500,
    });
  },
  onNoMatch: (req, res, next) => {
    return res.status(404).end('Page is not found');
  }
}
); */
