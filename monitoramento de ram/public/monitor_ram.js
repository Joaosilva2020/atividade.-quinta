let limitePercentual = 80;

function definirLimite() {
  const valorInput = document.getElementById("limiteInput").value;
  const valor = parseInt(valorInput, 10);

  if (!isNaN(valor) && valor >= 1 && valor <= 100) {
    limitePercentual = valor;
    console.log("Novo limite definido:", limitePercentual);
  } else {
    console.warn("Valor inválido:", valorInput);
  }
}

async function carregarRAM() {
  try {
    const response = await fetch('/api/ram');
    const data = await response.json();

    const total = parseFloat(data.total);
    const used = parseFloat(data.used);
    const free = parseFloat(data.free);

   
    document.getElementById("total").innerText = total;
    document.getElementById("used").innerText = used;
    document.getElementById("free").innerText = free;


    const percent = Math.round((used / total) * 100);
    console.log("Uso atual:", percent);

    const barra = document.getElementById("barra");
    barra.style.width = percent + "%";


    if (percent < 60) {
      barra.className = "bg-green-500 h-4 rounded-full transition-all duration-500";
    } else if (percent < limitePercentual) {
      barra.className = "bg-yellow-500 h-4 rounded-full transition-all duration-500";
    } else {
      barra.className = "bg-red-600 h-4 rounded-full transition-all duration-500";
    }

    if (percent >= limitePercentual) {
      document.getElementById("alerta").innerText =
        "⚠️ Limite de RAM ultrapassado!";
    } else {
      document.getElementById("alerta").innerText = "";
    }

  } catch (error) {
    console.error("Erro ao buscar RAM:", error);
  }
}


carregarRAM();
setInterval(carregarRAM, 2000);