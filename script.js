// Atualiza o valor do bônus
function atualizarBonus(pericia) {
    const treino = parseInt(document.getElementById(`treino-${pericia}`).value);
    const outros = parseInt(document.getElementById(`outros-${pericia}`).value);
    const bonus = treino + outros;

    document.getElementById(`bonus-${pericia}`).textContent = bonus;
}

// Rola a perícia
function rolarPericia(pericia) {
    const bonus = parseInt(document.getElementById(`bonus-${pericia}`).textContent);
    const rolagem = Math.floor(Math.random() * 20) + 1 + bonus;

    // Exibe o resultado no lado direito
    document.getElementById(`valor-Adestramento`).textContent = rolagem;

    // Envia para o Discord
    enviarParaDiscord(pericia, rolagem, bonus);
}

// Envia o resultado para o Discord
async function enviarParaDiscord(pericia, rolagem, bonus) {
    const webhookURL = "https://discord.com/api/webhooks/1285426560404291687/Pkb3fAR0LOosvxzVyn4PR6oIX20ptqxLYEvqneWjQe_WWR0-4lo-H916jaRAXEVKD-5l";

    const data = {
        content: `Resultado da rolagem (${pericia}): 1d20 + ${bonus} = ${rolagem}`,
    };

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("Resultado enviado ao Discord:", rolagem);
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error);
    }
}
