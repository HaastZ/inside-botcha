var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: 'tiaw',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");

  app.post('/index.html', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    const sql = `INSERT INTO USUARIO (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar usuário');
        }

        console.log('Usuário cadastrado com sucesso');
        res.redirect('/');
    });
});

});