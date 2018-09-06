let corvus;

let data = [];
let dataLength = 595;

let rawData;

let pieces = {
  P: [1, 0, 0, 0, 0, 0, 1],
  R: [0, 1, 0, 0, 0, 0, 1],
  N: [0, 0, 1, 0, 0, 0, 1],
  B: [0, 0, 0, 1, 0, 0, 1],
  Q: [0, 0, 0, 0, 1, 0, 1],
  K: [0, 0, 0, 0, 0, 1, 1],
  p: [1, 0, 0, 0, 0, 0, 0],
  r: [0, 1, 0, 0, 0, 0, 0],
  n: [0, 0, 1, 0, 0, 0, 0],
  b: [0, 0, 0, 1, 0, 0, 0],
  q: [0, 0, 0, 0, 1, 0, 0],
  k: [0, 0, 0, 0, 0, 1, 0],
};


function preload() {

  console.log('Loading data');
  let t = Date.now();

  rawData = loadJSON('bigFile.json');

  console.log('Data loaded (' +(Date.now() - t)+ ' mil)');
}

function oneHot(i, depth) {
  let array = new Array(depth).fill(0);
  array[i] = 1;
  return array;
}

function to1Index(x,y) {
  return x + y*8;
}


function prepareData() {

  pieces["-"] = [0, 0, 0, 0, 0, 0, 0];

  for(let i = 0; i < 595; i++) {
    let file = rawData[i];

    for(let position in file) {

      let inputs = [];

      for(let letter of position) {
        inputs.push.apply(inputs, pieces[letter]);
      }

      let select = file[position];
      let outputs = oneHot(to1Index.apply(null, select.selector), 64);

      data.push({
        input: inputs,
        output: outputs
      })
    }
  }

  rawData = undefined;
}


function setup() {
  corvus = new ai();
}



async function train() {
  let training = await corvus.selector.evolve(data, {
    mutation: neataptic.methods.mutation.ALL,
    elitism: 5,
    popsize: 200,
    error: 0.01,
    // iterations: 100000,
    log: 300,
  });

  training.then(function() {
    console.log(arguments);
  })
}
