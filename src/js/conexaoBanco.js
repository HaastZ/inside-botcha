const sql = require('mssql');

const config = {
  user: 'username',
  password: 'password',
  server: 'server_name',
  database: 'database_name',
};

sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log('Database connection successful.');
});

module.exports = sql;