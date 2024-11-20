// Dados das perícias (com base na imagem)
const skills = [
  { name: "Acrobacia", dice: "AGI", bonus: 0, treino: 0, outros: 0 },
  { name: "Adestramento", dice: "PRE", bonus: 0, treino: 0, outros: 0 },
  { name: "Artes", dice: "PRE", bonus: 0, treino: 0, outros: 0 },
  { name: "Atletismo", dice: "FOR", bonus: 0, treino: 0, outros: 0 },
  { name: "Atualidades", dice: "INT", bonus: 0, treino: 0, outros: 0 },
  // Adicione as outras perícias aqui...
];

// Função para calcular o resultado da rolagem
function rollDice(skill) {
  const roll = Math.floor(Math.random() * 20) + 1; // D20
  const result = roll + skill.bonus + skill.treino + skill.outros;
  return result;
}

// Enviar resultado ao Discord via webhook
async function sendToDiscord(skillName, result) {
  const webhookUrl = "SEU_DISCORD_WEBHOOK_URL"; // Substitua pela URL do webhook
  const payload = {
    content: `Resultado da perícia "${skillName}": ${result}`
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    alert("Resultado enviado ao Discord!");
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    alert("Erro ao enviar o resultado!");
  }
}

// Função para gerar a tabela
function createTable() {
  const table = document.getElementById("skillsTable");

  skills.forEach((skill, index) => {
    const row = document.createElement("tr");

    // Nome da perícia
    const nameCell = document.createElement("td");
    nameCell.textContent = skill.name;

    // Dado
    const diceCell = document.createElement("td");
    diceCell.textContent = skill.dice;

    // Bônus
    const bonusCell = document.createElement("td");
    bonusCell.textContent = skill.bonus;

    // Treino
    const treinoCell = document.createElement("td");
    treinoCell.textContent = skill.treino;

    // Outros
    const outrosCell = document.createElement("td");
    outrosCell.textContent = skill.outros;

    // Resultado
    const resultCell = document.createElement("td");
    resultCell.id = `result-${index}`;
    resultCell.textContent = "-";

    // Ação (botão de rolar)
    const actionCell = document.createElement("td");
    const rollButton = document.createElement("button");
    rollButton.textContent = "Rolar";
    rollButton.addEventListener("click", () => {
      const result = rollDice(skill);
      document.getElementById(`result-${index}`).textContent = result;
      sendToDiscord(skill.name, result);
    });
    actionCell.appendChild(rollButton);

    // Adicionando células à linha
    row.appendChild(nameCell);
    row.appendChild(diceCell);
    row.appendChild(bonusCell);
    row.appendChild(treinoCell);
    row.appendChild(outrosCell);
    row.appendChild(resultCell);
    row.appendChild(actionCell);

    // Adicionando linha à tabela
    table.appendChild(row);
  });
}

// Inicializa a tabela ao carregar a página
window.onload = createTable;
