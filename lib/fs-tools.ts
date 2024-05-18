import fs from 'fs';

type SectionSourasType =
    {
        section: string;
        names: [
            {
                souraName: string;
                souraNb: number;
            }
        ];
    }

export const createSourasSectionsFile = async (sectionSoura: SectionSourasType[]) => {
    console.log(JSON.stringify(sectionSoura, null, 4))
    fs.readdir('public/fileCreated', (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                fs.writeFile(`public/fileCreated/section${sectionSoura['section']}.json`, (err, data) => {
                    if (err) throw err
                    console.log({ data })
                })
                /*  const file = fs.createWriteStream('tools/flags');
                 file.on('error', function (err) { throw new Error(err) });
                 file.write(`[` + '\n')
                 flagSet.forEach(function (v) {
                     file.write(`'${v}',` + '\n');
                     console.log({ v })
                 });
                 file.write(`]` + '\n')
                 file.end(); */

            } catch (error) {
                console.log({ error })
            }
        }
    })
} 