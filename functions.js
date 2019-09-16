var box = document.getElementById("box");
var testMineView = true;    // For testing.

makeBox();

// Draw the grid like box. Size 10^2 for now.
function makeBox() {
    box.innerHTML = ""; // set a blank string as value to the ID-d table element.

    for (var i = 0; i < 10; i++) {
        row = box.insertRow(i); // insertRow & -Cell are JS functions.
        for (var j = 0; j < 10; j++) {
            panel = row.insertCell(j);
            panel.onclick = function () {   clickPanel(this);    };

            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            panel.setAttributeNode(mine);
        }
    }
    layMines();
    document.getElementById("winLose").innerText = "";
}

// Add mines randomly.
function layMines() {
    // The comparison value is the nr. of mines.
    for (var i = 0; i < 15; i++) {
        var row = Math.floor(Math.random() * 10);
        var column = Math.floor(Math.random() * 10);
        var panel = box.rows[row].cells[column];

        panel.setAttribute("data-mine", "true");

        // Mark mines if the condition value is "true".
        if (testMineView) { panel.innerHTML = "X"; }
    }
}

// Reveal all mines by coloring the panel red.
function showMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var panel = box.rows[i].cells[j];

            if (panel.getAttribute("data-mine") == "true") {
                panel.className = "mine";
            }
        }
    }
}

function levelStatus() {
    var isDone = true;  // Is an end (win, loss) reached?

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (box.rows[i].cells[j].getAttribute("data-mine" == "false") &&
                box.rows[i].cells[j].innerHTML == "") {
                isDone = false;
            }
        }
    }

    if (isDone) {
        console.warn("Won!");
        document.getElementById("winLose").innerText = "You have won!";
        showMines();
    }
}

// Panel clicking event handler.
function clickPanel(panel) {
    if (panel.getAttribute("data-mine") == "true") {
        showMines();
        console.warn("Lost!");
        document.getElementById("winLose").innerText = "You have lost!";
    } else {
        panel.className = "clicked";
        countMines(panel);
        
        // Count and show the nr. of all adjacent mines.
        var amount = 0;
        var panelRow = panel.parentNode.rowIndex;   // row- & cellIndex are JS variables.
        var panelColumn = panel.cellIndex;

        for (var i = Math.max(panelRow - 1, 0); i <= Math.min(panelRow + 1, 9); i++) {
            for (var j = Math.max(panelColumn - 1, 0); j <= Math.min(panelColumn + 1, 9); j++) {
                if (box.rows[i].cells[j].getAttribute("data-mine") == "true") {
                    amount++;
                }
            }
        }
        panel.innerHTML = amount;
        if (amount == 0) {
            // Show all adjacent safe panels.
            for (var i = Math.max(panelRow - 1, 0); i <= Math.min(panelRow + 1, 9); i++) {
                for (var j = Math.max(panelColumn - 1, 0);  j <= Math.min(panelColumn + 1, 9); j++) {
                    // This is a Recursive call.
                    if (box.rows[i].cells[j].innerHTML == "") {
                        clickPanel(box.rows[i].cells[j]);
                    }
                }
            }
        }
        levelStatus();
    }
}

/*
// Count and show the nr. of all adjacent mines.
function countMines(panel) {
    var amount = 0;
    var panelRow = panel.parentNode.rowIndex;   // row- & cellIndex are JS variables.
    var panelColumn = panel.cellIndex;

    for (var i = Math.max(panelRow - 1, 0); i <= Math.min(panelRow + 1, 9); i++) {
        for (var j = Math.max(panelColumn - 1, 0); j <= Math.min(panelColumn + 1, 9); j++) {
            if (box.rows[i].cells[j].getAttribute("data-mine") == "true") {
                amount++;
            }
        }
    }
    panel.innerHTML = amount;
    if (amount == 0) {
        showSafe(panelRow, panelColumn);
    }
    levelStatus();
}

// Show all adjacent safe panels.
function showSafe(panelRow, panelColumn) {
    for (var i = Math.max(panelRow - 1, 0); i <= Math.min(panelRow + 1, 9); i++) {
        for (var j = Math.max(panelColumn - 1, 0);  j <= Math.min(panelColumn + 1, 9); j++) {
            // This is a Recursive call.
            if (box.rows[i].cells[j].innerHTML == "") {
                clickPanel(box.rows[i].cells[j]);
            }
        }
    }
} */
