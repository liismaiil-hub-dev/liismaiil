//@ts-nocheck
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}


if (process.env.APP_ENV === 'LOC') {
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient();

    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient()
        }
        prisma = global.prisma;
    }

} else if (process.env.APP_ENV === 'WEB') {

    const libsql = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const adapter = new PrismaLibSQL(libsql);
    prisma = new PrismaClient({adapter});
}

//const adapter = new PrismaLibSQL(turso)//
//const prismaTurso = new PrismaClient({ adapter })





export default prisma;

