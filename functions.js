var grid = document.getElementById("box");
var row, col, cell;
var testMode = true; //For testing. Turn this "true" to see where the mines are.

var xSize = 10; // horizontal (x axis) cells
var ySize = 10; // vertical (y axis) cells
var mCount = 20; // Number of mines.

/* function Cell() { // Cell object with relevant attributes.
    this.mine = true; // Does the cell have a dot?
    this.revealed = true; // Is the cell revealed?
} */

newScene(); // Initialize & show the grid when the page loads.

function newScene(){ // Re-initialize & reset the grid when the "New" button is pressed.
    console.log("new");
    makeGrid(xSize, ySize); // --- OK ---
    //makeMines(cell);
    addMines(); // --- OK ---
    mapGridMines(); // --- BAD ---
}

// Make a generalized 2 dimensional Array with the specified sizes.
function makeGrid(xSize, ySize){
    grid.innerHTML = ""; // Set a blank string as value to the ID-d table element.

    for(var x = 0; x < xSize; x++){
        row = grid.insertRow(x); // Add /make a row in the grid /table.
        for(var y = 0; y < ySize; y++){
            cell = row.insertCell(y); // Make /designate cells /columns in the current row of the grid /table.
            cell.onclick = function () { clickCell(this); }; // Each cell told what to do if "this" cell is clicked.
        }
    }
}

function clickCell(_cell) { // Patameter ignored ("_") until function made useful.
    console.log("cell clicked");
}

function addMines(){ //Add mines randomly; set cell attributes accordingly.
    console.log(cell);
    // Make the mines.
    var mine = document.createAttribute("data-mine"); // make custom attribute.
    mine.value = "false"; // Add a value to this attribute.
    cell.setAttributeNode(mine); // Attach this attribute to the cell object.

    for (var x = 0; x < mCount; x++) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        cell = grid.rows[row].cells[col];
        cell.setAttribute("data-mine", "true");
        if (testMode) cell.innerHTML = "&#9788;"; // Show the planted mines; for testing ?
    }
}

function mapGridMines() {
    var mineNumber = document.createAttribute("data-number");
    mineNumber.value = "false";
    cell.setAttributeNode(mineNumber);
    
    for (var x = 0; x < xSize; x++) {
        for (var y = 0; y < ySize; y++) {
            /* console.log(`Top.... left: ${x-1} , ${y-1} ; middle: ${x-1} , ${y} ; right: ${x-1} , ${y+1} \n` +
                        `Center. left: ${x} , ${y-1} ; middle: ${x} , ${y} ; right: ${x} , ${y+1} \n` +
                        `Bottom. left: ${x+1} , ${y-1} ; middle: ${x+1} , ${y} ; right: ${x+1} , ${y+1}`); */
            console.log(cell);
            //if(cell.hasAttribute("data-mine", "true")) {
            if(!cell.hasAttribute("data-mine")) {
                console.log("Empty, checking..");
                countAround();
            }
            else { console.log("Has mine."); }
        }
    }
}
                    //      -------- see v0 for this part, use "grid." to check what cells have what attributes ! -----

function countAround() { // Go through the grid; count mine aroung each cell.
    var counter = 0;
    
    for (var x = -1; x < 2; x++) {
        for (var y = -1; y < 2; y++) {
            console.log(`Checking neighbor: ${x} , ${y}`);
            
            // --check IF the current cell [x,y] has the Attribute of "data-mine" or not;
            // --if yes, then increment the "counter" by 1.
            if(cell.hasAttribute("data-mine") == "true") {
                counter++;
            }
        }
    }
    // --IF the "counter" is larger than 0, add that to the table cell as value and mark it as "numbered",
    // --if not, then mark the cell "empty".
    if(counter > 0) {
        cell.innerHTML = counter;
        cell.removeAttribute("data-mine");
        cell.setAttribute("data-number", "true");
    }
    else {cell.innerHTML = "0";}
    console.log("Counter: " + counter);
}

// white flag &#9872;
// black flag &#9873;
