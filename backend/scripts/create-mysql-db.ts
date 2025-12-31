import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Load env values (DB_* used by the app; DB_ADMIN_* optional for this script)
dotenv.config();

// Admin creds to create the database/user
const adminUser = process.env.DB_ADMIN_USER || process.env.DB_ROOT_USER || 'root';
const adminPassword = process.env.DB_ADMIN_PASSWORD || process.env.DB_ROOT_PASSWORD || 'root';
const adminHost = process.env.DB_ADMIN_HOST || process.env.DB_HOST || 'localhost';
const adminPort = parseInt(process.env.DB_ADMIN_PORT || process.env.DB_PORT || '3306', 10);

// Target app database/user
const dbName = process.env.DB_NAME || 'quizmaster';
const appUser = process.env.DB_USER || 'quizuser';
const appPassword = process.env.DB_PASSWORD || 'quizpass';

async function main(): Promise<void> {
  console.log(`Connecting to MySQL as ${adminUser}@${adminHost}:${adminPort} ...`);
  const connection = await mysql.createConnection({
    host: adminHost,
    port: adminPort,
    user: adminUser,
    password: adminPassword,
    multipleStatements: true
  });

  // Create database and user if they do not exist
  const sql = `
    CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER IF NOT EXISTS '${appUser}'@'%' IDENTIFIED BY '${appPassword}';
    CREATE USER IF NOT EXISTS '${appUser}'@'localhost' IDENTIFIED BY '${appPassword}';
    GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${appUser}'@'%';
    GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${appUser}'@'localhost';
    FLUSH PRIVILEGES;
  `;

  console.log('Executing SQL to create database and user...');
  await connection.query(sql);
  await connection.end();
  console.log('Database/user setup complete.');
}

main().catch((err) => {
  console.error('Failed to create database:', err.message);
  process.exitCode = 1;
});
