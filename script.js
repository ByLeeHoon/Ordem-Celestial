function rolarPericia(pericia) {
    const treino = parseInt(document.getElementById(`treino-${pericia}`).value);
    const outros = parseInt(document.getElementById(`outros-${pericia}`).value);
    const bonus = treino + outros;
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const resultado = rolagem + bonus;

    // Atualizar o bônus e resultado na interface
    document.getElementById(`bonus-${pericia}`).textContent = bonus;
    document.getElementById(`valor-${pericia}`).textContent = resultado;

    // Mostrar o resultado no Discord (seu webhook)
    fetch("https://discord.com/api/webhooks/1285426560404291687/Pkb3fAR0LOosvxzVyn4PR6oIX20ptqxLYEvqneWjQe_WWR0-4lo-H916jaRAXEVKD-5l", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: `**Rolagem de ${pericia}:** d20(${rolagem}) + bônus(${bonus}) = **${resultado}**`,
        }),
    });

    // Criar a caixa de resultado flutuante
    mostrarResultadoFlutuante(`Rolagem: d20(${rolagem}) + bônus(${bonus}) = ${resultado}`);
}

function mostrarResultadoFlutuante(mensagem) {
    // Criar a caixa flutuante
    const caixa = document.createElement("div");
    caixa.className = "resultado-flutuante";
    caixa.textContent = mensagem;

    // Adicionar a caixa ao body
    document.body.appendChild(caixa);

    // Remover a caixa após 5 segundos
    setTimeout(() => {
        caixa.remove();
    }, 5000);
}
