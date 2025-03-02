
//^ File process stream
import jsonfile from 'jsonfile';
import mime from 'mime';
import path from 'path';


export const dynamic = 'force-dynamic' // defaults to auto

export async function OPTION(request: Request) {

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
export const POST = async (req: Request) => {
  const organisations = await req.json()
  try {
    const cwd = process.cwd()
    const filename = `${process.cwd()}/store/shares/organisations.json`
    const mimetype = mime.getType(filename);
    //    console.log({ filename, mimetype });
    try {
      jsonfile.readFile(filename)
        .then(obj => {
          //now it an object
          console.log({ obj });
          // jsonfile.writeFile(filename, obj, { spaces: 2 }, function (err) {
          /* if (err) {
            console.error({ err })
          } */
          // const filestream = createReadStream(filename);
          const response = new Response()
          response.headers.set('Content-disposition', 'attachment; filename=' + filename)
          response.headers.set('Content-type', mimetype ? mimetype : 'text/json')
          return response
        }).catch(error => {
          console.log({ error });
          jsonfile.writeFile(filename, organisations, { flag: 'a', spaces: 2 }, function (err) {
            if (err) {
              console.error({ err })
              return new Response(JSON.stringify({ success: false, err }))
            }
            console.log('add organisations')

            // const filestream = createReadStream(filename);
            const response = new Response()
            response.headers.set('Content-disposition', 'attachment; filename=' + filename)
            response.headers.set('Content-type', mimetype ? mimetype : 'text/json')
            return response
          })
        })
    } catch (error) {
      console.log({ error });
      return new Response(JSON.stringify({ success: false, error }))
    }
  } catch (error) {
    console.log({ error });
    return new Response(JSON.stringify({ success: false, error }))
  }
}
export const GET = async (req: Request) => {
  const guestsDirName = path.join(process.cwd(), '/store/shares')
  console.log({ guestsDirName });

  try {
    const fileName = path.join(guestsDirName, `organisations.json`)
    /* readFile(fileName!, 'utf8', async (err, data) => {
      if (err) {
        console.log({ err });
        return new Response(JSON.stringify({ "success": false, err }), { status: 501 })
      } else {
        console.log({ data });
        return new Response(data, { headers: { 'content-type': 'text/json' } });
      }) */

    return jsonfile.readFile(fileName)
      .then(obj => {
        //now it an object
        console.log({ obj });
        //const filestream = fs.createReadStream(fileName);

        return new Response(JSON.stringify(obj));


      }).catch((error: any) => {
        return new Response(JSON.stringify({ "success": false, error }), { status: 501 })

      })
  }
  catch (err) {
    return new Response(JSON.stringify({ "success": false, err }), { status: 501 })

  }
}