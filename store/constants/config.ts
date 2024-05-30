
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd()
loadEnvConfig(projectDir)
const config = {
    PORT: process.env.PORT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_GRAPH_DEV: process.env.NEXT_PUBLIC_GRAPH_DEV,
    NEXT_PUBLIC_IMAGE_200: process.env.NEXT_PUBLIC_IMAGE_200,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_JWT_EXPIR: process.env.NEXT_PUBLIC_JWT_EXPIR,
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    NODE_ENV: process.env.NODE_ENV,

    LIISMAIIL_HOST: process.env.LIISMAIIL_HOST,
    LIISMAIIL_ORG: process.env.LIISMAIIL_ORG,
    LIISMAIIL_GUEST: process.env.LIISMAIIL_GUEST,
    // local web box
    APP_ENV: APP_ENV,

    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    NEXT_PUBLIC_DB_ATLAS: process.env.NEXT_PUBLIC_DB_ATLAS
}
export default config