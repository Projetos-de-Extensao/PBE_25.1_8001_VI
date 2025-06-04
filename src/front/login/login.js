// script.js
const apiUrl = "http://127.0.0.1:8000/api/cliente/";
const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

function exibir_erro(){
    messageElement.textContent = 'Email ou senha incorretos.'
    messageElement.style.color = 'red';
}
async function fetchContents() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Token d954d2903814c574fb1319f1d826bc1cd82ffe27',
        'Content-Type': 'application/json'
      }
    });
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = await response.json();

    data.forEach((cliente) => {
        if (cliente.nome === email && cliente.cpf === password){
            localStorage.setItem('clienteId', cliente.id);
            window.location.replace('/home/home.html')
        }
    });

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário


    fetchContents();
    setTimeout(exibir_erro, 500)

});





// Função para obter e listar conteúdos






