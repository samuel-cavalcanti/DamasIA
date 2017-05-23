var peça = [];
var on = false;
var cor = true;
var escolhido = -1;

function GameFunctions() {

  this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais
    xBranca = 81;
    yBranca = 25;
    xPreta = 25;
    yPreta = 305;
    umNãoUmSim = true;

    for (i = 0; i < 12; i++) { // chamando as peças

      peça[i] = new Dama();
      peça[12 + i] = new Dama();
    }



    for (i = 0; i < 12; i++) { // adicionando posições iniciais
      peça[i].pos.add(xBranca, yBranca);
      peça[i + 12].pos.add(xPreta, yPreta);

      xBranca += 112;
      xPreta += 112;

      if ((i + 1) % 4 == 0) {
        yBranca += 56;
        yPreta += 56;

        if (umNãoUmSim) {
          xBranca = 25;
          xPreta = 81;
          umNãoUmSim = false;
        } else {
          xBranca = 81;
          xPreta = 25;
        }




      }
    }
//teste = createVector(peça[8].pos.x+56, peça[8].y + 56);

  //  print(detectObject2(peça[8],teste ));

    //peça[8].pos.add(56,56,0);

    //print(detectObject2(peça[8].pos,  teste));



  };

  this.goingON = function() {
    image(tabuleiro, 0, 0);


    if (on) {
      peça[escolhido].hold(on); // segura a peça


    }

    //  print(peça[8].pos);

    updatePieces();






  };

}


function mouseClicked() { // ao clicar
  if (on) { // caso já tenha clicado,  a dama desgruda
    if (cor & validPos())
      cor = false;
    else if (validPos())
      cor = true;

    on = false;


  } else if (findDama(cor) != -1) {
    escolhido = findDama(cor);
    on = true;



    posAtual = createVector(peça[escolhido].pos.x, peça[escolhido].pos.y);
    //    print("posAtual" + posAtual);

  }
}

function updatePieces() { // atualiza as imagens das damas

  for (i = 0; i < 12; i++) {
    peça[i].branca();
    peça[i + 12].preta();

  }

}



function findDama(cor) { // procura  a peça
  if (cor) // se for for as fez das brancas  peças[i], tal que  0 <= i < 12
    j = 0;
  else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
    j = 12;


  for (i = 0; i < 12; i++) {
    if (detectDama(mouseX, mouseY, peça[i + j].pos.x, peça[i + j].pos.y, 55)) {

      return i + j;
    }

  }

  return -1;

}


function detectDama(x0, y0, x1, y1, tam) { // detecta se  o dama x0, y0 está dentro de x1,y1
  if (x0 >= x1 && x0 <= (x1 + tam) && y0 >= y1 && y0 <= (y1 + tam)) {
    return true;
  }
  return false;

}


function collision() {

  if (cor)
    j = 0;

  else
    j = 12;


  for (i = 0; i < 12; i++) {

    if (detectObject(peça[escolhido].pos.x, peça[escolhido].pos.y, peça[i + j].pos.x, peça[i + j].pos.y, 55) && peça[i + j])
      peça[i + j].pos.set(0, 0);
  }




}

function detectObject(x0, y0, x1, y1, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (x1 >= x0 && x1 <= (x0 + tam) && y1 >= y0 && y1 <= (y0 + tam) || (x1 + tam) >= x0 && (x1 + tam) <= (x0 + tam) && (y1 + tam) >= y0 && (y1 + tam) <= (y0 + tam))
    return true;

  else
    return false;

}

function validPos() {
  //print("mouseX: " + mouseX + " mouseY: " + mouseY);


  if (mouseX > 480 || mouseY > 480 || mouseX < 5 || mouseY < 5){

    peça[escolhido].pos = posAtual;
    return false;
  }

  /*  else if ( detectObject(posAtual.x, posAtual.y, posAtual.x+56,posAtual.y+56,55) ){
      print("entrou");
      peça[escolhido].pos = ( posAtual.add(56,56) );
      */

  

  return true;
}

function detectObject2(peça, novaPos, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (novaPos.x >= peça.x && novaPos.x <= (peça.x + tam) && novaPos.y >= peça.y && novaPos.y <= (peça.y + tam) || (novaPos.x + tam) >= peça.x && (novaPos.x + tam) <= (peça.x + tam) && (novaPos.y + tam) >= peça.y && (novaPos.y + tam) <= (peça.y + tam))
    return true;

  else
    return false;

}
