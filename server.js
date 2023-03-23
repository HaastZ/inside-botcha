const express = require('express');
const app = express();
const port = 9000;
/* 
Para iniciar o servidor, digite no terminal do windows/cmd/prompt de comando o seguinte: cd  (escreva o diretório do trabalho onde está o arquivo server.js) após isso digite: node server.js

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

app.get('/index.html', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/src/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/src/css/style.css');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});