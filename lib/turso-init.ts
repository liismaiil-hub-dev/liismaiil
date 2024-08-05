//libsql://liismaiil-liismaiil.turso.io
import { createClient } from "@libsql/client";

export const turso = createClient({
    url: process?.env?.TURSO_DATABASE_URL ? process?.env?.TURSO_DATABASE_URL : "libsql://liismaiil-liismaiil.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
});


export const tursoLocal = createClient({
    url: `${process.env.DATABASE_URL}`,
    authToken: process.env.TURSO_AUTH_TOKEN,
});


const client = createClient({
    url: "file:path/to/db-file.db",
    syncUrl: "libsql://[databaseName]-[organizationName].turso.io",
    syncInterval: 60,
    authToken: "...",
});

