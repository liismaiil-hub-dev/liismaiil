import fs from 'node:fs/promises';
import path from 'path';
export const cleanOldFiles =  async () => {
    const sprintDirName = path.join(process.cwd(), 'sprints')
    const ms1day = 24 * 60 * 60 * 1000
    console.log({sprintDirName});
    
    
    try {
                const files =   fs.readdir(sprintDirName)
            files?.forEach((file, index) => {
                fs.stat(file, (err, stats) => {
                    if (err) return err
                    console.log({ stats });
                        if(stats){

                        }
                            console.log({ stats:'stats' });

                })

            })    
            } catch (error) {
                
            }
            
        
    
}
cleanOldFiles()