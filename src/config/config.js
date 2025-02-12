const config = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "task-management-system",
      host: process.env.DB_HOST,
      dialect: "postgres",
    },
    test: {
      username: "your_db_user",
      password: "your_db_password",
      database: "your_test_db_name",
      host: "127.0.0.1",
      dialect: "postgres",
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "task-management-system",
      host: process.env.DB_HOST,
      dialect: "postgres",
    },
  };
  
  export default config;
  