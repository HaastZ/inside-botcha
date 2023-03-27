const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('e-mail').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  localStorage.setItem('nome', nome);
  localStorage.setItem('email', email);
  localStorage.setItem('senha', senha);

    if(confirmarSenha != senha){
        alert('As senhas precisam ser iguais!');
    }
    else if(senha.lenght && confirmarSenha.lenght < 6){
        alert('A senha precisa ter mais de 5 caracteres')
    }
    else if(!nome || !email || !senha || !confirmarSenha){
        alert('preencha todos os campos');
    }
    else{
        alert('Cadastro realizado com sucesso!');
        window.location.href = './login.html'
    }
});


console.log(senha.lenght);