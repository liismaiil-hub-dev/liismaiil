// npm install @sqlitecloud/drivers

const { Database } = require('@sqlitecloud/drivers');
const db = new Database(process.env.SQLITE_CLOUD);
const result = db.sql`SELECT * FROM stages;`;