const button = document.getElementById('button');
const startTimeElement = document.getElementById('start_time');
const stopTimeElement = document.getElementById('stop_time');
const stopwatchTimeElement = document.getElementById('stopwatch_time');

const stopwatchSummaryElement = document.getElementById('stopwatch_summary');
const stopwatchLogsElement = document.getElementById('stopwatch_logs');

const newStopwatchElement = document.getElementById('new_stopwatch');
const newStopwatchForm = document.getElementById('new_stopwatch_form');
const newStopwatchButton = document.getElementById('new_stopwatch_button');
const stopwatches = document.getElementById('stopwatches');

let allStopwatches = new Array();
let stopwatchSums = new Array();
let stopwatchStartStop = new Array();
let stopwatchLog = new Array();

let stopwatchCounter = 0;
let running = false;
let timeInterval;
let startTime;

class StopWatch {
  constructor(newStopwatchName, newStopwatchId) {
    this.id = stopwatchCounter;
    this.stopwatchName = newStopwatchName.toUpperCase();

    let newStopwatch = document.createElement("div");
    newStopwatch.setAttribute("class", "stopwatch");
    
    let newName = document.createElement("div");
    newName.setAttribute("class", "stopwatch_name");

    let newButton = document.createElement("div");
    newButton.setAttribute("class", "button");
    newButton.setAttribute("id", newStopwatchId);
    console.log('Stopwatch ' + newStopwatchId + ' created');

    let node = document.createTextNode("START");

    let newStartStopTime = document.createElement("div");
    newStartStopTime.setAttribute("class", "start_stop_time");

    let newStopwatchTime = document.createElement("div");
    newStopwatchTime.setAttribute("class", "stopwatch_time");

    let newStartTime = document.createElement("span");
    newStartTime.setAttribute("class", "start_time");

    let newStopTime = document.createElement("span");
    newStopTime.setAttribute("class", "stop_time");
    
    
    newName.appendChild(document.createTextNode(this.stopwatchName));
    newStopwatch.appendChild(newName);
    
    newButton.appendChild(node);
    newStopwatch.appendChild(newButton);
    newStopwatch.appendChild(document.createTextNode("Stopwatch Time: "));
    newStopwatch.appendChild(newStopwatchTime);
    newStopwatchTime.appendChild(document.createTextNode("0:00:00"));
    
    newStopwatch.appendChild(newStartStopTime);
    newStartStopTime.appendChild(document.createTextNode("Start Time: "));
    newStartStopTime.appendChild(newStartTime);
    newStartStopTime.appendChild(document.createElement("br"));
    newStartStopTime.appendChild(document.createTextNode("Stop Time: "));
    newStartStopTime.appendChild(newStopTime);
    newStopwatch.appendChild(document.createElement("br"));
    newStopwatch.appendChild(document.createElement("br"));

    newButton.onclick = startStop;

    stopwatches.insertBefore(newStopwatch, newStopwatchElement);
  }
  
  set startTime(startTime) {
    this._startTime = startTime;
  }
  
  set stopTime(stopTime) {
    this._stopTime = stopTime;
  }
  
  get startTime() {
    return this._startTime;
  }
  
  get stopTime() {
    return this._stopTime;
  }
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }  // add zero in front of numbers < 10
  
  return i;
}

function formatTimeString(h, m, s) {
  m = checkTime(m);
  s = checkTime(s);

  return h + ":" + m + ":" + s;
}

function formatTime(date) {
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  return formatTimeString(h, m , s);
}

function startClock() {
  var today = new Date();
  
  let formattedTime = formatTime(today);
  //console.log(today.getMonth());
  
  document.getElementById('clock').innerHTML = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + "<br>" + formattedTime;

  setTimeout(startClock, 500);
}

