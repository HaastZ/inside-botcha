const express = require('express');
const app = express();
const mysql = require('mysql');


app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function conexao() {
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
  
  app.post('/index.html', function(req, res) {
  
    let id;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
  
    // obter o último ID inserido e adicionar mais 1
    con.query('SELECT MAX(idUsuario) + 1 as nextId FROM usuario', function(err, result) {
        if (err) throw err;
        id = result[0].nextId;
  
        const sql = `INSERT INTO usuario (idUsuario, nome, email, senha) VALUES ('${id}', '${nome}', '${email}', '${senha}')`;
  
        con.query(sql, function(err, result) {
            if (err) throw err;
        });
  
        res.redirect('/login.html');
    });
  });
  
  app.post('/login.html', function(req, res) {
  
    const email = req.body.email;
    const senha = req.body.senha;
  
    const sql = `SELECT * from usuario WHERE email = '${email}' AND senha = '${senha}'`;
  
    con.query(sql, function(err, result) {
      if (err) throw err;
  
      if (result.length > 0) {
        // Login bem-sucedido, redireciona para a página home
      const nomeUsuario = result[0].nome;
      res.redirect(`/home.html?nome/${nomeUsuario}`);
      } else {
        // Credenciais inválidas, redireciona de volta para a página de login
        res.redirect('/login.html');
    }
  });
  });
}



module.exports = {
  conexao: conexao,
};