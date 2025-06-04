document.addEventListener('DOMContentLoaded', function() {
    const btnAdicionarProduto = document.getElementById('btnAdicionarProduto');
    const btnVerPedidos = document.getElementById('btnVerPedidos');
    const btnLogout = document.getElementById('btnLogout'); // Pega o novo botão

    if (btnAdicionarProduto) {
        btnAdicionarProduto.addEventListener('click', function() {
            window.location.href = '/adicionar_produto/adicionar_produto.html';
        });
    }

    if (btnVerPedidos) {
        btnVerPedidos.addEventListener('click', function() {
            window.location.href = '/pedidos/ver_pedidos.html';
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', function() {

            alert('Você foi desconectado!'); // Mensagem para o usuário

            window.location.href = '/login/login.html';
        });
    }
});