function displayTimeDiff(timeDiff) {
  let remainingTime = timeDiff;
  let hours = Math.floor(remainingTime / (1000* 60 * 60));
  remainingTime = remainingTime % (1000 * 60 * 60);
  let minutes = Math.floor(remainingTime / (1000 * 60));
  remainingTime = remainingTime % (1000 * 60);
  let seconds = Math.floor(remainingTime / 1000);
  
  return formatTimeString(hours, minutes, seconds)
}

function showWatch(button) {
  console.log('showing current stopwatch time');
  let currentTime = new Date();
  let timeDiff = currentTime - startTime;
  
  //console.log(timeDiff);
  //console.log(typeof timeDiff);

  let currentWatchTime = displayTimeDiff(timeDiff);
  console.log(currentWatchTime);

  let stopwatchTimeElement = button.parentElement.getElementsByClassName('stopwatch_time')[0];

  stopwatchTimeElement.innerHTML = currentWatchTime;

  //let formattedTime = formatTime(timeDiff);
  //console.log(formattedTime);

}

function addStartTime(buttonId, startTime) {
  //stopwatchStartStop[buttonId] = [startTime];
  if (allStopwatches[buttonId] != undefined) {
    allStopwatches[buttonId].startTime = startTime;
  }
  //console.log(stopwatchStartStop);
}

function addStopTime(buttonId, stopTime) {
  //stopwatchStartStop[buttonId].push(stopTime);
  if (allStopwatches[buttonId] != undefined) {
    allStopwatches[buttonId].stopTime = stopTime;
  }
  //console.log(stopwatchStartStop);
}

function startWatch(button) {
  if (!running) {
    console.log('stopwatch started');
    running = true;

    startTime = new Date();
    
    let buttonId = button.attributes.getNamedItem('id').value;
    addStartTime(buttonId, startTime);


    let formatted_time = formatTime(startTime);

    let parentElement = button.parentElement;
    console.log(parentElement);

    console.log(parentElement.querySelector('start_time'));
    console.log(parentElement.getElementsByClassName('start_time'));
    //console.log(typeof parentElement);
    //console.log(button.closest('start_time'));

    let startTimeElement = parentElement.getElementsByClassName('start_time')[0];
    let stopTimeElement = parentElement.getElementsByClassName('stop_time')[0];
    let stopwatchTimeElement = button.parentElement.getElementsByClassName('stopwatch_time')[0];

    stopwatchTimeElement.innerHTML = '0:00:00';
    startTimeElement.innerHTML = formatted_time;
    stopTimeElement.innerHTML = '';

    timeInterval = setInterval(showWatch, 500, button);
    
  }
}

function stopWatch(button) {
  running = false;

  let stopTime = new Date();
  let buttonId = button.attributes.getNamedItem('id').value;
  addStopTime(buttonId, stopTime);

  let formatted_time = formatTime(stopTime);

  let stopTimeElement = button.parentElement.getElementsByClassName('stop_time')[0];

  stopTimeElement.innerHTML = formatted_time;

  console.log(running);

  clearInterval(timeInterval);

}

function updateLogDisplay(buttonId, stopwatchName, startTime, stopTime) {
  let newEntry = stopwatchName + ": " + startTime + " - " + stopTime;
  let newElement = document.createElement('li');
  newElement.appendChild(document.createTextNode(newEntry));
  
  stopwatchLogsElement.appendChild(newElement);
}

function updateSummaryDisplay() {
  stopwatchSummaryElement.innerHTML = '';
  for (let id in stopwatchSums) {
    console.log(id + ": " + stopwatchSums[id]);
    
    let newEntry = allStopwatches[id].stopwatchName + ": " + displayTimeDiff(stopwatchSums[id]);
    let newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(newEntry));
  
    stopwatchSummaryElement.appendChild(newElement);
  }
}

