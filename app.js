document.getElementById('buscarCurto').addEventListener('click', function() {
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;

    if (!origem || !destino) {
        document.getElementById('saida').textContent = "Por favor, preencha ambos os campos.";
        return;
    }

    fetch(`https://127.0.0.1:7046/api/MovieGraph/shortestPath?actor1=${encodeURIComponent(origem)}&actor2=${encodeURIComponent(destino)}`)
        .then(response => {
            console.log('Response status:', response.status); // Para depuração
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Para depuração, veja o que é retornado

            if (data.length > 0 && data[0].path && Array.isArray(data[0].path) && data[0].length !== undefined) {
                const pathOutput = `Caminho: ${data[0].path.join(' -> ')} (Total de Caminhos: ${data[0].length})`;
                document.getElementById('saida').textContent = pathOutput;
            } else {
                throw new Error("Resposta da API não contém 'path' ou 'length'.");
            }
        })
        .catch(error => {
            document.getElementById('saida').textContent = `Error: ${error.message}`;
        });
});

document.getElementById('buscarTodos').addEventListener('click', function() {
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;

    if (!origem || !destino) {
        document.getElementById('saida').textContent = "Por favor, preencha ambos os campos.";
        return;
    }

    fetch(`https://127.0.0.1:7046/api/MovieGraph/bfsAllPaths?actor1=${encodeURIComponent(origem)}&actor2=${encodeURIComponent(destino)}`)
        .then(response => {
            console.log('Response status:', response.status); // Para depuração
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Para depuração, veja o que é retornado

            if (data.length > 0) {
                const paths = data.map((item, index) => {
                    return `Caminho ${index + 1}: ${item.path.join(' -> ')} (Total de elos: ${item.length})`;
                }).join('\n');

                document.getElementById('saida').textContent = paths;
            } else {
                document.getElementById('saida').textContent = "Nenhum caminho encontrado.";
            }
        })
        .catch(error => {
            document.getElementById('saida').textContent = `Error: ${error.message}`;
        });
});
