class Checkers {

  constructor() {
    this.table = new CheckersTable();

    this.clicked = false;
    this.turn = 'black';
  }

  start() { // começa o jogo , chamando as peças  e setando posições iniciais

    this.table.createPieces(); // instancia as damas
    this.table.setPieces(); // Table.js seta as peças na matrix
  }

 
  gameUpdate() {

    image(tabuleiro, 0, 0);

    this.updatePieces();

  }


  updatePieces() { // atualiza as imagens das damas

    if (this.clicked) {
      this.table.pieces[this.table.chosen].holdOn() // peça[n].hold.on == segura a peça,ou seja, prente a peça no mouse
    }

    for (var i in this.table.pieces)
      this.table.pieces[i].uptadeImage();

  }

  mouseEvent() {
    if (this.clicked) { // caso já tenha clicado,  a dama desgruda
      if (this.turn == 'light') { // true == brancas , false == pretas
        if (this.table.validPos(this.currentPiece,this.turn))
          this.turn = 'dark';

      } else if (this.table.validPos(this.currentPiece,this.turn))
        this.turn = 'light';


      this.clicked = false;

    } else if (this.table.findMan(this.turn) != -1) {
      this.table.chosen = this.table.findMan(this.turn);
      this.clicked = true;

      this.currentPiece = this.table.pieces[this.table.chosen];
      //    print("posAtual" + posAtual);

    }
  }
}