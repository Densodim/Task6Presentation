import mysql from "mysql2/promise.js";

export const pool = mysql.createPool({
    host: 'guaa4.h.filess.io',
    user: 'task4_largeryes',
    password: 'a156ee57255294c987ef4241f5960f2f919f6432',
    database: 'task4_largeryes',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});