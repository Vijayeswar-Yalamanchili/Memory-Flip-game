const boxes = document.querySelector(".boxes");
const colors = ["red","blue","violet","orange","lightgreen","brown","aqua","yellow"]

const colorsList = [...colors,...colors];
const boxLength = colorsList.length;

// Initializing the main elements of game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

//fun to display the boxes in webpage
function buildBoxes(color){
    const element = document.createElement("div")
    // element.classList.add("box") ;
    element.className = "box";
    element.setAttribute("data-color",color); //"data-color" used for mapping the color
    //adding event listener
    element.addEventListener("click",()=>{
        if(waitingTime){
            // return
            console.log("err");
        }
        element.style.backgroundColor = color;
        
    })
    
    return element;
}

//building the boxes for the game 
for(let i=0;i<boxLength;i++){
    //code to display the random colors in boxes
    const randomIndex = Math.floor(Math.random()*colorsList.length);
    const color = colorsList[randomIndex];
    //calling the fuction to display boxes
    const box = buildBoxes(color)
    //using splice to avoid more than 2 repeated calls
    colorsList.splice(randomIndex,1)
    //appending to boxes
    boxes.appendChild(box);
}