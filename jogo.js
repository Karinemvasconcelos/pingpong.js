// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 220;
let diametro = 23;
let raio = diametro / 2;

// Variáveis Velocidade Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let wRaquete = 10;
let hRaquete = 90;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;

let colidiu = false;

// Variáveis Oponente
let xOponente = 585;
let yOponente = 250;
let velocidadeYOponente = 10

// Placar do Jogo
let meuPlacar = 0;
let placarOponente = 0; 

// Sons do Jogo
let raquetada;
let ponto;
let trilha;
function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBordas();
  mostraRaquete ( xRaquete , yRaquete);
  movimentoRaqueteDireita ();
  bolinhaNaoFicaPresa ();
  mostraRaquete (xOponente, yOponente); 
  movimentaOponente ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  verificaColisaoRaquete (xOponente, yOponente);
  placar ();
  marcaPlacar ();
 
  
  }

function mostraBolinha() {
  circle (xBolinha, yBolinha, diametro);
 
}

function movimentaBolinha() {
   xBolinha += velocidadeXBolinha;
   yBolinha += velocidadeYBolinha ;
}

function colisaoBordas() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) { 
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
}
}

function mostraRaquete (x, y) {
  rect( x, y, wRaquete, hRaquete)
}

function bolinhaNaoFicaPresa ( ){
    if (xBolinha - raio <= 0){
    xBolinha = 20;

    } else {

      if (xBolinha - raio >= 588){
        xBolinha = 570;
      }
    }
}

function movimentoRaqueteDireita () {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete +=10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete) {velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function verificaColisaoRaquete (x, y) {
  colidiu = collideRectCircle (x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function movimentaOponente () {
    if (keyIsDown(87)) {
    yOponente -=10;
  }
  if (keyIsDown(83)) {
    yOponente +=10;
  }
}


function placar () {
  stroke (255)
  textAlign (CENTER);
  textSize (25); 
  fill(color(255, 140, 0));
  rect ( 150, 10, 40, 22);
  fill (255);
  text (meuPlacar, 170, 29.5);
  fill (color(255, 140, 0));
  rect (450, 10, 40, 22);
  fill (255);
  text (placarOponente, 470, 29.5);
}

function marcaPlacar (){
  if (xBolinha > 588) {
    meuPlacar += 1;
    ponto.play();
  }
  if (xBolinha < 15) {
    placarOponente += 1;
    ponto.play();
  }
}
