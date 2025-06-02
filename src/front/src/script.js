const apiUrl = "http://127.0.0.1:8000/api/produto/";

// Função para obter e listar conteúdos
async function fetchContents() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/produto/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 9ba76116e5a4da39be897dcbfaeafb32f54dfde4',
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

// Função para adicionar novo conteúdo
async function addContent(event) {
  event.preventDefault();

  const nomeElement = document.getElementById("nome");
  const precoElement = document.getElementById("preco");
  const descricaoElement = document.getElementById("descricao");


  if (!nomeElement || !descricaoElement || !precoElement) {
    alert("Erro: Um ou mais elementos do formulário não foram encontrados.");
    return;
  }

  const nome = nomeElement.value;
  const preco = precoElement.value;
  const descricao = descricaoElement.value;


  const contentData = {
    nome,
    preco,
    descricao,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Authorization': 'Token 9ba76116e5a4da39be897dcbfaeafb32f54dfde4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contentData),
    });

    if (response.ok) {
      alert("Conteúdo adicionado com sucesso!");
      fetchContents(); // Atualiza a lista de conteúdos
      document.getElementById("contentForm").reset(); // Limpa o formulário
    } else {
      const errorData = await response.json();
      alert(`Erro ao adicionar conteúdo 1: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao adicionar conteúdo 2:", error);
  }
}

// Inicializar a página carregando os conteúdos
document.addEventListener("DOMContentLoaded", fetchContents);

// Evento de envio do formulário
document.getElementById("contentForm").addEventListener("submit", addContent);