"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const useConnectionString = process.env.DATABASE_URL ? true : false; // PostgreSQL (kept for reference)
const mysqlUrl = process.env.MYSQL_URL || process.env.DATABASE_URL || '';
const useConnectionString = Boolean(mysqlUrl);
let sequelize;
if (useConnectionString) {
    // Use MySQL connection string if provided
    sequelize = new sequelize_1.Sequelize(mysqlUrl, {
        dialect: 'mysql',
        logging: false
    });
}
else {
    // Use individual MySQL connection parameters
    sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'quizmaster', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            max: 3
        }
    });
}
exports.default = sequelize;
/*
// Previous PostgreSQL configuration (kept commented per request):
// const useConnectionString = process.env.DATABASE_URL ? true : false;

// if (useConnectionString) {
//   sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//     dialect: 'postgres',
//     ssl: true,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
//   });
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME || 'quizmaster',
//     process.env.DB_USER || 'postgres',
//     process.env.DB_PASSWORD || '', // Try empty password
//     {
//       host: process.env.DB_HOST || 'localhost',
//       dialect: 'postgres',
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       logging: false,
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       },
//       retry: {
//         max: 3
//       }
//     }
//   );
// }
*/ 
