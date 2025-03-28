let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function atualizarUI() {
    const lista = document.getElementById("lista-transacoes");
    const saldo = document.getElementById("saldo");

    lista.innerHTML = "";
    let total = 0;

    transacoes.forEach((transacao, index) => {
        let li = document.createElement("li");
        li.classList.add(transacao.valor >= 0 ? "positivo" : "negativo");
        li.innerHTML = `
            ${transacao.descricao} <span>R$ ${transacao.valor.toFixed(2)}</span>
            <button onclick="removerTransacao(${index})">❌</button>
        `;
        lista.appendChild(li);
        total += transacao.valor;
    });

    saldo.innerText = total.toFixed(2);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (!descricao || isNaN(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    transacoes.push({ descricao, valor });
    atualizarUI();
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
}

function removerTransacao(index) {
    transacoes.splice(index, 1);
    atualizarUI();
}

atualizarUI();
