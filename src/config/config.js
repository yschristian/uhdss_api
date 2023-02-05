const dotenv = require('dotenv');

dotenv.config();

module.exports ={
  development: {
    username:"postgres",
    password: "yubahwe12",
    database:"apply_board_db",
    host:process.env.DB_HOST,
    dialect:"postgres"
  },
  production: {
    username:process.env.DB_USERNAME,
    password:process.env.PASSWORD ,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:"postgres",
    dialectOptions: {}
  }
}