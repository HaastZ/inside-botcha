const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 9000;
//const conexao = require('./src/js/conexao.js');

/* 
Para iniciar o servidor, digite no terminal do windows/cmd/prompt de comando o seguinte: cd  (escreva o diretório do trabalho onde está o arquivo server.js) após isso digite: node server.js

para iniciar o servidor atualizando automaticamente conforme você faz alteração usa-se: nodemon server.js

assim vai iniciar o servidor em um ambiente local
*/


// Defina as rotas do seu servidor aqui
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src/css'));
app.use(express.static(__dirname + '/src/js'));

app.use(express.static(__dirname + '/img'));

app.get('/img/the-game-awards-jogo-do-ano-goty.jpg', (req, res) => {
  res.sendFile(__dirname + '/img/the-game-awards-jogo-do-ano-goty.jpg');
});

app.get('/img/fav-icon.png', (req, res) => {
  res.sendFile(__dirname + '/img/fav-icon.png');
});

app.get('/img/nome-site.png', (req, res) => {
  res.sendFile(__dirname + '/img/nome-site.png');
});

app.get('/img/perfil-icon.png', (req, res) => {
  res.sendFile(__dirname + '/img/perfil-icon.png');
});

app.get('/img/olho-aberto.png', (req, res) => {
  res.sendFile(__dirname + '/img/olho-aberto.png');
});

app.get('/img/olho-fechado.png', (req, res) => {
  res.sendFile(__dirname + '/img/olho-fechado.png');
});

app.get('/index.html', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/home.html', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/src/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/src/css/style.css');
});
app.get('/src/css/home.css', (req, res) => {
  res.sendFile(__dirname + '/src/css/home.css');
});

app.get('/src/js/abrirFecharCadastro.js', (req, res) => {
  res.sendFile(__dirname + '/src/js/abrirFecharCadastro.js');
});

app.get('/src/js/abrirFecharLogin.js', (req, res) => {
  res.sendFile(__dirname + '/src/js/abrirFecharLogin.js');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//Conexão com o banco de dados

//conexao.conexao();

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
    res.redirect('/home.html');
    } else {
      // Credenciais inválidas, redireciona de volta para a página de login
      res.redirect('/home.html');
  }
});
});