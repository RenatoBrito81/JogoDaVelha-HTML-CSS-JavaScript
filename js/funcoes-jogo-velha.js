var jogadorAtual = "X";
var jogadorVencedor = null;
var sequenciaVencedora = null;
var empate = false;
var contadoresPlacar = [0, 0, 0];

var sequenciasVencedoras = [
    ["q1","q2","q3"],
    ["q4","q5","q6"],
    ["q7","q8","q9"],
    ["q1","q4","q7"],
    ["q2","q5","q8"],
    ["q3","q6","q9"],
    ["q1","q5","q9"],
    ["q3","q5","q7"]
];

//Seta o jogador inicial
mudarJogador(jogadorAtual);

//Função para resetar o placar
function resetarPlacar(){
    contadoresPlacar[0]=0;
    contadoresPlacar[1]=0;
    contadoresPlacar[2]=0;
    document.getElementById("placar-jogador-x").innerHTML = contadoresPlacar[0];
    document.getElementById("placar-jogador-o").innerHTML = contadoresPlacar[1];
    document.getElementById("placar-empates").innerHTML = contadoresPlacar[2];
}

//Função para escolher o quadrado
function escolherQuadrado(idQuadrado){
    //Verifica se já há um vencedor
    if (jogadorVencedor !== null){
        return;
    }
    
    //Verifica se oquadrado seleciona está vazio
    var quadrado = document.getElementById(idQuadrado);
    if (quadrado.innerHTML !== '-'){
        return;
    }
    
    //Seta o quadrado com o jogador atual
    quadrado.innerHTML = jogadorAtual;
    quadrado.style.color = '#000';
    
    //Determina o próximo jogador
    if (jogadorAtual === 'X'){
        jogadorAtual = 'O';
    }
    else{
        jogadorAtual = 'X';
    }

    //Muda o jogador na tela
    mudarJogador();

    //Verifica se há um vencedor
    verificarVencedor();
}

//Função para mudar o jogador na tela
function mudarJogador(){
    document.getElementById("vez-jogador").innerHTML = jogadorAtual;
}

//Função para verificar se há um vencedor
function verificarVencedor(){
    var resultado = false;

    //Verifica as sequencias vencedoras
    for(const [indice, sequencias] of sequenciasVencedoras.entries()){
        var pos1 = document.getElementById(sequencias[0]);
        var pos2 = document.getElementById(sequencias[1]);
        var pos3 = document.getElementById(sequencias[2]);
        
        //Verifica se há alguma sequencia vencedora
        if(pos1.innerHTML !== "-" && pos1.innerHTML === pos2.innerHTML && pos1.innerHTML === pos3.innerHTML){
            resultado = true;
            sequenciaVencedora = indice;
            jogadorVencedor = pos1.innerHTML;
            
            //Seta o vencedor
            setarVencedor();
            
            //Atualiza o placar
            setarPlacar();
            
            break;
        }
    }

    if(resultado === false){
        //Verifica se aidna há jogadas disponíveis
        if(verificarJogadasDisponiveis() === false){
            empate = true;
            setarPlacar();
        }
    }
}

//Função para verificar se há jogadas disponíveis
function verificarJogadasDisponiveis(){
    var jogadasDisponiveis = false;

    //Verifica se hpá jogadas disponíveis
    for(sequencias of sequenciasVencedoras){
        for(sequencia of sequencias){
            if(document.getElementById(sequencia).innerHTML === "-"){
                jogadasDisponiveis = true;
                break;
            }

            if(jogadasDisponiveis === true){
                break;
            }
        }
    }
    return jogadasDisponiveis;
}

//Função para setar o vencedor
function setarVencedor(){
    var pos1 = document.getElementById(sequenciasVencedoras[sequenciaVencedora][0]);
    var pos2 = document.getElementById(sequenciasVencedoras[sequenciaVencedora][1]);
    var pos3 = document.getElementById(sequenciasVencedoras[sequenciaVencedora][2]);
    
    pos1.style.background = "#0f0"
    pos2.style.background = "#0f0"
    pos3.style.background = "#0f0"

    document.getElementById("ultimo-ganhador").innerHTML = "Jogador " + jogadorVencedor;
}

//Função para setar o placar
function setarPlacar(){
    //Verifica senão houve empate
    if(empate === false){
        if(jogadorVencedor === "X"){
            contadoresPlacar[0]++;
            document.getElementById("placar-jogador-x").innerHTML = contadoresPlacar[0];
        }
        else{
            contadoresPlacar[1]++;
            document.getElementById("placar-jogador-o").innerHTML = contadoresPlacar[1];
        }
    }
    else{
        contadoresPlacar[2]++;
        document.getElementById("placar-empates").innerHTML = contadoresPlacar[2];
    }
}

//Função para jogar novamente
function jogarNovamente(){
    jogadorAtual = "X";
    jogadorVencedor = null;
    sequenciaVencedora = null;
    empate = false;

    reiniciarQuadrados();

    document.getElementById("ultimo-ganhador").innerHTML = "";
}

//Função para reiniciar os quadrados
function reiniciarQuadrados(){
    for(sequencias of sequenciasVencedoras){
        for(sequencia of sequencias){
            document.getElementById(sequencia).innerHTML = "-";
            document.getElementById(sequencia).style.background = "#eee";
            document.getElementById(sequencia).style.color = "#eee";
        }
    }
}