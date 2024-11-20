// Seletores
const treinoSelect = document.getElementById('treino');
const outrosInput = document.getElementById('outros');
const bonusSpan = document.getElementById('bonus');
const rollButton = document.getElementById('roll-button');
const resultadoBox = document.getElementById('resultado-box');
const resultadoSpan = document.getElementById('resultado');

// Atualiza o bônus ao mudar treino ou outros
function updateBonus() {
    const treino = parseInt(treinoSelect.value) || 0;
    const outros = parseInt(outrosInput.value) || 0;
    const bonus = treino + outros;
    bonusSpan.textContent = bonus;
}

// Função para rolar o dado
function rollDice() {
    const bonus = parseInt(bonusSpan.textContent) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const resultado = roll + bonus;

    // Mostra o resultado
    resultadoSpan.textContent = `Resultado: ${resultado}`;
    showResultado();

    // Envia para o webhook
    sendToDiscord(resultado, bonus);
}

// Mostra o resultado na caixa
function showResultado() {
    resultadoBox.classList.add('active');
    setTimeout(() => {
        resultadoBox.classList.remove('active');
    }, 10000); // Remove após 10 segundos
}

// Envia o resultado para o webhook do Discord
function sendToDiscord(resultado, bonus) {
    const webhookUrl = "https://discord.com/api/webhooks/1285426560404291687/Pkb3fAR0LOosvxzVyn4PR6oIX20ptqxLYEvqneWjQe_WWR0-4lo-H916jaRAXEVKD-5l";
    const message = {
        content: `**Adestramento**\n🎲 Rolagem: d20 + Bônus (${bonus})\nResultado final: ${resultado}`,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
        .then(response => {
            if (response.ok) {
                console.log("Resultado enviado ao Discord!");
            } else {
                console.error("Erro ao enviar para o Discord.");
            }
        })
        .catch(error => console.error("Erro:", error));
}

// Eventos
treinoSelect.addEventListener('change', updateBonus);
outrosInput.addEventListener('input', updateBonus);
rollButton.addEventListener('click', rollDice);

// Inicializa o bônus ao carregar a página
updateBonus();
