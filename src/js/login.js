const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('senha');
  if(!email || !password){
    alert('preencha todos os campos')
  } 
  else if (email === savedEmail && password === savedPassword) {
    
    alert('Login realizado com sucesso!');
    window.location.href = './home.html'
  }
  else {
    alert('E-mail ou senha incorretos.');
  }
});