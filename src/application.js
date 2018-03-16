const STOPPED = 0;
const READY = 1;
const RUNNING = 2;

const SPACEBAR = ' ';
const INTERVAL = 10;

var timerState = STOPPED;
var currentTimeMs = 0;
var times = [];

var splitTime = function(timestamp) {
  let milliseconds = timestamp % 1000;
  let seconds = Math.floor(timestamp / 1000) % 60;
  let minutes = Math.floor(timestamp / 60000);
  return { minutes, seconds, milliseconds };
};

var formatTimeComponents = function(components) {
  let milliseconds = String(components.milliseconds).padStart(3, '0').substr(0,2);
  let seconds = String(components.seconds).padStart(2, '0');
  let minutes = String(components.minutes).padStart(2, '0');
  return { minutes, seconds, milliseconds };
};

var joinTimeComponents = function(components) {
  return components.minutes + ':' + components.seconds + '.' + components.milliseconds;
};

var formatTime = function(timestamp) {
  return joinTimeComponents(formatTimeComponents(splitTime(timestamp)));
};

var tick = function() {
  currentTimeMs = currentTimeMs + INTERVAL; 
  document.getElementById('time').innerHTML = formatTime(currentTimeMs); 
};

var ticker = function() { }; 

var addTime = function(time) {
  times.push(time);

  let lis = times.map(function(e) {
    return "<li>" + formatTime(e) + "</li>";
  }).reverse().join('');

  document.getElementById('times_list').innerHTML = lis;

  let sum = times.reduce(function(a,b) { return a + b; });
  let avg = Math.round(sum / times.length);

  document.getElementById('average_time').innerHTML = formatTime(avg);
};

var ready = function() {
  timerState = READY;
  currentTimeMs = 0;
  document.getElementById('time').innerHTML = formatTime(currentTimeMs);; 
  document.getElementById('time').classList.add('ready');
};

var stop = function() {
  timerState = STOPPED;
  clearInterval(ticker);
  addTime(currentTimeMs);
  document.getElementById('time').classList.remove('running');
};

var run = function() {
  timerState = RUNNING;
  ticker = setInterval(tick, INTERVAL);
  document.getElementById('time').classList.remove('ready');
  document.getElementById('time').classList.add('running');
};

var handleKeyDown = function(event) {
  if (event.key === SPACEBAR) {
    if (timerState === STOPPED) {
      ready();
    } else if (timerState === RUNNING) {
      stop();
    }
  }
};

var handleKeyUp = function(event) {
  if (event.key === SPACEBAR) {
    if (timerState === READY) {
      run();
    }
  }
};

var handleClick = function(event) {
  if (event.target.id === 'sidebar_toggle') {
    document.getElementById('wrapper').classList.toggle('show_sidebar');
    if (event.target.innerHTML === "&gt;&gt;") {
      event.target.innerHTML = "&lt;&lt;";
    } else {
      event.target.innerHTML = "&gt;&gt;";
    }
  }
};

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("click", handleClick);