function updateStopwatchSums(buttonId) {
  //let elapsedTime = button.parentElement.getElementsByClassName('stopwatch_time')
  console.log(buttonId);
  let currentStopwatch = allStopwatches[buttonId];
  console.log(currentStopwatch);
  console.log(currentStopwatch.stopTime);
  
  let timeDiff = currentStopwatch.stopTime - currentStopwatch.startTime;
  
  let elapsedTime = displayTimeDiff(timeDiff);
  console.log("elapsed time " + elapsedTime);
  
  if (!(buttonId in stopwatchSums)) {
    stopwatchSums[buttonId] = timeDiff;
  } else {
    stopwatchSums[buttonId] += timeDiff;
  }
  
  updateSummaryDisplay();
}

function saveTimes(button) {
  let buttonId = button.attributes.getNamedItem('id').value;
  
  if (allStopwatches[buttonId] != undefined) {
  
    let startTime = button.parentElement.getElementsByClassName('start_time')[0].innerHTML;
    let stopTime = button.parentElement.getElementsByClassName('stop_time')[0].innerHTML;

    let stopwatchName = button.parentElement.getElementsByClassName('stopwatch_name')[0].innerHTML; 

    updateStopwatchSums(buttonId);

    //calculateTimeDiff()

    console.log(buttonId + startTime + stopTimeElement);
    updateLogDisplay(buttonId, stopwatchName, startTime, stopTime);
    stopwatchLog[Date.now()] = [buttonId, stopwatchName, startTime, stopTime];
    console.log(stopwatchLog);
  }
  

}

function updateSummary(button) {
  let buttonId = button.attributes.getNamedItem('id').value;
  console.log(buttonId);
  
  let newSum = document.createElement('li');
  newSum.appendChild(document.createTextNode(buttonId));
  
  stopwatchSummaryElement.appendChild(newSum);
  

}

function startStop() {
  if (event.target.innerHTML == 'START') { //start
    if (!running) { 
      event.target.style.color = 'red';
      event.target.innerHTML = 'STOP';
      event.target.parentElement.style.backgroundColor = 'green';

      startWatch(event.target);
    }
  } else { //stop
    if (running) {
      event.target.style.color = 'green';
      event.target.innerHTML = 'START';
      event.target.parentElement.style.backgroundColor = 'red';

      console.log(event.target.attributes);
      //console.log(event.target.attributes.getNamedItem('id'));

      stopWatch(event.target);
      
      saveTimes(event.target);
      
      //updateSummary(event.target);
    }
  }
}

button.onclick = startStop;


newStopwatchButton.onclick = () => {
  let newStopwatchName = newStopwatchForm.elements['new_stop_watch_name'].value;

  if (newStopwatchName != '') {

    let newForm = document.getElementById('new_stopwatch');

    console.log(typeof newForm);
    console.log(document.getElementById('new_stopwatch_name'));

    console.log(newStopwatchForm.elements);
    console.log(newStopwatchForm.elements['new_stop_watch_name'].value);

    newStopwatchForm.elements['new_stop_watch_name'].value = '';
    
    stopwatchCounter++;
    let newStopwatchId = "stopwatch_button_" + stopwatchCounter;
    let newStopwatch = new StopWatch(newStopwatchName, newStopwatchId);
    
    allStopwatches[newStopwatchId] = newStopwatch;
    
    //newStopwatchButton.style.color = 'red';
  }
}

newStopwatchForm.onsubmit = () => {
  //console.log(document.getElementById('new_stopwatch_name').value);

  return false;
}


function downloadCsv() {
  let csv = 'id,name,elapsed_time\n';
  for (let id in stopwatchSums) {
    let row = id + ',' + allStopwatches[id].stopwatchName + ',' + stopwatchSums[id];
    
    csv += row + '\n';
  }
  
  console.log(csv);
  
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'stopwatch_summary.csv';
  hiddenElement.click();
  
}

document.getElementById('download_csv').onclick = () => {
  //console.log('clicked!');
  
  downloadCsv();
}

/*
button.onmouseover = () => {
  button.style.cursor = 'pointer';
}
*/

document.onload = startClock();