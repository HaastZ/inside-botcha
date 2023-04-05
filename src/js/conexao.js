const express = require('express');
const app = express();

var mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: 'tiaw',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");
});



// Define a rota para receber os dados do formulário

app.use(express.urlencoded({ extended: true }));

app.post('./index.html', function(req, res) {
  const id = `SELECT idUsuario FROM usuario`;
    const idUsuario = 4;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

  const sql = `INSERT INTO usuario (idUsuario, nome, email, senha) VALUES ('${idUsuario}', '${nome}', '${email}', '${senha}')`;

  con.query(sql, function(err, result) {
    if (err) throw err;
  });

  res.redirect('/login.html');
});

module.exports = con;