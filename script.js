// Atualiza o valor do bônus somando treino e outros
function atualizarBonus(pericia) {
    const treino = parseInt(document.getElementById(`treino-${pericia}`).value) || 0; // Valor padrão: 0
    const outros = parseInt(document.getElementById(`outros-${pericia}`).value) || 0; // Valor padrão: 0
    const bonus = treino + outros;

    // Atualiza o valor do bônus na interface
    document.getElementById(`bonus-${pericia}`).textContent = bonus;
}

// Rola o dado para a perícia e calcula o resultado
function rolarPericia(pericia) {
    const bonus = parseInt(document.getElementById(`bonus-${pericia}`).textContent) || 0;
    const dado = Math.floor(Math.random() * 20) + 1; // Rola 1d20
    const resultado = dado + bonus;

    // Exibe o resultado no campo apropriado
    document.getElementById(`valor-${pericia}`).textContent = resultado;

    // Envia o resultado para o Discord
    enviarParaDiscord(pericia, dado, bonus, resultado);
}

// Envia o resultado da rolagem para o Discord via webhook
async function enviarParaDiscord(pericia, dado, bonus, resultado) {
    const webhookURL = "https://discord.com/api/webhooks/1285426560404291687/Pkb3fAR0LOosvxzVyn4PR6oIX20ptqxLYEvqneWjQe_WWR0-4lo-H916jaRAXEVKD-5l";

    const data = {
        content: `**Rolagem de Perícia:**\n**${pericia}**\n🎲 **Dado:** ${dado}\n➕ **Bônus:** ${bonus}\n💥 **Resultado Final:** ${resultado}`,
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar para o Discord: ${response.statusText}`);
        }
        console.log("Resultado enviado ao Discord:", data.content);
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error.message);
    }
}
