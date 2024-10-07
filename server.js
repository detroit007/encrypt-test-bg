const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const createSequelizeInstance = (app) => {
  return new Sequelize(
    process.env.RDS_POSTGRESQL_DB, // Replace with your RDS database name
    process.env.RDS_POSTGRESQL_DB_USER, // Replace with your RDS database user
    process.env.RDS_POSTGRESQL_DB_PASSWORD, // Replace with your RDS database password
    {
      host: process.env.RDS_DB_HOST, // Replace with your RDS database host
      port: process.env.RDS_DB_PORT, // Replace with your RDS database port (default is 5432 for PostgreSQL)
      dialect: "postgres",
      logging: false, // Disable logging SQL queries
      "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": true
        }
      }
    }
  );
};

const initServer = async () => {
  try {
    const sequelize = createSequelizeInstance();
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database synced successfully.");
    // app.listen(PORT, () => {
    //   console.log(`Server is running on port ${PORT}.`);
    // });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { initServer };
