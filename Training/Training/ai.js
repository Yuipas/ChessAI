class ai {

  constructor(json = undefined) {

    if(json) {} else {
      this.selector = new neataptic.architect.Perceptron(448, 30, 30, 64);
      this.director = new neataptic.architect.Perceptron(64, 30, 30, 16);
    }

  }

}
