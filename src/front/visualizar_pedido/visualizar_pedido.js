// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const listaDePedidosDiv = document.getElementById('listaDePedidos');
    const mensagemSemPedidosEnviadosDiv = document.getElementById('mensagemSemPedidosEnviados');

    // URL da API para buscar os pedidos
    const apiUrl = "http://127.0.0.1:8000/api/pedido/";
    // Token de autorização (idealmente, não deveria estar hardcoded assim em produção)
    const authToken = `Token ${localStorage.getItem('Token')}`;

    // Função para carregar os pedidos confirmados da API
    async function carregarPedidosConfirmados() {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Se a resposta não for OK (ex: 401, 404, 500), lança um erro
                console.error(`Erro HTTP: ${response.status} - ${response.statusText}`);
                const errorData = await response.text(); // Tenta pegar mais detalhes do erro
                console.error("Detalhes do erro:", errorData);
                return []; // Retorna um array vazio em caso de erro de resposta
            }

            const pedidos = await response.json();
            // Verifica se 'pedidos' é um array. Adapte conforme a estrutura real da sua API.
            // Se a API encapsular os pedidos dentro de uma propriedade (ex: { "results": [...] }),
            // você precisará ajustar para: return pedidos.results || [];
            return Array.isArray(pedidos) ? pedidos : [];
        } catch (error) {
            console.error("Erro ao buscar pedidos da API:", error);
            return []; // Retorna um array vazio em caso de erro na requisição/parse
        }
    }

    // Função para renderizar os pedidos na tela
    async function renderizarPedidos() {
        // Carrega os pedidos da API
        const pedidosDaApi = await carregarPedidosConfirmados();

        // Ordena os pedidos.
        const pedidos = pedidosDaApi.sort((a, b) => {
            // Tentativa de ordenação por um campo de data/timestamp.
            // Adapte 'a.data_criacao' e 'b.data_criacao' para os nomes reais dos campos na sua API.
            // Se os campos não existirem ou forem inválidos, a ordenação pode não funcionar como esperado.
            const dataA = new Date(a.data_criacao || a.data || 0); // Usa data_criacao, data ou um fallback
            const dataB = new Date(b.data_criacao || b.data || 0); // Usa data_criacao, data ou um fallback

            if (isNaN(dataA.getTime()) && isNaN(dataB.getTime())) return 0; // Ambos inválidos, não ordena
            if (isNaN(dataA.getTime())) return 1; // A inválido, B vem antes
            if (isNaN(dataB.getTime())) return -1; // B inválido, A vem antes

            return dataB - dataA; // Ordena em ordem decrescente (mais novo primeiro)
        });

        listaDePedidosDiv.innerHTML = ''; // Limpa a lista de pedidos existente na tela

        if (pedidos.length === 0) {
            mensagemSemPedidosEnviadosDiv.classList.remove('hidden');
            listaDePedidosDiv.classList.add('hidden');
        } else {
            mensagemSemPedidosEnviadosDiv.classList.add('hidden');
            listaDePedidosDiv.classList.remove('hidden');

            pedidos.forEach(pedido => {
                const pedidoCard = document.createElement('div');
                pedidoCard.classList.add('bg-white', 'p-5', 'sm:p-6', 'rounded-lg', 'shadow-md', 'order-card', 'mb-4');

                // MODIFICADO: Monta o HTML para os detalhes do produto diretamente do objeto pedido
                let produtosHtml = '<div class="mt-3 product-details-container">';

                // Assumindo que o objeto 'pedido' tem campos para o nome, preço, status e descrição do produto.
                // Adapte os nomes dos campos (ex: pedido.nome_produto, pedido.preco_produto) conforme a sua API.
                const nomeProduto = pedido.produto_nome || pedido.nome || '';
                const precoProduto = pedido.produto_preco || pedido.preco; // Preço específico do produto no pedido
                const statusProduto = pedido.produto_status || pedido.status || 'Status não informado';
                const descricaoProduto = pedido.produto_descricao || pedido.descricao || 'Sem descrição';

                const precoProdFormatado = !isNaN(parseFloat(pedido.preco))
                    ? parseFloat(precoProduto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : 'Preço indisponível';

                produtosHtml += `
                    <div class="product-item-in-order py-2">
                        <div class="flex justify-between items-start mb-1">
                            <span class="font-medium text-slate-700">${nomeProduto}</span>
                        </div>
                        <p class="text-xs text-slate-500 mb-1"><strong>Descrição:</strong> ${descricaoProduto}</p>
                        <p class="text-xs text-slate-500"><strong>Status:</strong> <span class="font-semibold ${statusProduto === 'confirmado' ? 'text-green-600' : 'text-orange-600'}">${statusProduto}</span></p>
                    </div>
                `;
                produtosHtml += '</div>';
                // FIM DA MODIFICAÇÃO

                const totalPedidoFormatado = !isNaN(parseFloat(pedido.total)) // Total geral do pedido
                    ? parseFloat(pedido.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : 'Total indisponível';

                const displayId = pedido.id || 'ID não disponível';

                let displayData = 'Data não disponível';
                if (pedido.data_criacao || pedido.data) {
                    try {
                        displayData = new Date(pedido.data_criacao || pedido.data).toLocaleDateString('pt-BR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                    } catch (e) {
                        console.warn("Erro ao formatar data do pedido:", pedido.data_criacao || pedido.data);
                    }
                }

                pedidoCard.innerHTML = `
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3 mb-3">
                        <div>
                            <h3 class="text-xl font-semibold text-sky-700">ID do pedido: ${displayId}</h3>
                            <p class="text-sm text-slate-500">Data: ${displayData}</p>
                        </div>
                        <p class="text-lg font-semibold text-slate-800 mt-2 sm:mt-0">Total: ${precoProdFormatado}</p>
                    </div>
                    <div>
                        <h4 class="text-md font-semibold text-slate-700 mb-1">Detalhes do Pedido:</h4>
                        ${produtosHtml}
                    </div>
                `;
                listaDePedidosDiv.appendChild(pedidoCard);
            });
        }
    }

    // Define o ano atual no rodapé da página
    const currentYearSpanPedidos = document.getElementById('currentYearPedidos');
    if (currentYearSpanPedidos) {
        currentYearSpanPedidos.textContent = new Date().getFullYear();
    }

    // Chama a função para renderizar os pedidos quando a página carregar
    renderizarPedidos();
});