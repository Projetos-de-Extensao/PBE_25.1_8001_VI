// script.js
const apiUrl = "http://127.0.0.1:8000/api/token/"; // Certifique-se que esta URL está correta e o servidor está rodando
const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

// Função para exibir mensagens de erro ou sucesso
function showMessage(text, color) {
  messageElement.textContent = text;
  messageElement.style.color = color;
}

async function fetchContents() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/produto/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token bc3eaff461b276fd9a62c7041b6605f841598d8a',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const contentTable = document.querySelector("#contentTable tbody");
    contentTable.innerHTML = "";
    let valor_total = 0.0;

    data.forEach((produto) => {
      valor_total += parseFloat(produto.preco);
      const row = `
        <tr>
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${produto.preco}</td>
          <td>${produto.descricao}</td>
        </tr>
      `;
      contentTable.innerHTML += row;
    });

    const row1 = `
    <tr>
      <td colspan="4" text-align: center;>Valor total: R$ ${valor_total}</td>
    </tr>
    `;
    contentTable.innerHTML += row1

  } catch (error) {
    console.error("Erro ao buscar conteúdos:", error);
  }
}

async function fetchLoginToken() { // Renomeado para clareza e para retornar o token
  try {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação básica dos campos (opcional, mas recomendado)
    if (!username || !password) {
      showMessage('Por favor, preencha o email e a senha.', 'red');
      return null; // Retorna null se os campos não estiverem preenchidos
    }

    const credentials = { username, password }; // 'username' é mais comum que 'email' para o backend Django Rest Framework SimpleJWT

    console.log("Enviando credenciais:", credentials); // Log para depuração

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    console.log("Resposta recebida do servidor:", response); // Log para depuração

    if (!response.ok) {
      // Se a resposta não for OK (ex: 400, 401, 403, 404, 500)
      let errorMessage = `Erro: ${response.status} - ${response.statusText}`;
      try {
        const errorData = await response.json(); // Tenta pegar mais detalhes do erro do corpo da resposta
        console.error("Detalhes do erro do servidor:", errorData);
        // A API de token do SimpleJWT geralmente retorna erros em 'detail' ou nomes de campos
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.username) {
          errorMessage = `Erro no campo email: ${errorData.username.join(', ')}`;
        } else if (errorData.password) {
          errorMessage = `Erro no campo senha: ${errorData.password.join(', ')}`;
        } else {
            errorMessage = 'Email ou senha incorretos.'; // Mensagem genérica se não houver detalhes específicos
        }
      } catch (e) {
        // Se o corpo da resposta não for JSON ou estiver vazio
        console.error("Não foi possível parsear a resposta de erro como JSON:", e);
        errorMessage = 'Email ou senha incorretos. Resposta do servidor não é JSON.';
      }
      showMessage(errorMessage, 'red');
      return null; // Retorna null em caso de erro de resposta
    }

    // Se a resposta for OK (status 2xx)
    const data = await response.json();
    console.log("Token recebido:", data); // O token geralmente está em data.access e data.refresh
    return data; // Retorna os dados (que devem incluir o token)

  } catch (error) {
    // Erro de rede ou outro erro durante o fetch
    console.error("Erro na requisição fetch:", error);
    showMessage('Erro de conexão ao tentar fazer login. Verifique sua rede e se o servidor está online.', 'red');
    return null; // Retorna null em caso de erro de fetch
  }
}

loginForm.addEventListener('submit', async function(event) { // Tornamos a função do listener async
  event.preventDefault(); // Impede o envio padrão do formulário
  messageElement.textContent = ''; // Limpa mensagens anteriores

  // Chama a função fetchLoginToken e espera pelo resultado
  const tokenData = await fetchLoginToken();

  if (tokenData) {
    // Sucesso! O token foi recebido
    showMessage('Login bem-sucedido!', 'green');
    console.log('Token de acesso:', tokenData);
    localStorage.setItem('Token', tokenData.token);
    //chamar a funcao que faz o get e salvar o id
    window.location.href = '../home/home.html'

    // Aqui você pode, por exemplo, salvar o token no localStorage e redirecionar o usuário
    // localStorage.setItem('accessToken', tokenData.access);
    // localStorage.setItem('refreshToken', tokenData.refresh);
    // window.location.href = '/dashboard'; // Exemplo de redirecionamento
  } else {
    // Se tokenData for null ou não contiver 'access', o erro já foi exibido por fetchLoginToken
    console.log("Login falhou ou token não recebido.");
    // A função showMessage já foi chamada dentro de fetchLoginToken em caso de erro
  }
});
