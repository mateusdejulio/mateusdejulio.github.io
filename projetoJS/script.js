let paisAtual = {};


function jogar(){

    if(localStorage.getItem("nome") !== null){
        window.location.href = "jogo.html";
        return;
    }
    else{

        let nome = document.getElementById("nome").value;

        if(nome.trim() === ""){
            alert("Por favor, digite seu nome para jogar!");
            return;
        }
        else{
            localStorage.setItem("nome", nome);
            window.location.href = "jogo.html";
        }
    }
}

function iniciar(){
    let nome = localStorage.getItem("nome");
    document.getElementById("mensagem").innerHTML = "Bem-vindo ao jogo, "+nome+"!";

    let tempo = 5;
    let intervalo = setInterval(function diminuirTempo(){
        tempo--;
        document.getElementById("tempo").innerHTML = tempo;
        if(tempo === 0){
            clearInterval(intervalo);
            document.getElementById("tempo").innerHTML = "<b>Qual a bandeira deste país?</b>";

             carregarPaises().then(() => {
             chamarBandeira();
            });   
        }
    }, 1000);


    let corretas = localStorage.getItem("corretas");
    let erradas = localStorage.getItem("erradas");
    if(corretas === null){
        corretas = 0;
    }
    if(erradas === null){
        erradas = 0;
    }
    document.getElementById("corretas").innerHTML = ""+corretas;
    document.getElementById("erradas").innerHTML = ""+erradas;
}

function chamarBandeira(){

    let indiceSorteio = Math.floor(Math.random() * siglas.length);

    let sorteada = siglas[indiceSorteio];   
    let nomePais = paises[sorteada];

    paisAtual = {sigla: sorteada, nome: nomePais};

    let url = "https://flagcdn.com/w320/"+paisAtual.sigla+".png";
    document.getElementById("imgBandeira").src = url;


}


function carregarPaises(){


    let url = "https://flagcdn.com/pt/codes.json";

    // Retorna a promise do fetch
    return fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro");
            }
            return resposta.json(); 
        })
        .then(dados => {
            paises = dados; // guarda o objeto
            siglas = Object.keys(paises); // cria lista de siglas
        })
        .catch(erro => console.error("Erro:", erro));
}


function checar(){

    let resposta = document.getElementById("resposta").value.trim().toLowerCase();
    if(resposta === ""){
        alert("Por favor, digite sua resposta!");
        return;
    }
    else{


        let paisCerto = paisAtual.nome;

        if(resposta === paisCerto.toLowerCase()){
            document.getElementById("resultado").innerHTML = "Perfeito! É "+paisAtual.nome+"!";
            acertou = true;
            atualizaResultado(acertou);
            document.getElementById("resposta").value = "";
            chamarBandeira();

        }
        else{
            document.getElementById("resultado").innerHTML = "Errado! O país é: "+paisAtual.nome+"!";
            acertou = false;
            atualizaResultado(acertou);
            document.getElementById("resposta").value = "";
            chamarBandeira();
        }
    }
}


var corretas = 0;
var erradas = 0;

function atualizaResultado(acertou){
    if(acertou){
        corretas++;
        document.getElementById("corretas").innerHTML = ""+corretas;
    }
    else{
        erradas++;
        document.getElementById("erradas").innerHTML = ""+erradas;
    }
}

function voltar(){
    localStorage.setItem("corretas", corretas);
    localStorage.setItem("erradas", erradas);
    window.location.href = "pontuacao.html";

    
}

function iniciarPagPontuacao(){

    let nome = localStorage.getItem("nome");
    document.getElementById("nome").innerHTML = nome;
    let corretas = localStorage.getItem("corretas");
    let erradas = localStorage.getItem("erradas");
    document.getElementById("corretas").innerHTML = ""+corretas;
    document.getElementById("erradas").innerHTML = ""+erradas;
}

function limparJogador(){
    localStorage.removeItem("nome");
    localStorage.removeItem("corretas");
    localStorage.removeItem("erradas");
    window.location.href = "index.html";
}


