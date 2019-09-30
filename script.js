const buttonElement = document.getElementById('button');
const startTimeElement = document.getElementById('start_time');
const stopTimeElement = document.getElementById('stop_time');
const stopwatchTimeElement = document.getElementById('stopwatch_time');

const stopwatchSummaryElement = document.getElementById('stopwatch_summary');
const stopwatchLogsElement = document.getElementById('stopwatch_logs');

const newStopwatchElement = document.getElementById('new_stopwatch');
const newStopwatchForm = document.getElementById('new_stopwatch_form');
const newStopwatchButton = document.getElementById('new_stopwatch_button');
const stopwatches = document.getElementById('stopwatches');

const stopwatchDropdownElement = document.getElementById('stopwatch_dropdown');

let allStopwatches = new Array();
let stopwatchSums = new Array();
let stopwatchStartStop = new Array();
let stopwatchLog = new Array();

let stopwatchCounter = 0;
let running = false;
let timeInterval;
let startTime;

let isPieChartDisplayed = false;
let stopwatchPieChart;

class StopWatch {
  constructor(newStopwatchName, newStopwatchId) {
    this.id = stopwatchCounter;
    this.stopwatchName = newStopwatchName.toUpperCase();
    this.elapsedTime = 0;

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

  updateElapsedTime(startTime, stopTime) {
    this.elapsedTime += stopTime - startTime;
  }
  
  set startTime(startTime) {
    this._startTime = startTime;
  }
  
  set stopTime(stopTime) {
    this._stopTime = stopTime;
    this.updateElapsedTime(this._startTime, this._stopTime);
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

//formats strings to readable time
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

function showWatch(buttonElement) {
  console.log('showing current stopwatch time');
  let currentTime = new Date();
  let timeDiff = currentTime - startTime;
  
  //console.log(timeDiff);
  //console.log(typeof timeDiff);

  let currentWatchTime = displayTimeDiff(timeDiff);
  console.log(currentWatchTime);

  let stopwatchTimeElement = buttonElement.parentElement.getElementsByClassName('stopwatch_time')[0];

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

function startWatch(buttonElement) {
  if (!running) {
    console.log('stopwatch started');
    running = true;

    startTime = new Date();
    
    let buttonId = buttonElement.attributes.getNamedItem('id').value;
    addStartTime(buttonId, startTime);


    let formatted_time = formatTime(startTime);

    let parentElement = buttonElement.parentElement;
    console.log(parentElement);

    console.log(parentElement.querySelector('start_time'));
    console.log(parentElement.getElementsByClassName('start_time'));
    //console.log(typeof parentElement);
    //console.log(buttonElement.closest('start_time'));

    let startTimeElement = parentElement.getElementsByClassName('start_time')[0];
    let stopTimeElement = parentElement.getElementsByClassName('stop_time')[0];
    let stopwatchTimeElement = buttonElement.parentElement.getElementsByClassName('stopwatch_time')[0];

    stopwatchTimeElement.innerHTML = '0:00:00';
    startTimeElement.innerHTML = formatted_time;
    stopTimeElement.innerHTML = '';

    timeInterval = setInterval(showWatch, 500, buttonElement);
    
  }
}

function stopWatch(buttonElement) {
  running = false;

  let stopTime = new Date();
  let buttonId = buttonElement.attributes.getNamedItem('id').value;
  addStopTime(buttonId, stopTime);

  let formatted_time = formatTime(stopTime);

  let stopTimeElement = buttonElement.parentElement.getElementsByClassName('stop_time')[0];

  stopTimeElement.innerHTML = formatted_time;

  console.log(running);

  clearInterval(timeInterval);

}

//times are Date objects
function updateLogDisplay(buttonId, stopwatchName, startTime, stopTime) {
  let newEntry = stopwatchName + ": " + startTime + " - " + stopTime;
  let newElement = document.createElement('li');
  newElement.appendChild(document.createTextNode(newEntry));
  
  stopwatchLogsElement.appendChild(newElement);
}

function updateSummaryDisplay() {
  let totalElapsedTime = 0;
  
  stopwatchSummaryElement.innerHTML = ''; 
  for (let id in stopwatchSums) {
    console.log(id + ": " + stopwatchSums[id]);
    
    let newEntry = allStopwatches[id].stopwatchName + ": " + displayTimeDiff(stopwatchSums[id]);
    let newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(newEntry));
  
    stopwatchSummaryElement.appendChild(newElement);

    totalElapsedTime += stopwatchSums[id];
  }

  document.getElementById('total_elapsed_time').innerHTML = displayTimeDiff(totalElapsedTime);
}

function updateStopwatchSums(buttonId, startTime, stopTime) {
  console.log('updating stopwatch summary');
  
  let timeDiff = stopTime - startTime;
  
  let elapsedTime = displayTimeDiff(timeDiff);
  console.log("elapsed time " + elapsedTime);
  
  if (!(buttonId in stopwatchSums)) {
    stopwatchSums[buttonId] = timeDiff;
  } else {
    stopwatchSums[buttonId] += timeDiff;
  }
  
  updateSummaryDisplay();
}

function updateStopwatchLog(buttonId, stopwatchName, startTime, stopTime) {
    console.log('updating stopwatch log');
    updateLogDisplay(buttonId, stopwatchName, formatTime(startTime), formatTime(stopTime));
    stopwatchLog[Date.now()] = [buttonId, stopwatchName, startTime, stopTime];
    console.log(stopwatchLog);
}

function updateStopwatchDisplay(buttonId, startTime, stopTime) {
    updateStopwatchSums(buttonId, startTime, stopTime);
    updateStopwatchLog(buttonId, allStopwatches[buttonId].stopwatchName, startTime, stopTime);
}

//save stopwatch times into log
function saveTimes(buttonElement) {
  console.log('saving times');
  let buttonId = buttonElement.attributes.getNamedItem('id').value;
  console.log(buttonId);

  let currentStopwatch = allStopwatches[buttonId];
  console.log(currentStopwatch);
  let startTime = currentStopwatch.startTime;
  console.log(startTime);
  let stopTime = currentStopwatch.stopTime;
  console.log(stopTime);
  
  if (allStopwatches[buttonId] != undefined) {
  
    /*let startTimeString = buttonElement.parentElement.getElementsByClassName('start_time')[0].innerHTML;
    let stopTimeString = buttonElement.parentElement.getElementsByClassName('stop_time')[0].innerHTML;
    let stopwatchName = buttonElement.parentElement.getElementsByClassName('stopwatch_name')[0].innerHTML; */
    
    let startTimeString = formatTime(startTime);
    let stopTimeString = formatTime(stopTime);
    let stopwatchName = allStopwatches[buttonId].stopwatchName;

    updateStopwatchDisplay(buttonId, startTime, stopTime);
  }
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

buttonElement.onclick = startStop;


function updateDropdown() {
  stopwatchDropdownElement.innerHTML = '';
  
  for (let id in allStopwatches) {
    let newOption = document.createElement('option');
    
    let stopwatchName = allStopwatches[id].stopwatchName;
    newOption.setAttribute('value', id);
    newOption.appendChild(document.createTextNode(stopwatchName));
    
    stopwatchDropdownElement.appendChild(newOption);
    
  }
}

newStopwatchButton.onclick = () => {
  let newStopwatchName = newStopwatchForm.elements['new_stop_watch_name'].value;
  
  //validate form submission

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
    
    updateDropdown();
    
    //newStopwatchButton.style.color = 'red';
  }
}

newStopwatchForm.onsubmit = () => {
  console.log(document.getElementById('new_stopwatch_name').value);

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

function generateBackgroundColor(dataLength) {
  console.log('generating background colors');
  let backgroundColor = [];

  let hue = 0;

  for (let i=0; i < dataLength; i++) {
    hue = (hue + (25 * i)) % 360;
    console.log(hue);
    backgroundColor.push('hsl(' + hue + ', 50%, 50%)');
  }

  console.log(backgroundColor);
  return backgroundColor;
}

document.getElementById('display_pie_chart').onclick = () => {
  if (!isPieChartDisplayed) {
    isPieChartDisplayed = true;

    event.target.innerHTML = 'Hide Pie Chart';
    document.getElementById('pie-chart').style.display = "block";

    //console.log(allStopwatches.entries());
    let labels = [];
    let data = []
    for (let id in allStopwatches) {
      labels.push(allStopwatches[id].stopwatchName);
      data.push(allStopwatches[id].elapsedTime);
    }

    data = data.map((element) => {return element / (1000 * 60)});

    console.log(labels);
    console.log(data);

    console.log(labels.length);
    let backgroundColor = generateBackgroundColor(labels.length);

    if (stopwatchPieChart != undefined) {stopwatchPieChart.destroy();}
    
    stopwatchPieChart = new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        /*
        labels: ["stopwatch_button_1", "stopwatch_button_2", "stopwatch_button_3", "stopwatch_button_4", 
                "stopwatch_button_5", "stopwatch_button_6", "stopwatch_button_7", "stopwatch_button_8",
                "stopwatch_button_9", "stopwatch_button_10"],
        */
        labels: labels,
        datasets: [{
          label: "Elapsed Time",
          //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          backgroundColor: backgroundColor,
          //data: [610382,190150,13453625,3866060,1621888,1118220,3094995,2157093,1796319,55112]
          data: data
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Stopwatch Summary'
        }
      }
    })

  } else {
    isPieChartDisplayed = false;
    event.target.innerHTML = 'Display Pie Chart';


    document.getElementById('pie-chart').style.display = "none";
    console.log('hide pie chart');
  }
}

const manualLogFormElement = document.getElementById('manual_log_form');
const manualLogErrorElement = document.getElementById('manual_entry_error');

manualLogFormElement.onsubmit = () => {
  console.log('submitted manual log');
  
  manualLogErrorElement.innerHTML = '';
  
  //custom validity message
  //document.getElementById('manual_log_button').setCustomValidity("test");
  
  
  //get form values
  let selectedStopwatch = document.getElementById('stopwatch_dropdown').value;
  let startHour = manualLogFormElement.elements['start_hour'].value;
  let startMins = manualLogFormElement.elements['start_mins'].value;
  let endHour = manualLogFormElement.elements['end_hour'].value;
  let endMins = manualLogFormElement.elements['end_mins'].value;

  console.log(selectedStopwatch);
  
  //convert strings to numbers
  //try catch?
  startHour = parseInt(startHour);
  startMins= parseInt(startMins);
  endHour = parseInt(endHour);
  endMins = parseInt(endMins);
  
  console.log(startHour, startMins, endHour, endMins);

  let errorMessage;

  //validate hours (<24) and minutes (<60)
  if (startHour >= 24 || endHour >= 24) {
    console.log('invalid hour');
    errorMessage = "(Please enter a valid hour (<24))";
    document.getElementById('manual_entry_error').appendChild(document.createTextNode(errorMessage));
    return false;
  }
  
  if (startMins >= 60 || endMins >= 60) {
    console.log('invalid minutes');
    errorMessage = "(Please enter valid minutes (<60))";
    document.getElementById('manual_entry_error').appendChild(document.createTextNode(errorMessage));
    return false;
  }
  
  //convert to time
  let currentTime = new Date();
  
  let startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), startHour, startMins);
  console.log(startTime);
  
