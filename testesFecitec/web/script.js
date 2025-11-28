
//fazer com a api tambem
function verificarAdm() {
    var username = document.getElementById("username").value;

    if (username === 'adm') {
        alert("Logado como administrador!");
        window.location.href = 'pagAdm.html';
    }
    else {
        alert("Logado como aluno!");
        window.location.href = 'pagUser.html'
    }
}


function cadastrar() {

    // 1. URL do seu endpoint Java POST
    const urlApi = 'http://localhost:8080/apiFecitec/cadastrar'; // Substitua pela URL real

    // 2. Dados a serem enviados (objeto JavaScript)

    var nome = document.getElementById('nome');
    var ra = document.getElementById('ra');
    var email = document.getElementById('emailfull');
    var senha = document.getElementById('senha');
    var curso = document.getElementById('curso');
    var ano = document.getElementById('ano');
    var periodo = document.getElementById('periodo');

    const cadastro = {
        nome: nome,
        ra: ra,
        email: email,
        senha: senha,
        curso: curso,
        ano: ano,
        periodo: periodo
    };

    // 3. Configuração da requisição fetch()
    fetch(urlApi, {
        method: 'POST', // Método HTTP POST
        headers: {
            'Content-Type': 'application/json; charset=UTF-8' // Informa ao servidor que o corpo é JSON
        },
        body: JSON.stringify(cadastro) // Converte o objeto JavaScript em uma string JSON
    })
        .then(response => {
            // 4. Trata a resposta (primeiro, verifique se a resposta foi bem-sucedida)
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json(); // Analisa o corpo da resposta como JSON
        })
        .then(data => {
            // 5. Usa os dados retornados pela API Java (geralmente o objeto criado/salvo)
            console.log('Sucesso:', data);
            alert('Dados enviados com sucesso! ID retornado: ' + data.id);
        })
        .catch(error => {
            // 6. Trata quaisquer erros que ocorreram durante a operação
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar os dados.');
        });

}