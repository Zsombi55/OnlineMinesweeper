var box = document.getElementById("box");
var testMineView = true;    // For testing.

var row, column, panel;

makeBox();

// Draw the grid like box. Size 10^2 for now.
function makeBox() {
    box.innerHTML = ""; // set a blank string as value to the ID-d table element.

    for(var i = 0; i < 10; i++) {
        row = box.insertRow(i); // insertRow & -Cell are JS functions.
        for(var j = 0; j < 10; j++) {
            panel = row.insertCell(j);
            panel.onclick = function() {
                clickPanel(this);
            };

            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            panel.setAttributeNode(mine);
        }
    }
    layMines();
}

// Add mines randomly.
function layMines() {
    // 25 is the nr. of mines.
    for(var i = 0; i < 25; i++) {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        panel = box.rows[row].cells[columns];

        panel.setAttribute("data-mine", "true");

        // Mark mines if the condition value is "true".
        if(testMineView) {  panel.innerHTML = "X"; }
    }
}

// Reveal all mines by coloring the panel red.
function showMines() {
    for(var i = 0; i < 10; i++) {
        for(var j = 0; j < 10; j++) {
            panel = box.rows[i].cells[j];

            if (panel.getAttribute("data-mine") == "true") {
                panel.className = "mine";
            }
        }
    }
}

function levelStatus() {
    var isDone = true;

    for(var i = 0; i < 10; i++) {
        for(var j = 0; j < 10; j++) {
            if (panel.rows[i].cells[j].getAttribute("mine" == "false") &&
            panel.rows[i].cells[j].innerHTML == "") {
                isDone = false;
            }
        }
    }

    if (isDone) {
        console.log("Won!");
        document.getElementById("winLose").innerText = "You win!";
        showMines();
    }
}

