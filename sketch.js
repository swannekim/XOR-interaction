// The XOR Problem
// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS

let nn;
let hiddenLabel;
let hidden_slider;
let lrLabel;
let lr_slider;
let stageNum = 0;

let training_data = [
  {
    inputs: [0, 0],
    outputs: [0],
  },
  {
    inputs: [0, 1],
    outputs: [1],
  },
  {
    inputs: [1, 0],
    outputs: [1],
  },
  {
    inputs: [1, 1],
    outputs: [0],
  },
];

function preload() {
  font1 = loadFont("sources/MAPOGOLDENPIER.OTF");
}

function setup() {
  createCanvas(600, 600);

  var button = createButton("reset");
  button.position(550, 610);
  button.mousePressed(resetSketch);

  hiddenLabel = createDiv("Perceptrons ");
  hiddenLabel.position(10, 610);
  hidden_slider = createSlider(1, 10, 4, 1);
  hidden_slider.parent(hiddenLabel);

  nn = new NeuralNetwork(2, hidden_slider.value(), 1);

  lrLabel = createDiv("Learning Rate ");
  lrLabel.position(270, 610);
  lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
  lr_slider.parent(lrLabel);
}

function draw() {
  background(0);

  if (stageNum == 0) {
    stageNum = 0;

    push();
    textAlign(CENTER);
    textFont(font1);
    fill(220);
    textSize(55);
    text("The XOR problem", width * 0.5, height * 0.3);
    textSize(24);
    text("은닉층에 존재하는 퍼셉트론의 개수와", width * 0.5, height * 0.55);
    text("학습률을 조절하며 분류를 확인해보세요", width * 0.5, height * 0.61);
    text("press Enter key to start", width * 0.5, height * 0.8);
    pop();
  }

  if (stageNum == 1) {
    stageNum = 1;

    for (let i = 0; i < 100; i++) {
      let data = random(training_data);
      nn.train(data.inputs, data.outputs);
    }

    nn.setLearningRate(lr_slider.value());

    let resolution = 10;
    let cols = width / resolution;
    let rows = height / resolution;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x1 = i / cols;
        let x2 = j / rows;
        let inputs = [x1, x2];
        let y = nn.predict(inputs);
        noStroke();
        fill(y * 255);
        rect(i * resolution, j * resolution, resolution, resolution);
      }
    }
  }

  textFont(font1); // copyright
  fill(200);
  textSize(10);
  text("@lumeiredelalune_", 500, 585);
}

function resetSketch() {
  nn = new NeuralNetwork(2, hidden_slider.value(), 1);
}

function keyPressed() {
  if (keyCode === ENTER) {
    stageNum = 1;
  }
}
