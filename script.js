const produtos = [
    { id: 1, nome: "Baião de Dois Tradicional", preco: 28.90 },
    { id: 2, nome: "Tapioca de Carne de Sol com Queijo", preco: 16.50 },
    { id: 3, nome: "Suco de Caju Natural 500ml", preco: 8.00 }
];

let carrinho = [];

function carregarProdutos() {
    const list = document.getElementById('produtos-list');
    list.innerHTML = produtos.map(p => `
        <div class="card-produto">
            <h3>${p.nome}</h3>
            <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
            <button onclick="adicionarAoCarrinho(${p.id})">+ Adicionar</button>
        </div>
    `).join('');
}

function adicionarAoCarrinho(id) {
    const prod = produtos.find(p => p.id === id);
    carrinho.push(prod);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const box = document.getElementById('carrinho-itens');
    const totalEl = document.getElementById('total-valor');
    const btn = document.getElementById('btn-checkout');

    if (carrinho.length === 0) {
        box.innerHTML = "Carrinho vazio";
        totalEl.innerText = "0.00";
        btn.disabled = true;
        return;
    }

    box.innerHTML = carrinho.map(c => `<p>• ${c.nome} - R$ ${c.preco.toFixed(2)}</p>`).join('');
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    totalEl.innerText = total.toFixed(2);
    btn.disabled = false;
}

function aceitarLGPD() {
    document.getElementById('lgpd-banner').style.display = 'none';
    localStorage.setItem('lgpd_accepted', 'true');
}

function processarPagamento() {
    alert("Iniciando integração com Gateway de Pagamento Externo...");
    setTimeout(() => {
        alert("PAGAMENTO APROVADO! Pedido enviado para a cozinha de Raízes do Nordeste.\nCliente: KAUAN HEYMOWSKI (RU: 2237037)");
        carrinho = [];
        atualizarCarrinho();
    }, 1000);
}

window.onload = () => {
    carregarProdutos();
    if (localStorage.getItem('lgpd_accepted') === 'true') {
        document.getElementById('lgpd-banner').style.display = 'none';
    }
};
