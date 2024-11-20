// Função para atualizar o bônus
function atualizarBonus(pericia) {
    const treino = parseInt(document.getElementById(`treino-${pericia}`).value);
    const outros = parseInt(document.getElementById(`outros-${pericia}`).value);
    const bonus = treino + outros;

    document.getElementById(`bonus-${pericia}`).textContent = bonus;
}

// Função para rolar a perícia
function rolarPericia(pericia) {
    const bonus = parseInt(document.getElementById(`bonus-${pericia}`).textContent);
    const rolagem = Math.floor(Math.random() * 20) + 1 + bonus;

    // Enviar para o Discord
    enviarParaDiscord(pericia, rolagem, bonus);
}

// Função para enviar o resultado ao Discord
async function enviarParaDiscord(pericia, rolagem, bonus) {
    const webhookURL = "https://discord.com/api/webhooks/SEU_WEBHOOK";

    const data = {
        content: `Rolagem de ${pericia}: 1d20 + ${bonus} = ${rolagem}`,
    };

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        alert(`Resultado enviado para o Discord: ${rolagem}`);
    } catch (error) {
        alert("Erro ao enviar para o Discord");
    }
}
