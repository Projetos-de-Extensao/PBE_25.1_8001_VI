// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const listaDePedidosDiv = document.getElementById('listaDePedidos');
    const mensagemSemPedidosEnviadosDiv = document.getElementById('mensagemSemPedidosEnviados');

    // Chave do localStorage para buscar os pedidos confirmados
    // Deve ser a mesma chave usada na página de criação de pedidos (index.html)
    const PEDIDOS_CONFIRMADOS_KEY = 'pedidosConfirmadosApp';

    // Função para carregar os pedidos confirmados do localStorage
    function carregarPedidosConfirmados() {
        const pedidosJSON = localStorage.getItem(PEDIDOS_CONFIRMADOS_KEY);
        // Retorna os pedidos parseados ou um array vazio se não houver nada
        return pedidosJSON ? JSON.parse(pedidosJSON) : [];
    }

    // Função para renderizar os pedidos na tela
    function renderizarPedidos() {
        // Carrega os pedidos e os ordena pelos mais recentes (baseado no ID que contém um timestamp)
        const pedidos = carregarPedidosConfirmados().sort((a, b) => {
            // Extrai o timestamp do ID do pedido para ordenação
            const timestampA = parseInt(a.id.split('_')[1], 10);
            const timestampB = parseInt(b.id.split('_')[1], 10);
            return timestampB - timestampA; // Ordena em ordem decrescente (mais novo primeiro)
        });

        listaDePedidosDiv.innerHTML = ''; // Limpa a lista de pedidos existente na tela

        if (pedidos.length === 0) {
            // Se não houver pedidos, mostra a mensagem apropriada e esconde a lista
            mensagemSemPedidosEnviadosDiv.classList.remove('hidden');
            listaDePedidosDiv.classList.add('hidden');
        } else {
            // Se houver pedidos, esconde a mensagem de "sem pedidos" e mostra a lista
            mensagemSemPedidosEnviadosDiv.classList.add('hidden');
            listaDePedidosDiv.classList.remove('hidden');

            // Itera sobre cada pedido para criar seu card na tela
            pedidos.forEach(pedido => {
                const pedidoCard = document.createElement('div');
                // Adiciona classes do Tailwind CSS para estilização do card
                pedidoCard.classList.add('bg-white', 'p-5', 'sm:p-6', 'rounded-lg', 'shadow-md', 'order-card');

                // Monta o HTML para a lista de produtos dentro do pedido
                let produtosHtml = '<ul class="mt-3 space-y-2">';
                pedido.produtos.forEach(produto => {
                    const precoProdFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    produtosHtml += `
                        <li class="product-item-in-order py-2 flex justify-between items-center">
                            <div>
                                <span class="font-medium text-slate-700">${produto.nome}</span>
                                ${produto.descricao ? `<p class="text-xs text-slate-500">${produto.descricao}</p>` : ''}
                            </div>
                            <span class="text-sm text-slate-600">${precoProdFormatado}</span>
                        </li>
                    `;
                });
                produtosHtml += '</ul>';

                // Formata o valor total do pedido
                const totalPedidoFormatado = parseFloat(pedido.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                // Define o HTML interno do card do pedido
                pedidoCard.innerHTML = `
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3 mb-3">
                        <div>
                            <h3 class="text-xl font-semibold text-sky-700">Pedido #${pedido.id.split('_')[1]}</h3>
                            <p class="text-sm text-slate-500">Data: ${pedido.data}</p>
                        </div>
                        <p class="text-lg font-semibold text-slate-800 mt-2 sm:mt-0">Total: ${totalPedidoFormatado}</p>
                    </div>
                    <div>
                        <h4 class="text-md font-semibold text-slate-700 mb-1">Produtos:</h4>
                        ${produtosHtml}
                    </div>
                `;
                // Adiciona o card do pedido à div da lista de pedidos
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