  let endTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), endHour, endMins);
  console.log(endTime);
   
  //check that end time is after start time
  console.log('check that end time is after start time');
  if (endTime <= startTime) {
    console.log('end time is equal to or before start time');
    errorMessage = "(End time must be after start time)"
    document.getElementById('manual_entry_error').appendChild(document.createTextNode(errorMessage));
    return false;
  }
  
  //check that end time is not past current time
  if (endTime > currentTime) {
    console.log('end time is after current time');
    errorMessage = "(End time must be before current time)"
    document.getElementById('manual_entry_error').appendChild(document.createTextNode(errorMessage));
    return false;
  }
  
  //check that start and end times do not overlap with existing logs
  console.log('check for overlap');
  for (let i in stopwatchLog) {
    //console.log(stopwatchLog);
    logStartTime = stopwatchLog[i][2];
    logEndTime = stopwatchLog[i][3];
    
    console.log(logStartTime, logEndTime);
    
    if ((startTime >= logStartTime && startTime <= logEndTime) || (endTime >= logStartTime && endTime <= logEndTime)
        || (startTime <= logStartTime && endTime >= logEndTime)) {
      console.log('new entry overlaps existing entry');
      errorMessage = "(Manual entry cannot overlap any existing logs)"
      document.getElementById('manual_entry_error').appendChild(document.createTextNode(errorMessage));
      return false;
    }
  }
    
  //update elapsed time on selected stopwatch
  allStopwatches[selectedStopwatch].updateElapsedTime(startTime, endTime);
  
  //save and update log and summary display
  updateStopwatchDisplay(selectedStopwatch, startTime, endTime);

  return false;
}



document.onload = startClock();