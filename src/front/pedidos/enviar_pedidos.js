const apiUrl = "http://127.0.0.1:8000/api/pedidos/"; // Esta variável não está sendo usada no script atual

document.addEventListener("DOMContentLoaded", () => {
  const formAdicionarProduto = document.getElementById("formAdicionarProduto");
  const listaProdutosDiv = document.getElementById("listaProdutos");
  const mensagemSemProdutosDiv = document.getElementById("mensagemSemProdutos");
  const nomeProdutoInput = document.getElementById("nomeProduto");
  const precoProdutoInput = document.getElementById("precoProduto");
  const descricaoProdutoInput = document.getElementById("descricaoProduto");

  // Modal de confirmação
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  const botaoCancelarRemocao = document.getElementById("botaoCancelarRemocao");
  const botaoConfirmarRemocao = document.getElementById(
    "botaoConfirmarRemocao"
  );
  let produtoIdParaRemover = null;

  // Chave para o localStorage
  const LOCAL_STORAGE_KEY = "listaDeProdutosApp";

  // Função para carregar produtos do localStorage de forma mais robusta
  function carregarProdutos() {
    const produtosJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!produtosJSON) {
      return []; // Retorna array vazio se não houver nada no localStorage
    }
    try {
      const parsed = JSON.parse(produtosJSON);
      // Verifica se o resultado do parse é realmente um array
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        // Se não for um array, os dados estão em um formato inesperado ou corrompidos
        console.warn(
          "Dados no localStorage para produtos não são um array. Retornando lista vazia.",
          parsed
        );
        return [];
      }
    } catch (error) {
      // Se JSON.parse falhar (JSON malformado)
      console.error(
        "Erro ao parsear produtos do localStorage. Retornando lista vazia.",
        error
      );
      return [];
    }
  }

  // Função para salvar produtos no localStorage
  function salvarProdutos(produtos) {
    // Garante que estamos salvando um array
    if (Array.isArray(produtos)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(produtos));
    } else {
      console.error("Tentativa de salvar dados que não são um array no localStorage.", produtos);
      // Salva um array vazio para evitar corromper o localStorage com tipos errados
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }

  // Função para renderizar os produtos na tela
  function renderizarProdutos() {
    const produtos = carregarProdutos(); // Carrega os produtos
    listaProdutosDiv.innerHTML = ""; // Limpa a lista atual

    if (produtos.length === 0) {
      mensagemSemProdutosDiv.classList.remove("hidden");
      listaProdutosDiv.classList.add("hidden");
    } else {
      mensagemSemProdutosDiv.classList.add("hidden");
      listaProdutosDiv.classList.remove("hidden");
      produtos.forEach((produto) => { // Agora 'produtos' deve ser sempre um array
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add(
          "bg-slate-50",
          "p-4",
          "rounded-lg",
          "shadow",
          "flex",
          "flex-col",
          "sm:flex-row",
          "justify-between",
          "items-start",
          "sm:items-center",
          "feedback-animation" // Garanta que esta classe CSS exista se for para animação
        );
        produtoDiv.setAttribute("data-id", produto.id);

        // Verifica se produto.preco é um número antes de formatar
        const precoNumerico = parseFloat(produto.preco);
        const precoFormatado = !isNaN(precoNumerico)
          ? precoNumerico.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "Preço inválido";

        produtoDiv.innerHTML = `
          <div class="flex-grow mb-3 sm:mb-0">
            <h3 class="text-lg font-semibold text-sky-700">${
              produto.nome || "Nome não disponível"
            }</h3>
            <p class="text-md text-slate-600">${precoFormatado}</p>
            <p class="text-sm text-slate-500 mt-1">${
              produto.descricao || "Sem descrição"
            }</p>
          </div>
          <button data-id="${produto.id}"
                  class="remover-produto-btn bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-md text-sm transition duration-150 ease-in-out self-start sm:self-center">
            Remover
          </button>
        `;
        listaProdutosDiv.appendChild(produtoDiv);
      });
    }
    atualizarListenersRemocao();
  }

  // Função para mostrar o modal de confirmação
  function mostrarModalConfirmacao(id) {
    produtoIdParaRemover = id;
    modalConfirmacao.classList.remove("hidden");
  }

  // Função para esconder o modal de confirmação
  function esconderModalConfirmacao() {
    produtoIdParaRemover = null;
    modalConfirmacao.classList.add("hidden");
  }

  // Adiciona evento de submit ao formulário
  formAdicionarProduto.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o recarregamento da página

    const nome = nomeProdutoInput.value.trim();
    const preco = parseFloat(precoProdutoInput.value);
    const descricao = descricaoProdutoInput.value.trim();

    if (nome === "" || isNaN(preco) || preco < 0) {
      // TODO: Substituir alert por uma mensagem de erro mais visual na UI
      alert("Por favor, preencha o nome e um preço válido.");
      return;
    }

    const novoProduto = {
      id: Date.now().toString(), // ID único baseado no timestamp
      nome: nome,
      preco: preco,
      descricao: descricao,
    };

    const produtos = carregarProdutos();
    produtos.push(novoProduto);
    salvarProdutos(produtos);
    renderizarProdutos();

    // Limpa os campos do formulário
    formAdicionarProduto.reset();
    nomeProdutoInput.focus(); // Foca no primeiro campo para facilitar adição múltipla
  });

  // Função para atualizar os listeners dos botões de remoção
  function atualizarListenersRemocao() {
    const botoesRemover = document.querySelectorAll(".remover-produto-btn");
    botoesRemover.forEach((botao) => {
      const novoBotao = botao.cloneNode(true); // Clona o botão
      botao.parentNode.replaceChild(novoBotao, botao); // Substitui o botão antigo pelo novo (sem listeners)

      // Adiciona o event listener ao novo botão
      novoBotao.addEventListener("click", (event) => {
        const idProduto = event.target.dataset.id; // ou novoBotao.dataset.id
        mostrarModalConfirmacao(idProduto);
      });
    });
  }

  // Event listeners para o modal de confirmação
  botaoCancelarRemocao.addEventListener("click", esconderModalConfirmacao);

  botaoConfirmarRemocao.addEventListener("click", () => {
    if (produtoIdParaRemover) {
      let produtos = carregarProdutos();
      produtos = produtos.filter((p) => p.id !== produtoIdParaRemover);
      salvarProdutos(produtos);
      renderizarProdutos();
      esconderModalConfirmacao();
    }
  });

  // Define o ano atual no rodapé
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Renderiza os produtos ao carregar a página
  renderizarProdutos();
  nomeProdutoInput.focus(); // Foca no primeiro campo ao carregar

  // --- INÍCIO DAS MODIFICAÇÕES ---

  /**
   * Envia os dados do pedido para a API.
   * @param {object} contentData - Os dados do pedido (preço, descrição).
   * @returns {Promise<boolean>} - Retorna true se bem-sucedido, false caso contrário.
   */
  async function FazPost(contentData) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Authorization': `Token ${localStorage.getItem('Token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contentData),
      });

      if (response.ok) {
        alert("Pedido confirmado com sucesso!");
        return true; // Indica que o POST foi bem-sucedido
      } else {
        const errorData = await response.json();
        alert(`Erro ao confirmar pedido: ${errorData.message || response.statusText}`);
        return false; // Indica que o POST falhou
      }
    } catch (error) {
      console.error("Erro na requisição para confirmar o pedido:", error);
      alert("Ocorreu um erro de rede. Tente novamente.");
      return false; // Indica que o POST falhou
    }
  }

  let preco = 0;
  /**
   * Prepara a descrição e calcula o preço total do pedido.
   * @returns {string} - A descrição formatada do pedido.
   */
  function ConfirmaPedido() {
    preco = 0; // Reseta o preço total a cada chamada
    const jsonProdutos = carregarProdutos();
    let postDescricao = "";
    jsonProdutos.forEach(element => {
      postDescricao += `Nome: ${element.nome} - R$ ${element.preco} - Descrição: ${element.descricao}\n`;
      preco += element.preco;
    });
    return postDescricao;
  }

  // Listener para o botão de confirmar o pedido
  document.getElementById("botaoConfirmarPedido").addEventListener("click", async (event) => {
    event.preventDefault();

    const produtosAtuais = carregarProdutos();
    if (produtosAtuais.length === 0) {
        alert("Adicione produtos ao pedido antes de confirmar.");
        return;
    }

    const descricao = ConfirmaPedido();
    // const cliente = localStorage.getItem('clienteId');

    const contentData = {
      preco,
      descricao,
      // cliente
    };

    const sucesso = await FazPost(contentData); // Espera a função FazPost terminar

    if (sucesso) {
      // Se o post foi bem-sucedido, limpa a lista de produtos
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      // Re-renderiza a UI, que agora mostrará a lista vazia
      renderizarProdutos();
      console.log("Pedido confirmado e lista de produtos foi limpa.");
    } else {
      console.log("O pedido não foi confirmado. A lista de produtos foi mantida.");
    }
  });

  // --- FIM DAS MODIFICAÇÕES ---
});
