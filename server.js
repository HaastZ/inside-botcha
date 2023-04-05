const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 2020;

/* 
Para iniciar o servidor, digite no terminal do windows/cmd/prompt de comando o seguinte: cd  (escreva o diretório do trabalho onde está o arquivo server.js) após isso digite: node server.js

para iniciar o servidor atualizando automaticamente conforme você faz alteração usa-se: nodemon server.js

assim vai iniciar o servidor em um ambiente local
*/


// Defina as rotas do seu servidor aqui

app.use(express.static(__dirname + '/src/css'));
app.use(express.static(__dirname + '/src/js'));

app.use(express.static(__dirname + '/img'));

app.get('/img/the-game-awards-jogo-do-ano-goty.jpg', (req, res) => {
  res.sendFile(__dirname + '/img/the-game-awards-jogo-do-ano-goty.jpg');
});

app.get('/img/fav-icon.png', (req, res) => {
  res.sendFile(__dirname + '/img/fav-icon.png');
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

app.get('/src/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/src/css/style.css');
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

// Conexão com o banco de dados

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

app.post('/index.html', function(req, res) {

    const id = `SELECT idUsuario FROM usuario`;
    const idUsuario = 4;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

  const sql = `INSERT INTO usuario (idUsuario, nome, email, senha) VALUES ('${idUsuario}', '${nome}', '${email}', '${senha}')`;

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Usuário cadastrado com sucesso!");
  });

  res.redirect('/login.html');
});