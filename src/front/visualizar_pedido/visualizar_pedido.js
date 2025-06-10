// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const listaDePedidosDiv = document.getElementById('listaDePedidos');
    const mensagemSemPedidosEnviadosDiv = document.getElementById('mensagemSemPedidosEnviados');

    // URL da API e token de autenticação
    const API_BASE_URL = "http://127.0.0.1:8000/api";
    // O seu código usa 'Token' como chave no localStorage, o que é um pouco incomum.
    // O mais comum é 'token' ou 'authToken'. Verifique se a chave 'Token' está correta.
    // O formato 'Token ...' é para TokenAuthentication do Django, enquanto 'Bearer ...' é para JWT.
    // Estou mantendo o seu formato.
    const authToken = localStorage.getItem('Token') ? `Token ${localStorage.getItem('Token')}` : null;


    // --- NOVA FUNÇÃO: Marcar pedido como pago ---
    const marcarComoPago = async (pedidoId) => {
        const payButton = document.querySelector(`.pay-button[data-pedido-id="${pedidoId}"]`);
        if (!payButton) return;

        payButton.disabled = true;
        payButton.textContent = 'Processando...';

        try {
            const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/pagar/`, {
                method: 'POST',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Não foi possível processar o pagamento.');
            }

            // Sucesso! Atualiza a UI
            const statusBadge = document.getElementById(`status-pedido-${pedidoId}`);
            if (statusBadge) {
                statusBadge.textContent = 'Pago';
                statusBadge.className = 'font-semibold text-blue-600'; // Nova classe para status 'pago'
            }
            payButton.remove(); // Remove o botão após o sucesso

        } catch (error) {
            console.error('Erro ao pagar:', error);
            alert(`Erro: ${error.message}`);
            payButton.disabled = false;
            payButton.textContent = 'Pagar';
        }
    };


    // Função para carregar os pedidos da API
    async function carregarPedidos() {
        if (!authToken) {
            console.error("Token de autenticação não encontrado.");
            listaDePedidosDiv.innerHTML = '<p class="text-center text-red-500">Erro: Você não está autenticado.</p>';
            return [];
        }

        try {
            const response = await fetch(`${API_BASE_URL}/pedidos/`, {
                method: 'GET',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const pedidos = await response.json();
            return Array.isArray(pedidos) ? pedidos : [];
        } catch (error) {
            console.error("Erro ao buscar pedidos da API:", error);
            listaDePedidosDiv.innerHTML = '<p class="text-center text-red-500">Não foi possível carregar os pedidos.</p>';
            return [];
        }
    }

    // Função para renderizar os pedidos na tela
    async function renderizarPedidos() {
        const pedidos = await carregarPedidos();

        // O seu backend já deve ordenar por data_de_criacao, então a ordenação no front pode ser removida
        // se a Meta `ordering = ['-data_de_criacao']` estiver no seu model.

        listaDePedidosDiv.innerHTML = ''; // Limpa a lista

        if (pedidos.length === 0) {
            mensagemSemPedidosEnviadosDiv.classList.remove('hidden');
            listaDePedidosDiv.classList.add('hidden');
        } else {
            mensagemSemPedidosEnviadosDiv.classList.add('hidden');
            listaDePedidosDiv.classList.remove('hidden');

            pedidos.forEach(pedido => {
                const pedidoCard = document.createElement('div');
                pedidoCard.classList.add('bg-white', 'p-5', 'sm:p-6', 'rounded-lg', 'shadow-md', 'order-card', 'mb-4');
                pedidoCard.id = `pedido-card-${pedido.id}`;

                // Lógica para o status e o botão
                const statusProduto = pedido.status || 'Status não informado';
                let statusClass = 'text-orange-600'; // em_analise (default)
                if (statusProduto === 'confirmado') statusClass = 'text-green-600';
                if (statusProduto === 'pago') statusClass = 'text-blue-600';
                
                // --- ATUALIZAÇÃO: Condicional para o botão "Pagar" ---
                let payButtonHTML = '';
                if (statusProduto === 'confirmado') {
                    // Adiciona um botão com data-attribute para identificar o pedido
                    payButtonHTML = `<button class="pay-button mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300" data-pedido-id="${pedido.id}">Pagar Pedido</button>`;
                }

                // Lógica para formatação de preço e data (mantida do seu código original)
                const precoFormatado = !isNaN(parseFloat(pedido.preco))
                    ? parseFloat(pedido.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : 'Preço indisponível';
                
                const displayId = pedido.id || 'ID não disponível';
                
                let displayData = 'Data não disponível';
                if (pedido.data_de_criacao) {
                    try {
                        displayData = new Date(pedido.data_de_criacao).toLocaleDateString('pt-BR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                    } catch (e) { console.warn("Erro ao formatar data."); }
                }

                pedidoCard.innerHTML = `
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3 mb-3">
                        <div>
                            <h3 class="text-xl font-semibold text-sky-700">ID do pedido: ${displayId}</h3>
                            <p class="text-sm text-slate-500">Data: ${displayData}</p>
                        </div>
                        <p class="text-lg font-semibold text-slate-800 mt-2 sm:mt-0">Total: ${precoFormatado}</p>
                    </div>
                    <div>
                        <h4 class="text-md font-semibold text-slate-700 mb-1">Detalhes do Pedido:</h4>
                        <div class="product-item-in-order py-2">
                            <p class="text-xs text-slate-500 mb-1"><strong>Descrição:</strong> ${pedido.descricao || 'Sem descrição'}</p>
                            <p class="text-xs text-slate-500"><strong>Status:</strong> 
                                <!-- ID ADICIONADO para ser encontrado pelo JavaScript -->
                                <span id="status-pedido-${pedido.id}" class="font-semibold ${statusClass}">
                                    ${statusProduto.replace('_', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- --- ATUALIZAÇÃO: Container para o botão --- -->
                    <div class="pedido-actions text-right">
                        ${payButtonHTML}
                    </div>
                `;
                listaDePedidosDiv.appendChild(pedidoCard);
            });
        }
    }

    // --- NOVA FUNCIONALIDADE: Delegação de evento para cliques nos botões "Pagar" ---
    listaDePedidosDiv.addEventListener('click', (event) => {
        // Verifica se o elemento clicado é um botão de pagar
        if (event.target && event.target.matches('.pay-button')) {
            const pedidoId = event.target.dataset.pedidoId;
            if (pedidoId) {
                marcarComoPago(pedidoId);
            }
        }
    });

    // Chama a função inicial para renderizar os pedidos
    renderizarPedidos();
});
