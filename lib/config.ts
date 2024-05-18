import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
loadEnvConfig(projectDir)
const config = {
    LIISMAIIL_HOST: process.env.LIISMAIIL_HOST,
    LIISMAIIL_ORG: process.env.LIISMAIIL_ORG,
    LIISMAIIL_GUEST: process.env.LIISMAIIL_GUEST,
    APP_ENV: process.env.APP_ENV
}
export default config