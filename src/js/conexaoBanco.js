const sql = require('mssql')

const config = {
    integratedSecurity: true,
    server: 'DESKTOP-MUG77BH\SQLEXPRESS',
    database: 'TIAW.dbo',
    options: {
         encrypt: true // caso o servidor esteja configurado para usar SSL/TLS
    }
}

async function connect() {
  try {
    await sql.connect(config)
    console.log('Conectado ao banco de dados')
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err)
  }
}

connect()