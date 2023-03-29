const express = require('express');
const app = express();
const port = 9003;

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

const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'DESKTOP-MUG77BH\\SQLEXPRESS',
  database: 'TIAW',
  driver: 'msnodesqlv8',
  options:{
    trustedConnection: true
  }
};

sql.connect(config, function(err){
  if(err){
    console.log('Erro ao conectar com o banco de dados' + err); 
  }
  else{
    var request = new sql.Request();
    request.query("select * from USUARIO", function(err, records){
      //Colocar ações do banco aqui
      if(err){
        console.log('Erro ao fazer a query no bando de dados: ' + err);
      }
      else{
        console.log(records);
      }
    })
  }
})