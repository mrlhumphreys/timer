const STOPPED = 0;
const READY = 1;
const RUNNING = 2;

const SPACEBAR = ' ';
const INTERVAL = 10;

var timerState = STOPPED;
var currentTimeMs = 0;

var tick = function() {
  currentTimeMs = currentTimeMs + INTERVAL; 
  let millisecondsPart = String(currentTimeMs % 1000).padStart(3,'0').substr(0, 2);
  let secondsPart = Math.floor(currentTimeMs / 1000);
  document.getElementById('time').innerHTML = secondsPart + ':' + millisecondsPart; 
};

var ticker = function() { }; 

var ready = function() {
  timerState = READY;
  currentTimeMs = 0;
  document.getElementById('time').classList.add('ready');
};

var stop = function() {
  timerState = STOPPED;
  clearInterval(ticker);
  document.getElementById('time').classList.remove('running');
};

var run = function() {
  timerState = RUNNING;
  ticker = setInterval(tick, INTERVAL);
  document.getElementById('time').classList.remove('ready');
  document.getElementById('time').classList.add('running');
};

var handleKeyDown = function(event) {
  let keyName = event.key;

  if (keyName === SPACEBAR) {
    if (timerState === STOPPED) {
      ready();
    } else if (timerState === RUNNING) {
      stop();
    }
  }
};

var handleKeyUp = function(event) {
  let keyName = event.key;

  if (keyName === SPACEBAR) {
    if (timerState === READY) {
      run();
    }
  }
};

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
