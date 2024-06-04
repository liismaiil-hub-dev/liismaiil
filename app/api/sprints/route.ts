import path from "path";

import { readdir } from 'node:fs/promises';
//^ File process stream
export const GET = async (req: Request) => {
    const sprintsDirName = path.join(process.cwd(), '/store/sprints')

    try {

        const files = await readdir(sprintsDirName);
        console.log({ files });

        return Response.json(files)

    } catch (err) {
        console.error(err);
        return Response.json(err)
    }

}

