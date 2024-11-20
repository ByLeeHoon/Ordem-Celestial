// Função para rolar o dado e calcular o resultado
function rolarDado() {
    let treino = parseInt(document.getElementById('treino').value);
    let outros = parseInt(document.getElementById('outros').value);
    let resultado = Math.floor(Math.random() * 20) + 1; // Rolando um dado de 20 lados
    let bonus = treino + outros;
    let resultadoFinal = resultado + bonus;

    // Exibindo o resultado na tela
    document.getElementById('resultado-dado').textContent = resultadoFinal;

    // Mostrando a caixa de resultado com uma animação suave
    let resultadoBox = document.getElementById('resultado');
    resultadoBox.style.display = 'block';

    // Fazendo a caixa de resultado desaparecer após 10 segundos
    setTimeout(function() {
        resultadoBox.style.display = 'none';
    }, 10000);

    // Enviar o resultado para o Discord via Webhook
    enviarDiscord(resultadoFinal);
}

// Função para enviar o resultado ao Discord
function enviarDiscord(resultado) {
    const webhookURL = "https://discord.com/api/webhooks/1285426560404291687/Pkb3fAR0LOosvxzVyn4PR6oIX20ptqxLYEvqneWjQe_WWR0-4lo-H916jaRAXEVKD-5l";
    
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `Resultado do dado: ${resultado}`
        })
    })
    .then(response => console.log('Mensagem enviada para o Discord:', response))
    .catch(error => console.error('Erro ao enviar para o Discord:', error));
}
