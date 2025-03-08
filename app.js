document.addEventListener("DOMContentLoaded", () => {
    const listaAmigos = [];
    const listaAmigosElement = document.getElementById("listaAmigos");
    const resultadoElement = document.getElementById("resultado");
  
    document.querySelector(".button-add").addEventListener("click", adicionarAmigo);
    document.querySelector(".button-draw").addEventListener("click", sortearAmigo);
  
    function adicionarAmigo() {
      const inputAmigo = document.getElementById("amigo");
      const nomeAmigo = inputAmigo.value.trim();
      if (nomeAmigo) {
        listaAmigos.push(nomeAmigo);
        atualizarListaAmigos();
        inputAmigo.value = "";
      }
    }
  
    function atualizarListaAmigos() {
      listaAmigosElement.innerHTML = "";
      listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigosElement.appendChild(li);
      });
    }
  
    function sortearAmigo() {
      if (listaAmigos.length < 2) {
        alert("É necessário pelo menos 2 amigos para realizar o sorteio.");
        return;
      }
  
      const sorteio = [];
      let tentativas = 0;
  
      while (true) {
        tentativas++;
        const amigosDisponiveis = [...listaAmigos];
        let valido = true;
        sorteio.length = 0;
  
        listaAmigos.forEach((amigo) => {
          const indexSorteado = Math.floor(Math.random() * amigosDisponiveis.length);
          const amigoSecreto = amigosDisponiveis.splice(indexSorteado, 1)[0];
          
          if (amigoSecreto === amigo) {
            valido = false;
          }
          
          sorteio.push({ amigo, amigoSecreto });
        });
  
        if (valido) {
          break;
        } else if (tentativas > 1000) {
          alert("Não foi possível realizar um sorteio válido. Por favor, tente novamente.");
          return;
        }
      }
  
      mostrarResultado(sorteio);
      limparListaAmigos();
    }
  
    function mostrarResultado(sorteio) {
      resultadoElement.innerHTML = "";
      sorteio.forEach((par) => {
        const li = document.createElement("li");
        li.textContent = `${par.amigo} tirou ${par.amigoSecreto}`;
        resultadoElement.appendChild(li);
      });
    }
  
    function limparListaAmigos() {
      listaAmigos.length = 0;
      listaAmigosElement.innerHTML = "";
    }
  });
  