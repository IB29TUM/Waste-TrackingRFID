document.getElementById('csvFileInput').addEventListener('change', readCSV);

function readCSV(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let text = e.target.result;
        let data = parseCSV(text);
        populateTable(data);
        displayAverage(data);
    };

    reader.readAsText(file);
}

function parseCSV(text) {
    let rows = text.split('\n');
    return rows.map(row => row.split(';'));
}

function populateTable(data) {
    let table = document.getElementById('csvTable');
    table.innerHTML = '';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    data.forEach((row, index) => {
        let tr = document.createElement('tr');
        row.forEach(cell => {
            let td = document.createElement(index === 0 ? 'th' : 'td');
            td.textContent = cell.trim();
            tr.appendChild(td);
        });
        if (index === 0) {
            thead.appendChild(tr);
        } else {
            tbody.appendChild(tr);
        }
    });
    table.appendChild(thead);
    table.appendChild(tbody);
}

function calculateAverage(data) {
    let total = 0;
    let count = 0;
    data.forEach(function(row, index) {
        if(index !== 0) { // Skip header
            let percentage = parseFloat(row[row.length - 1]);
            if (!isNaN(percentage)) {
                total += percentage;
                count++;
            }
        }
    });
    return count > 0 ? (total / count).toFixed(2) : 0; // Fixed to 2 decimal places
}

function displayAverage(data) {
    let average = calculateAverage(data);
    document.getElementById('average').textContent = `Average Percentage: ${average}%`;
}

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Create the data table for the gauge chart
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Recycle', 0] // Start with 0, will update when file is read
    ]);

    // Set options for the gauge chart
    var options = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    // Instantiate and draw the chart
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);

    // Update the chart when the file is read and average is calculated
    document.updateGauge = function(average) {
        data.setValue(0, 1, average);
        chart.draw(data, options);
    }
}



function displayAverage(data) {
    let average = calculateAverage(data);
    // document.getElementById('average').textContent = `Average Percentage: ${average}%`;

    // Update the gauge chart with the new average
    document.updateGauge(Number(average));

    // Update the message beside the gauge
    let recycleMessage = `Congratulations ${average}% of your waste is recyclable`;
    document.getElementById('recycleMessage').textContent = recycleMessage;
}

// Function to create a single piece of confetti
function createConfettiPiece(x, y) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.left = `${x}px`;
    confettiPiece.style.top = `${y}px`;
    confettiPiece.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color
    confettiPiece.style.opacity = Math.random(); // Random opacity
    confettiPiece.style.transform = `scale(${Math.random()})`; // Random size
  
    // Randomize the animation duration and delay for a more natural effect
    const animationDuration = Math.random() * 3000 + 3000; // Between 3 and 6 seconds
    const animationDelay = Math.random() * 3000; // Up to 3 seconds
  
    confettiPiece.style.animationDuration = `${animationDuration}ms`;
    confettiPiece.style.animationDelay = `-${animationDelay}ms`;
  
    return confettiPiece;
  }
  
  // Function to start the party popper effect
  function triggerPartyPopper() {
    const numberOfPieces = 100;
    const container = document.getElementById('partyPopperEffect');
    
    // Clean up any existing confetti
    container.innerHTML = '';
    container.style.display = 'block';
  
    // Create and append each piece of confetti
    for (let i = 0; i < numberOfPieces; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const confettiPiece = createConfettiPiece(x, y);
      container.appendChild(confettiPiece);
    }
  
    // Remove confetti after 6 seconds
    setTimeout(() => {
      container.innerHTML = '';
    }, 6000);
  }
  
  // Trigger the effect 3 seconds after the window loads
  window.onload = function() {
    setTimeout(triggerPartyPopper, 3000);
  };
  
